"use client";
import Link from "next/link";
import moment from "moment";
import React from "react";
import Countdown from "react-countdown";

const NewsMain = ({ event }) => {
  if (!event) {
    throw new Error("Failed to Fetch Event.");
  }

  const isEventFromFuture = new Date(event?.date) > new Date();

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    }

    return (
      <div className="flex gap-4 p-4  text-green-900 rounded-lg text-center">
        {days > 0 && (
          <div className="flex flex-col items-center">
            <p className="text-4xl font-mono bg-gray-300 px-4 py-2 rounded-md">
              {String(days).padStart(2, "0")}
            </p>
            <p className="text-xs uppercase mt-1">Days</p>
          </div>
        )}

        {hours > 0 && (
          <div className="flex flex-col items-center">
            <p className="text-4xl font-mono bg-gray-300 px-4 py-2 rounded-md">
              {String(hours).padStart(2, "0")}
            </p>
            <p className="text-xs uppercase mt-1">Hours</p>
          </div>
        )}

        <div className="flex flex-col items-center">
          <p className="text-4xl font-mono bg-gray-300 px-4 py-2 rounded-md">
            {String(minutes).padStart(2, "0")}
          </p>
          <p className="text-xs uppercase mt-1">Minutes</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-4xl font-mono bg-gray-300 px-4 py-2 rounded-md">
            {String(seconds).padStart(2, "0")}
          </p>
          <p className="text-xs uppercase mt-1">Seconds</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">{event?.title}</h1>
        <p className="text-gray-500 text-sm mt-2">
          Posted {moment(new Date(event?.createdAt)).fromNow()}
        </p>
      </div>
      <div className="mt-8">
        <Link href="/event" className="text-blue-600 hover:text-blue-800">
          ← Back to Event
        </Link>
      </div>
      <div className="relative w-full mb-8">
        <img
          src={event?.banner}
          alt={event?.title}
          className="rounded-lg shadow-lg max-h-96 w-full object-cover"
        />
      </div>
      <div className="text-lg text-gray-700 leading-relaxed">
        <p>{event?.shortDesc}</p>
      </div>
      <div
        className="mt-8 text-gray-800 text-lg w-full"
        dangerouslySetInnerHTML={{ __html: event?.content }}
      ></div>
      <div className="flex justify-center items-center">
        {/* check if event is from future or present */}
        {isEventFromFuture ? (
          <div className="flex flex-col gap-2 p-5 justify-center items-center bg-gray-100 rounded-lg mt-8">
            <p className="text-gray-600 text-lg mr-2">Event is Scheduled for</p>
            <Countdown
              date={new Date(event?.date)}
              renderer={renderer}
              className="text-red-600 text-lg"
            />
          </div>
        ) : (
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md mt-8 cursor-not-allowed">
            Event Ended
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsMain;
