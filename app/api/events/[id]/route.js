import connectToDB from "@/lib/connectToDatabase";
import Event from "@/models/eventModel";

export async function GET(request, { params }) {
  const { id } = params;
  const db = await connectToDB();
  if (!db) {
    return Response.json({
      status: "error",
      message: "Database connection failed",
    });
  }

  try {
    const events = await Event.findById(id);
    if (!events) {
      return Response.json({
        status: "error",
        message: "Event not found",
      });
    } else {
      return Response.json({
        status: "success",
        data: events,
      });
    }
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
export async function PUT(request,{ params }) {
  const { id } = params;
  const conn = await connectToDB();
  if (!conn) {
    return Response.json({
      status: "error",
      message: "Database connection failed",
    });
  }
  const res = await request.json();
  const { title, shortDesc, date, content, banner, thumbnail } = res;

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { title, shortDesc, date, content, banner, thumbnail },
    { new: true }
  );

  if (!updatedEvent) {
    return Response.json({
      status: "error",
      message: "Event not found",
    });
  }

  return Response.json({
    status: "success",
    data: updatedEvent,
  });
}

