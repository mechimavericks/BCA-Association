"use client";
import { motion } from "framer-motion";
import moment from "moment";
import Link from "next/link";

export default function News({ title, description, date, image, id }) {
  return (
    <section>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative bg-white  rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl w-full" // Fixed width
      >
        {/* News Image with Gradient Overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg z-10 drop-shadow-lg">
            {title}
          </h3>
        </div>

        {/* News Content */}
        <div className="p-4 flex flex-col justify-between h-32">
          <p className="text-gray-500 text-xs">{moment(date).fromNow()}</p>
          <p className="mt-2 text-gray-700 text-sm line-clamp-3 overflow-hidden">
            {description}
          </p>
        </div>

        {/* Read More Button */}
        <div className="px-4 pb-4">
          <Link
            href={"/events/" + id}
            className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-full text-xs font-semibold shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3a1 1 0 00-1 1v4H6a1 1 0 100 2h3v4a1 1 0 002 0v-4h3a1 1 0 100-2h-3V4a1 1 0 00-1-1z" />
            </svg>
            Read More
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
