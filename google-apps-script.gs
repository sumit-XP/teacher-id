const SHEET_NAME = "Teacher Details";
const DRIVE_FOLDER_NAME = "Teacher ID Photos";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  const sheet = getSheet_();
  const photoUrl = savePhoto_(payload.photo);

  sheet.appendRow([
    new Date(),
    payload.fullName || "",
    payload.mobile || "",
    payload.email || "",
    payload.bloodGroup || "",
    payload.dob || "",
    payload.gender || "",
    payload.residentialAddress || "",
    payload.identificationMark || "",
    payload.medicalNotes || "",
    photoUrl
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted At",
      "Name",
      "Mobile Number",
      "Email",
      "Blood Group",
      "Date Of Birth",
      "Gender",
      "Residential Address",
      "Identification Mark",
      "Medical Notes",
      "Photo URL"
    ]);
  }

  return sheet;
}

function savePhoto_(photo) {
  if (!photo || !photo.data) {
    return "";
  }

  const folder = getOrCreateFolder_();
  const bytes = Utilities.base64Decode(photo.data);
  const safeName = String(photo.name || "teacher-photo.jpg").replace(/[\\/:*?"<>|]/g, "-");
  const blob = Utilities.newBlob(bytes, photo.type || "image/jpeg", safeName);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getOrCreateFolder_() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }

  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}
