"use client";
import moment from "moment";
import React from "react";

function TicketMain({ tickets }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-4">
        Tickets
      </h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Added</th>
            <th className="px-4 py-2">ISSUE</th>
            <th className="px-4 py-2">IP Address</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Semester</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td className="border px-4 py-2">
                {moment(ticket.createdAt).fromNow()}
              </td>
              <td className="border px-4 py-2">{ticket.issue}</td>
              <td className="border px-4 py-2">
                <a
                  href={`https://www.ip-tracker.org/locator/ip-lookup.php?ip=${ticket.ip}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ticket.ip}
                </a>
              </td>
              <td className="border px-4 py-2">
                {!!ticket.name ? ticket.name : "-"}
              </td>
              <td className="border px-4 py-2">
                {!!ticket.semester ? ticket.semester : "-"}
              </td>
              <td className="border px-4 py-2">
                {!!ticket.email ? ticket.email : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketMain;
