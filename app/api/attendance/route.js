import fs from 'fs';
import path from 'path';

const studentsPath = path.join(process.cwd(), 'data/students.json');
const sessionPath = path.join(process.cwd(), 'data/session.json');

const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxPpTsEjSyF9wlUURCTnSSrPAdDknm-p8TD-20eE2r-Fet2YPnV77rHl_wQznKHNzrb/exec';

export async function POST(req) {
  try {
    const { roll, fingerprint } = await req.json();

    // 1️⃣ Check session
    const session = JSON.parse(fs.readFileSync(sessionPath, 'utf-8'));
    if (!session.event.active) {
      return Response.json(
        { error: 'Attendance closed' },
        { status: 403 }
      );
    }

    // 2️⃣ Validate student
    const students = JSON.parse(fs.readFileSync(studentsPath, 'utf-8'));
    const student = students.find(s => s.roll === roll);

    if (!student) {
      return Response.json(
        { error: 'Invalid roll number' },
        { status: 400 }
      );
    }

    // 3️⃣ Date handling (KEY FIX)
    const today = new Date().toISOString().split('T')[0];
    const timestamp = new Date().toLocaleTimeString();

    // 4️⃣ Send to Google Sheet
    const res = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: today,
        event: session.event.name,
        roll,
        name: student.name,
        fingerprint,
        timestamp
      })
    });

    const data = await res.json();

    // 5️⃣ Duplicate handling (from Sheet)
    if (data.error) {
      return Response.json(
        { error: data.error },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      name: student.name
    });

  } catch (err) {
    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
