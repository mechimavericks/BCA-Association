import MainEvents from "@/components/admin/events/MainEvents";
import TicketMain from "@/components/admin/tickets/TicketMain";
import ContactMain from "@/components/admin/contacts/ContactMain";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const fetchEvents = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/events");
    return res.json();
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

export const fetchTickets = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/ticket");
    return res.json();
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

export const fetchContacts = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/contact");
    return res.json();
  } catch (error) {
    return { status: "error", message: error.message };
  }
}

async function page({ params }) {
  const { type } = await params;
  const events = await fetchEvents();
  const tickets = await fetchTickets();
  const contacts = await fetchContacts();

  const cookieset = await (await cookies()).get("token");
  if (!cookieset) {
    redirect("/admin/login");
  }

  if (events.status !== "success") {
    return <div>Failed to fetch events data</div>;
  }

  if (tickets.status !== "success") {
    return <div>Failed to fetch tickets data</div>;
  }

  if (contacts.status !== "success" && type === "contacts") {
    return <div>Failed to fetch contacts data</div>;
  }

  const option = ["events", "tickets", "contacts"];
  if (!option.includes(type)) {
    console.log("type", type);
    return (
      <div className="min-h-screen flex items-center justify-center p-5 pt-24 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-2xl mt-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-lg mt-2">
            It seems like you might have taken a wrong turn. {type}
          </p>
          <a
            href="/"
            className="mt-6 inline-block bg-white text-black py-2 px-4 rounded-md text-xl hover:bg-gray-200"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (type === "events") {
      return <MainEvents events={events.data} />;
    }

    if (type === "tickets") {
      return <TicketMain tickets={tickets.data} />;
    }

    if (type === "contacts") {
      return <ContactMain contacts={contacts.data} />;
    }
  };

  return (
    <div className="min-h-screen flex p-5 pt-24 w-full">{renderContent()}</div>
  );
}

export default page;
