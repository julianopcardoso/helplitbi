const {google} = require('googleapis');
require('dotenv').config();

async function insertValues(valueA, valueB, valueC, valueD, valueE, valueF, valueG, valueH, valueI, valueJ){
    
    const gcsKey = JSON.parse(
        Buffer.from(process.env.GOOGLE_CREDENTIALS_FILE, 'base64').toString()
      );
     
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],       
        credentials: {
            client_email: gcsKey.client_email,
            private_key: gcsKey.private_key
        },
        projectId: gcsKey.project_id,
      });
      
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET;
    const range = process.env.GOOGLE_SPREADSHEET_RANGE;

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
        values: [
            [valueA, valueB, valueC, valueD, valueE, valueF, valueG, valueH, valueI, valueJ]
        ],
        },
    });
      
}

module.exports = {
    insertValues
};
