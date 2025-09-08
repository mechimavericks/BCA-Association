'use client'
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <section>
    <div className="text-center my-8">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-blue-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-2 text-lg md:text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="mt-4 mx-auto w-20 h-1 bg-blue-800 rounded"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
    </div>
    </section>
  );
};

export default SectionHeader;
