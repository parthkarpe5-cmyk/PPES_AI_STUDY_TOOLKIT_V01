# Google Form & Apps Script Setup Guide for PPES Student Feedback

This guide details how to set up the central Google Form, Google Sheet, and the free Google Apps Script notification trigger for the Prarambha Path Evening School (PPES) AI Study Toolkit.

---

## 1. Create the Google Form

1. Log into your **PPES Google Account** (`prarambhpath4444@gmail.com`).
2. Go to [Google Forms](https://forms.google.com) and create a **Blank Form**.
3. Set the Form Title and Description:
   - **Title**: `Help us make your study toolkit better!`
   - **Description**: 
     > *Please don't share personal details. Your feedback will be read by the PPES team. This form is for toolkit suggestions, not urgent help.*

### Configure the Form Fields

Add the following 4 fields:

1. **How was your experience?**
   - Type: Multiple Choice
   - Options:
     - `Good`
     - `Okay`
     - `Difficult`
   - Required: **Yes**

2. **What is your feedback about?**
   - Type: Multiple Choice (or Dropdown)
   - Options:
     - `Prompt builder`
     - `AI tools`
     - `Design`
     - `Something not working`
     - `A new idea`
   - Required: **Yes**

3. **Your feedback:**
   - Type: Paragraph (Long text)
   - Required: **Yes**

4. **Your class:**
   - Type: Multiple Choice
   - Options:
     - `8`
     - `9`
     - `10`
     - `Other`
   - Required: **No (Optional)**

---

## 2. Important Form Settings for Anonymous Access

Click the **Settings** tab in the Google Form editor:

- **Responses**:
  - `Collect email addresses`: **Do not collect**
  - `Send responders a copy of their response`: **Off**
  - `Allow response editing`: **Off**
  - `Limit to 1 response`: **Off** (keeps sign-in disabled for anonymous mobile use)
- **Presentation**:
  - `Show link to submit another response`: **Off**
  - `View results summary`: **Off** (students cannot see other responses)
  - `Confirmation message`:
    > *Thank you! Your feedback helps PPES improve the toolkit.*

---

## 3. Link Responses to a Private Google Sheet

1. In Google Forms, click the **Responses** tab.
2. Click **Link to Sheets** (or the green Sheets icon) -> **Create a new spreadsheet** -> Name it `PPES AI Toolkit - Student Feedback`.
3. In Google Drive, verify that this spreadsheet is **Restricted** (only accessible to the PPES team).

---

## 4. Automatic Email Notifications to PPES Gmail

You can choose either Option A (built-in basic notification) or Option B (full feedback in email).

### Option A: Basic Notification (Instant, zero code)
1. On the **Responses** tab of Google Forms, click the three-dots menu `⋮`.
2. Check **Get email notifications for new responses**.
3. Whenever a student submits feedback, an email alert is sent to `prarambhpath4444@gmail.com`.

---

### Option B: Full Feedback Inside Each Email (Google Apps Script)
To receive the actual answers inside the email without opening Sheets:

1. Open the connected **Google Sheet** (`PPES AI Toolkit - Student Feedback`).
2. In the menu, click **Extensions** > **Apps Script**.
3. Delete any default code in `Code.gs` and paste the following:

```javascript
/**
 * PPES AI Study Toolkit - Automated Feedback Notifier
 * Sends an email directly to PPES whenever a new feedback is submitted.
 */
function onFormSubmit(e) {
  var recipient = "prarambhpath4444@gmail.com";
  var subject = "New PPES Toolkit Feedback";
  
  // Format submission details
  var timestamp = e.values ? e.values[0] : new Date().toLocaleString();
  var experience = e.values ? e.values[1] : "N/A";
  var category = e.values ? e.values[2] : "N/A";
  var feedback = e.values ? e.values[3] : "N/A";
  var studentClass = e.values ? (e.values[4] || "Not specified") : "N/A";

  var body = 
    "New feedback received for PPES AI Study Toolkit:\n\n" +
    "--------------------------------------------------\n" +
    "Timestamp: " + timestamp + "\n" +
    "Experience: " + experience + "\n" +
    "Category: " + category + "\n" +
    "Class: " + studentClass + "\n\n" +
    "Feedback:\n" + feedback + "\n" +
    "--------------------------------------------------\n\n" +
    "Open Google Sheet to view all responses:\n" +
    SpreadsheetApp.getActiveSpreadsheet().getUrl();

  MailApp.sendEmail(recipient, subject, body);
}
```

4. Click **Save** (disk icon).
5. Click **Triggers** (clock icon on the left sidebar).
6. Click **+ Add Trigger** (bottom right):
   - Choose which function to run: `onFormSubmit`
   - Select event source: `From spreadsheet`
   - Select event type: `On form submit`
   - Failure notification settings: `Notify me immediately`
7. Click **Save** and grant permissions for your Google account.

---

## 5. Integrating with the Toolkit App

1. In Google Forms, click the **Send** button (top right).
2. Go to the **Embed HTML** (`< >`) tab and copy the `src` URL (e.g., `https://docs.google.com/forms/d/e/.../viewform?embedded=true`).
3. Also copy the short URL (from the link tab) for direct fallback.
4. Update `c:\Users\parth\Downloads\PPPTK\data\feedback.ts` with your actual form URLs or set the environment variable:
   ```env
   NEXT_PUBLIC_FEEDBACK_FORM_URL="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
   ```
