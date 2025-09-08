import connectToDB from "@/lib/connectToDatabase";
import Event from "@/models/eventModel";

export async function GET() {
  const conn = await connectToDB();
  if (!conn) {
    return Response.json({
      status: "error",
      message: "Database connection failed",
    });
  }

  const events = await Event.find({}).sort({ createdAt: -1 });
  return Response.json({
    status: "success",
    data: events,
  });
}
export async function POST(request) {
  const conn = await connectToDB();
  if (!conn) {
    return Response.json({
      status: "error",
      message: "Database connection failed",
    });
  }

  const res = await request.json();

  const { title, shortDesc, date, content, banner, thumbnail } = res;

  const postedBy = "Prashant";

  const newEvent = new Event({
    title,
    shortDesc,
    date,
    content,
    banner,
    thumbnail,
    postedBy,
  });

  const event = await newEvent.save();
  return Response.json({
    status: "success",
    data: event,
  });
}
export async function PUT() {}
export async function DELETE() {}
