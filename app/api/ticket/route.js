import connectToDB from "@/lib/connectToDatabase";
import Ticket from "@/models/ticketModel";
import { headers } from "next/headers";

export async function POST(request) {
  const res = await request.json();
  const { name, email, semester, issue, anonymous, ip } = res;
  const db = await connectToDB();
  if (!db) {
    return Response.json({
      status: "error",
      message: "Database connection failed",
    });
  }

  if (!issue) {
    return Response.json({
      status: "error",
      message: "Issue is required",
    });
  }

  if (!anonymous) {
    if (!name || !email || !semester) {
      return Response.json({
        status: "error",
        message: "Name, email and semester are required",
      });
    }
  }

  if (!ip) {
    return Response.json({
      status: "error",
      message: "Couldn't create ticket, please try again",
    });
  }

  const newTicket = await Ticket.create({
    name,
    email,
    semester,
    issue,
    anonymous,
    ip,
  });

  return Response.json({
    status: "success",
    data: newTicket,
  });
}

export async function GET() {
  const db = await connectToDB();
  if (!db) {
    return Response.json({
      status: "error",
      message: "Database connection failed",
    });
  }

  const tickets = await Ticket.find({}).sort({ createdAt: -1 });
  return Response.json({
    status: "success",
    data: tickets,
  });
}
