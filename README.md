# Teacher ID Details Form

Static HTML form for collecting teacher details and storing submissions in Google Sheets.

## Connect Google Sheets

1. Create a Google Sheet at https://sheets.new.
2. In the Sheet, open Extensions > Apps Script.
3. Paste the code from `google-apps-script.gs`.
4. Deploy it as a Web App.
5. Set access to "Anyone with the link".
6. Copy the Web App URL.
7. Open `index.html` and paste the URL into this line:

```js
const GOOGLE_SHEET_WEB_APP_URL = "";
```

After this, teachers will only see the form. Submissions will be added to the Sheet, and uploaded photos will be saved to Google Drive with the photo link stored in the Sheet.
