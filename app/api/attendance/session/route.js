
import fs from 'fs';
import path from 'path';

const sessionPath = path.join(process.cwd(), 'data/session.json');

export async function GET() {
  const session = JSON.parse(fs.readFileSync(sessionPath));
  return Response.json(session.event);
}

export async function POST(req) {
  const { active, name } = await req.json();

  const session = JSON.parse(fs.readFileSync(sessionPath));

  session.event.active = active;
  if (name) session.event.name = name;

  fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2));

  return Response.json({ success: true, event: session.event });
}
