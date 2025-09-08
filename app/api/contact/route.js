import connectToDB from "@/lib/connectToDatabase";
import Contact from "@/models/contactModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const res = await request.json();
    const { name, email, message } = res;
    
    // Validate required fields
    if (!name || !email || !message) {
      return Response.json({
        status: "error",
        message: "Name, email, and message are required fields",
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({
        status: "error",
        message: "Please provide a valid email address",
      }, { status: 400 });
    }
    
    // Sanitize inputs
    const sanitizedName = name.trim().replace(/<[^>]*>?/gm, '');
    const sanitizedMessage = message.trim().replace(/<[^>]*>?/gm, '');
    
    // Connect to database
    const db = await connectToDB();
    if (!db) {
      return Response.json({
        status: "error",
        message: "Database connection failed",
      }, { status: 500 });
    }

    // Get IP address from request headers (optional)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(/, /)[0]
      : request.headers.get("x-real-ip") || "Unknown";

    // Create new contact record
    const newContact = await Contact.create({
      name: sanitizedName,
      email,
      message: sanitizedMessage,
      ip,
    });

    return Response.json({
      status: "success",
      message: "Your message has been received. We'll get back to you soon!",
      data: newContact,
    }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({
      status: "error",
      message: error.message || "An error occurred while submitting your message",
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await connectToDB();
    if (!db) {
      return Response.json({
        status: "error",
        message: "Database connection failed",
      }, { status: 500 });
    }

    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return Response.json({
      status: "success",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return Response.json({
      status: "error", 
      message: "Failed to fetch contact messages"
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
      return Response.json({
        status: "error",
        message: "Unauthorized",
      }, { status: 401 });
    }

    // Get the contact ID from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return Response.json({
        status: "error",
        message: "Contact ID is required",
      }, { status: 400 });
    }
    
    // Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return Response.json({
        status: "error",
        message: "Invalid contact ID format",
      }, { status: 400 });
    }
    
    // Connect to database
    const db = await connectToDB();
    if (!db) {
      return Response.json({
        status: "error",
        message: "Database connection failed",
      }, { status: 500 });
    }
    
    // Find and delete the contact
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return Response.json({
        status: "error",
        message: "Contact not found",
      }, { status: 404 });
    }
    
    return Response.json({
      status: "success",
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    return Response.json({
      status: "error",
      message: error.message || "An error occurred while deleting the contact",
    }, { status: 500 });
  }
}
