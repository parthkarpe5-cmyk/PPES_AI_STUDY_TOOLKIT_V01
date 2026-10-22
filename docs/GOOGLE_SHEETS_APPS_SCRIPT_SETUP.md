# Setting up PPES Feedback in Google Sheets & Apps Script

This guide provides the complete setup for:
**Website Form** → **Next.js Server API (`/api/feedback`)** → **Google Apps Script Web App** → **Private Google Sheet** → **PPES Gmail Notification**.

---

## 1. Create the Private Google Sheet

1. Log into your **PPES Google Account** (e.g. `prarambhpath4444@gmail.com`).
2. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
3. Name the spreadsheet:
   `PPES AI Toolkit - Student Feedback`
4. Confirm sharing settings:
   - Click the green **Share** button in the top right.
   - Ensure General access is set to **Restricted** (only you / the PPES team have access).

---

## 2. Add the Apps Script Code

1. In your new Google Sheet, click **Extensions** > **Apps Script**.
2. Rename the project in the top left from `Untitled project` to `PPES Feedback Receiver`.
3. In the code editor, replace all code inside `Code.gs` with the complete script from [apps_script_receiver.gs](file:///c:/Users/parth/Downloads/PPPTK/docs/apps_script_receiver.gs).

---

## 3. Configure Script Properties (Secret & Email)

To prevent credentials from being hardcoded in scripts or exposed on the client:

1. In the Apps Script left sidebar, click the gear icon **Project Settings** (⚙️).
2. Scroll down to **Script Properties** and click **Add script property**.
3. Add the following two properties:

| Property Name | Property Value | Explanation |
| :--- | :--- | :--- |
| `FEEDBACK_SHARED_SECRET` | *Generate a random 32+ character string (e.g. `ppes_sec_9f7a8b32c4e10d65`)* | Used by Next.js server to authenticate |
| `FEEDBACK_RECIPIENT_EMAIL` | `goichomanis2006@gmail.com` | Destination Gmail for notifications |

4. Click **Save script properties**.

---

## 4. Run the Initial Setup Function

1. Switch back to the **Editor** (`< >` icon on the left).
2. In the toolbar dropdown next to "Debug", select `setupFeedbackSheet`.
3. Click **Run**.
4. When prompted, click **Review permissions**:
   - Choose your PPES Google account.
   - Click **Advanced** > **Go to PPES Feedback Receiver (unsafe)**.
   - Click **Allow**.
5. Look at your Google Sheet: a new sheet tab named **`Toolkit_Feedback`** has been created with dark navy headers, frozen rows, and columns formatted.

---

## 5. Deploy as Web App

1. In the top right of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `PPES Feedback v1`
   - **Execute as**: **Me (your-account@gmail.com)** *(CRITICAL: must be "Me" so it runs with your Sheet & Gmail permissions)*
   - **Who has access**: **Anyone** *(CRITICAL: Next.js server needs to send HTTP POST without Google login cookies; authenticated via SHARED_SECRET instead)*
4. Click **Deploy**.
5. Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 6. Configure Next.js Environment Variables (Server-Only)

In your local repository root, create or update `.env.local`:

```env
# Server-only variables (never exposed in browser / no NEXT_PUBLIC_ prefix)
PPES_FEEDBACK_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycb.../exec"
PPES_FEEDBACK_SECRET_TOKEN="your_matching_shared_secret_here"
```

> **Security Note:** Because these variables do NOT start with `NEXT_PUBLIC_`, they are strictly confined to the Node.js server runtime on Vercel/Next.js and will never be bundled into client JavaScript.

---

## 7. Free-Tier Quotas & Limitations

| Service | Free Consumer Google Account Quota | Expected PPES Usage |
| :--- | :--- | :--- |
| **Google Sheets Storage** | Up to 10,000,000 cells per workbook | Thousands of feedbacks occupy < 0.1% |
| **Apps Script Execution** | 6 min / execution, 90 min / day | Each POST executes in < 0.8s |
| **Gmail Daily Sending** | 100 emails / day (Consumer) / 1,500 (Google Workspace) | Ample for daily school feedback alerts |

### Failsafe Design:
If the 100 email/day quota is ever reached during peak school events:
- **Zero data loss:** The student's feedback is written to the Google Sheet row **first**.
- In column 6 (`Email Status`), it marks `"Failed: Email quota exceeded"`.
- The student still receives a clean success confirmation because their feedback is preserved in the private sheet.
