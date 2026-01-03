import fs from 'fs';
import path from 'path';

const studentsPath = path.join(process.cwd(), 'data/students.json');
const sessionPath = path.join(process.cwd(), 'data/session.json');

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx2Tu_fbTLuQyJdF8_0yNiHpSat_z8g_n-SyKuCojbb-F9sovr53eil-knIpBje_h4P/exec';

export async function POST(req) {
  const { roll, fingerprint } = await req.json();

  const session = JSON.parse(fs.readFileSync(sessionPath));
  if (!session.event.active) {
    return Response.json({ error: 'Attendance closed' }, { status: 403 });
  }

  const students = JSON.parse(fs.readFileSync(studentsPath));
  const student = students.find(s => s.roll === roll);

  if (!student) {
    return Response.json({ error: 'Invalid roll number' }, { status: 400 });
  }

  const res = await fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    body: JSON.stringify({
      roll,
      name: student.name,
      fingerprint,
      event: session.event.name
    })
  });

  const data = await res.json();

  if (data.error) {
    return Response.json({ error: data.error }, { status: 400 });
  }

  return Response.json({ success: true, name: student.name });
}
