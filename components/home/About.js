"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle paragraph

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1200, once: false }); // AOS animations will run once
  }, []);

  const toggleParagraph = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="max-w-6xl mx-auto mt-24 text-center -z-10"
      data-aos="fade-up"
    >
      <div className="flex flex-col-reverse xl:flex-row-reverse items-center justify-around gap-8 font-extralight pt-6 rounded-lg max-w-6xl mx-auto px-5">
        {/* Text Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-2"
          data-aos="fade-right" // AOS for scroll animation
        >
          <SectionHeader
            title="About Us"
            subtitle="Learn more about our association and our mission."
          />
          <p className="text-md leading-relaxed text-justify">
            The BCA Association - MMC is a non-political student organization at
            Mechi Multiple Campus, dedicated to fostering technical skills,
            academic growth, and community engagement among BCA students. We
            organize workshops, seminars, hackathons, coding competitions, and
            networking events to help students stay updated with industry trends
            and enhance their practical knowledge. Additionally, we advocate for
            student concerns and promote extracurricular activities, creating a
            well-rounded learning environment.
          </p>

          {/* AnimatePresence for smooth transition */}
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="text-md leading-relaxed text-justify mt-4 overflow-hidden"
              >
                Our aim is to bridge the gap between academic learning and industry
                requirements by providing hands-on experiences, mentorship, and
                collaborative opportunities. Through various initiatives, we empower
                students to innovate, build, and contribute to the ever-evolving field of
                technology.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={toggleParagraph}
            className="mt-4 px-6 py-2 bg-blue-800 text-white font-semibold rounded-full shadow hover:bg-blue-900 transition-colors"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </motion.button>
        </motion.div>

        {/* Image Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-md xl:min-w-[600px] min-w-full"
          data-aos="fade-left" // AOS for scroll animation
        >
          <img
            src="/images/association2.jpg"
            alt="BCA Association MMC"
            className="w-auto h-auto object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
