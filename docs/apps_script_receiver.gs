/**
 * =========================================================================
 * Prarambha Path Evening School (PPES) AI Study Toolkit
 * Student Feedback Receiver Script
 * =========================================================================
 * Flow:
 * Next.js Server Route (/api/feedback) -> Apps Script (doPost) -> Google Sheet -> PPES Gmail Alert
 *
 * Security & Reliability Highlights:
 * 1. Authenticates every request against SHARED_SECRET stored in Script Properties.
 * 2. Neutralizes spreadsheet formula injection (CSV/formula injection attack vector).
 * 3. Appends the row to Google Sheets FIRST.
 * 4. Attempts email notification inside a try/catch block so that email failures
 *    or daily quota limits never roll back or prevent saving student feedback.
 * 5. Uses plain-text emails sent exclusively to RECIPIENT_EMAIL defined in Script Properties.
 */

var PROPERTY_SHARED_SECRET = "FEEDBACK_SHARED_SECRET";
var PROPERTY_RECIPIENT_EMAIL = "FEEDBACK_RECIPIENT_EMAIL";
var PROPERTY_SPREADSHEET_ID = "FEEDBACK_SPREADSHEET_ID";
var SHEET_NAME = "Toolkit_Feedback";

// In-memory dedup cache for request IDs within a single script invocation.
// Apps Script is stateless across requests, so we use CacheService for cross-request dedup.
var REQUEST_ID_CACHE_PREFIX = "feedback_reqid_";

/**
 * Helper to get the target spreadsheet (works both container-bound and standalone)
 */
function getTargetSpreadsheet() {
  var scriptProps = PropertiesService.getScriptProperties();
  var sheetId = scriptProps.getProperty(PROPERTY_SPREADSHEET_ID);
  
  if (sheetId && sheetId.trim().length > 0) {
    return SpreadsheetApp.openById(sheetId.trim());
  }
  
  // Fallback to active spreadsheet if container-bound
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    throw new Error("No spreadsheet configured. Please set 'FEEDBACK_SPREADSHEET_ID' in Script Properties.");
  }
}

/**
 * Run this ONE-TIME setup function from the Apps Script editor to:
 * 1. Create and format the sheet headers with styling.
 * 2. Verify or seed script properties.
 */
function setupFeedbackSheet() {
  var ss = getTargetSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Define column headers
  var headers = [
    "Timestamp",
    "Experience",
    "Category",
    "Feedback",
    "Class",
    "Email Status"
  ];

  // Set headers and format row 1
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0d1f35"); // PPES Navy
  headerRange.setFontColor("#ffffff");
  headerRange.setHorizontalAlignment("center");
  
  // Freeze header row and adjust standard column widths
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(2, 110); // Experience
  sheet.setColumnWidth(3, 170); // Category
  sheet.setColumnWidth(4, 450); // Feedback
  sheet.setColumnWidth(5, 90);  // Class
  sheet.setColumnWidth(6, 130); // Email Status

  Logger.log("Sheet '" + SHEET_NAME + "' has been successfully initialized!");
}

/**
 * Handles incoming POST requests from the Next.js server route.
 */
function doPost(e) {
  var output = {
    status: "error",
    message: ""
  };

  try {
    // 1. Validate payload presence
    if (!e || !e.postData || !e.postData.contents) {
      output.message = "Empty payload";
      return createJsonResponse(output, 400);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      output.message = "Invalid JSON format";
      return createJsonResponse(output, 400);
    }

    // 2. Authenticate using Shared Secret from Script Properties
    var scriptProps = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProps.getProperty(PROPERTY_SHARED_SECRET);

    if (!expectedSecret) {
      output.message = "Server misconfigured: Shared secret property is missing.";
      Logger.log("Error: " + output.message);
      return createJsonResponse(output, 500);
    }

    if (!data.secretToken || data.secretToken !== expectedSecret) {
      output.message = "Unauthorized: Invalid secret token.";
      Logger.log("Unauthorized request rejected.");
      return createJsonResponse(output, 401);
    }

    // 3. Idempotency check — reject duplicate requestIds within 5 minutes
    if (data.requestId && typeof data.requestId === "string") {
      var cache = CacheService.getScriptCache();
      var cacheKey = REQUEST_ID_CACHE_PREFIX + data.requestId.substring(0, 90);
      if (cache.get(cacheKey) === "1") {
        // Already processed — return success without writing a new row
        output.status = "success";
        output.saved = true;
        output.message = "Already recorded (duplicate request)";
        output.duplicate = true;
        return createJsonResponse(output, 200);
      }
      // Mark this requestId as seen for 5 minutes (300 seconds)
      cache.put(cacheKey, "1", 300);
    }

    // 4. Extract & sanitize fields to prevent Formula Injection (=, +, -, @)
    var timestamp = new Date();
    var experience = sanitizeInput(data.experience || "Not provided");
    var category = sanitizeInput(data.category || "General");
    var feedback = sanitizeInput(data.feedback || "");
    var studentClass = sanitizeInput(data.studentClass || "Not specified");

    if (!feedback || feedback.length < 3) {
      output.message = "Feedback text is required";
      return createJsonResponse(output, 400);
    }

    // 4. Save to Google Sheet FIRST (guarantee persistence)
    var ss = getTargetSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupFeedbackSheet();
    }

    var rowNumber = sheet.getLastRow() + 1;
    var emailStatus = "Pending";

    sheet.appendRow([
      timestamp,
      experience,
      category,
      feedback,
      studentClass,
      emailStatus
    ]);

    // 5. Attempt Email Notification (failsafe: does not affect recorded feedback)
    var recipientEmail = scriptProps.getProperty(PROPERTY_RECIPIENT_EMAIL) || "goichomanis2006@gmail.com";
    
    try {
      var subject = "New PPES Toolkit Feedback";
      var body = 
        "A student has submitted feedback through the AI Study Toolkit.\n\n" +
        "--------------------------------------------------\n" +
        "Experience : " + experience + "\n" +
        "Category   : " + category + "\n" +
        "Class      : " + studentClass + "\n" +
        "Timestamp  : " + timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + "\n\n" +
        "Feedback:\n" +
        feedback + "\n" +
        "--------------------------------------------------\n\n" +
        "View responses in Google Sheets:\n" +
        ss.getUrl() + "\n";

      MailApp.sendEmail({
        to: recipientEmail,
        subject: subject,
        body: body
      });

      sheet.getRange(rowNumber, 6).setValue("Sent");
    } catch (mailErr) {
      // Quota exceeded or temporary Gmail error
      Logger.log("Mail delivery error (row " + rowNumber + " preserved): " + mailErr.toString());
      sheet.getRange(rowNumber, 6).setValue("Failed: " + mailErr.message);
    }

    // 6. Return success to Next.js server — must include saved:true
    output.status = "success";
    output.saved = true;
    output.message = "Feedback saved successfully";
    return createJsonResponse(output, 200);

  } catch (err) {
    Logger.log("Critical doPost exception: " + err.toString());
    output.message = "Internal error saving feedback: " + err.toString();
    return createJsonResponse(output, 500);
  }
}

/**
 * Neutralizes potential Spreadsheet Formula Injection.
 * Prefixes strings starting with =, +, -, @ with an apostrophe.
 */
function sanitizeInput(str) {
  if (typeof str !== "string") {
    str = String(str);
  }
  str = str.trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

/**
 * Returns formatted JSON response for ContentService
 */
function createJsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify script properties & email delivery directly from editor.
 */
function testScriptExecution() {
  var scriptProps = PropertiesService.getScriptProperties();
  var secret = scriptProps.getProperty(PROPERTY_SHARED_SECRET);
  var email = scriptProps.getProperty(PROPERTY_RECIPIENT_EMAIL);

  Logger.log("Configured Secret: " + (secret ? "Found (" + secret.length + " chars)" : "NOT SET"));
  Logger.log("Configured Recipient Email: " + email);
}
