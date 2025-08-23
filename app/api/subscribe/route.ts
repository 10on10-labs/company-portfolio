import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const POST = async (req: Request) => {
  const { email } = await req.json();
  if (!email) {
    console.error('Email not attached in the body!');
    return NextResponse.json({ success: false, message: 'Email not found!' }, { status: 500 });
  }
  try {
    const response = await addSubscriberToGoogleSheets(email);
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error || 'Error adding email' },
      { status: 500 },
    );
  }
};

const SHEET_ID = 'YOUR_SPREADSHEET_ID'; // from URL
const RANGE = 'Subscribers!A:A'; // A single column in sheet "Subscribers"

// Load credentials
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // your service account JSON
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function addSubscriberToGoogleSheets(email: string) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client as any });

  // 2. Append new email
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: RANGE,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[email]],
    },
  });

  return response;
}
