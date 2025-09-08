"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TicketForm() {
  const [anonymous, setAnonymous] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    semester: "",
    issue: "",
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function getIP() {
    const ipaddress = await fetch("https://api.ipify.org?format=json");
    const ip = await ipaddress.json();
    return ip.ip;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ipaddress = await getIP();

    const ticketData = anonymous
      ? { issue: formData.issue, anonymous: anonymous, ip: ipaddress }
      : { ...formData, anonymous: anonymous, ip: ipaddress };

    try {
      const response = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert("Ticket submitted successfully");
        setFormData({
          name: "",
          email: "",
          semester: "",
          issue: "",
          anonymous: false,
        });
      } else {
        alert(data.message);
      }
      console.log(data);
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <div className="max-w-lg md:min-w-[500px] min-w-0 mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-300 relative overflow-hidden">
      <img
        src="https://img.freepik.com/free-photo/abstract-blurred-multi-colored-background-generative-ai_169016-30198.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-6 relative z-10 text-gray-800"
      >
        Submit a Ticket
      </motion.h2>
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-4 relative z-10"
      >
        <div className="flex items-center gap-2">
          <label className="text-gray-700">Submit as:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="submissionType"
                checked={anonymous}
                onChange={() => setAnonymous(true)}
                className="w-5 h-5 accent-blue-500"
              />
              Anonymous
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="submissionType"
                checked={!anonymous}
                onChange={() => setAnonymous(false)}
                className="w-5 h-5 accent-blue-500"
              />
              Yourself
            </label>
          </div>
        </div>
        {!anonymous && (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="Your Semester"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}
        <textarea
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          placeholder="Describe your issue..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md"
        >
          Submit Ticket
        </motion.button>
      </motion.form>
    </div>
  );
}
