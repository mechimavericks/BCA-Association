"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionHeader from "../SectionHeader";
import TSParticles from "../extra/TSparticle";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1200, once: false }); // AOS animations run once on scroll
  }, []);

  return (
    <div
      className="max-w-7xl min-h-96 mx-auto my-10 text-center relative py-"
      data-aos="fade-up"
    >
       <div className="absolute top-0 left-0 h-full min-h-96 w-full z-30 pointer-events-none">
        <TSParticles />
      </div>
      <div className="relative z-40 flex flex-col md:flex-row items-center justify-between gap-8 font-extralight pt-6 rounded-lg space-y-6 md:space-y-0 md:space-x-8 max-w-6xl mx-auto">
        {/* Text Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-center relative"
          data-aos="fade-right"
        >
          <SectionHeader
            title="BCA Association MMC"
            subtitle="Non-political governing body of BCA students at Mechi Multiple Campus."
          />
          <p className="text-md leading-relaxed text-justify px-4"></p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 0px 12px rgba(66, 153, 225, 0.8)",
              rotate: [0, -1, 1, 0],
              transition: { 
                duration: 0.3,
                rotate: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.5
                }
              }
            }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-4 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold rounded-md shadow-lg hover:from-blue-600 hover:to-blue-900 transition duration-300 ease-in-out transform z-50 flex items-center justify-center gap-2 overflow-hidden group"
            onClick={()=>{
              router.push("/contact");
            }}
          >
            <motion.span
              className="relative z-10"
              animate={{ color: ["#ffffff", "#f0f4ff", "#ffffff"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >Contact Us</motion.span>
                        
            {/* Background glow effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-30"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 0.8 }}
            />
          </motion.button>
        </motion.div>

        {/* Image Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden relative"
          data-aos="fade-left"
        >
          <img
            src="/images/association.png"
            alt="BCA Association MMC"
            height={350}
            width={350}
          />
        </motion.div>
      </div>
     
    </div>
  );
};

export default Hero;
