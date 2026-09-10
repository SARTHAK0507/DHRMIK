/**
 * DHRMIK waitlist backend — Google Apps Script
 *
 * SETUP:
 * 1. Go to sheets.google.com and create a new blank spreadsheet.
 *    Rename it "Dhrmik Waitlist" (or anything you like).
 * 2. In the sheet, go to Extensions → Apps Script.
 * 3. Delete anything in the editor and paste this whole file in.
 * 4. Click Deploy → New deployment.
 *    - Click the gear icon next to "Select type" → choose "Web app".
 *    - Description: "Waitlist form"
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy, and authorize it when Google asks (it's your own script,
 *      so it's safe — click "Advanced" → "Go to project (unsafe)" if warned,
 *      that warning just means Google hasn't reviewed unpublished scripts).
 * 5. Copy the "Web app URL" it gives you (ends in /exec).
 * 6. Paste that URL into script.js where it says
 *    WAITLIST_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE'
 * 7. Re-deploy the site (drag the folder onto Netlify again).
 *
 * Every submission becomes a new row in this sheet: Timestamp, Name, Email, Phone.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Waitlist');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Waitlist');
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone']);
  }

  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name || '', data.email || '', data.phone || '']);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
