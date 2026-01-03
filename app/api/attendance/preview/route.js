import fs from 'fs';
import path from 'path';

const studentsPath = path.join(process.cwd(), 'data/students.json');

export async function POST(req) {
  const { roll } = await req.json();

  const students = JSON.parse(fs.readFileSync(studentsPath));
  const student = students.find(s => s.roll === roll);

  if (!student) {
    return Response.json({ error: 'Invalid roll number' }, { status: 400 });
  }

  return Response.json({ name: student.name });
}
