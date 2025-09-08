"use client";
import React, { useEffect } from "react";
import SectionHeader from "../SectionHeader";
import News from "../News";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const NewsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <SectionHeader title="Upcomming events" />

      {/* View More Button */}
      <div className="text-center mt-8">
        <Link
          href="/news"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default NewsSection;
