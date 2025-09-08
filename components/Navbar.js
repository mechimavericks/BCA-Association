"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (pathname.includes("admin")) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [pathname]);

  if (!showNav)
    return (
      <nav className="bg-white fixed w-full top-0 z-20 shadow-sm backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/images/association.png"
                alt="BCA Association Logo"
                width={60}
                height={60}
              />
              <span className="ml-3 text-xl font-bold text-blue-800 hidden md:block">
                BCA Association MMC | Admin
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/admin/events"
              className="text-blue-800 font-normal hover:text-blue-600 transition duration-200"
            >
              Events
            </Link>
            <Link
              href="/admin/tickets"
              className="text-blue-800 font-normal hover:text-blue-600 transition duration-200"
            >
              Tickets
            </Link>
            <Link
              href="/admin/tickets"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              Tickets
            </Link>
            <Link
              href="/admin/contacts"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              Contacts
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="hidden md:flex items-center space-x-4 text-blue-800">
            <Link href="/logout" className="hover:text-blue-600 font-normal">
              Logout
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              <svg
                className="w-6 h-6 text-blue-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md rounded-b-lg"
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              <Link
                href="/"
                className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
                onClick={handleLinkClick}
              >
                HOME
              </Link>
              <Link
                href="/admin/events"
                className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
                onClick={handleLinkClick}
              >
                Events
              </Link>
              <Link
                href="/admin/tickets"
                className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
                onClick={handleLinkClick}
              >
                Tickets
              </Link>
            </div>

            {/* Mobile Social Media Links */}
            <div className="flex justify-center space-x-6 mt-4 text-blue-800">
              <Link href="/logout" className="hover:text-blue-600">
                Logout
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    );

  return (
    <nav className="bg-white fixed w-full top-0 z-20 shadow-sm backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" onClick={() => setIsQuestionsOpen(false)} >
          <div className="flex items-center">
            <Image
              src="/images/association.png"
              alt="BCA Association Logo"
              width={60}
              height={60}
            />
            <span className="ml-3 text-xl font-bold text-blue-800 hidden md:block">
              BCA Association MMC
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 ">
          <Link
            href="/teams"
            onClick={() => setIsQuestionsOpen(false)}
            className="text-blue-800 font-normal hover:text-blue-600 transition duration-200"
          >
            Team
          </Link>
          <Link
            href="/events"
            onClick={() => setIsQuestionsOpen(false)}
            className="text-blue-800 font-normal hover:text-blue-600 transition duration-200"
          >
            Events & Notices
          </Link>

          {/* Questions Dropdown */}
         
          <div className="relative">
            <button
              onClick={() => setIsQuestionsOpen(!isQuestionsOpen)}
              className="text-blue-800 font-normal hover:text-blue-600 transition duration-200 flex justify-center items-center"
            >
              Questions
              <svg
                className={`ml-1 w-4 h-4 transform transition-transform ${isQuestionsOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isQuestionsOpen && (
              <div className="absolute left-0 bg-white shadow-lg rounded-md mt-2 w-48 z-30">
                <Link
                  href="/entrance"
                  onClick={() => setIsQuestionsOpen(false)}
                  className="block px-4 py-2 text-blue-800 hover:bg-blue-100"
                >
                  Entrance
                </Link>
                {/* <Link
                  href="/questions"
                  onClick={() => setIsQuestionsOpen(false)}
                  className="block px-4 py-2 text-blue-800 hover:bg-blue-100"
                >
                  Old Questions
                </Link> */}
              </div>
            )}
          </div>

          <Link
            href="/ticket"
            onClick={() => setIsQuestionsOpen(false)}
            className="text-blue-800 font-normal hover:text-blue-600 transition duration-200"
          >
            Problem? Report Here
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="hidden md:flex items-center space-x-4 text-blue-800">
          <a
            href="https://www.facebook.com/bcaassociation"
            aria-label="Facebook"
            target="_blank"
            className="hover:text-blue-600 font-normal"
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="mailto:bcaassociationmmc@gmail.com"
            aria-label="email"
            target="_blank"
            className="hover:text-blue-600 font-normal"
          >
            <FaEnvelope className="font-normal text-2xl" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <svg
              className="w-6 h-6 text-blue-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto",paddingBottom:"1rem" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md rounded-b-lg"
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              href="/"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              HOME
            </Link>
            <Link
              href="/teams"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              TEAMS
            </Link>
            <Link
              href="/events"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              EVENTS & NOTICES
            </Link>
            {/* Mobile Questions Links */}
            <Link
              href="/entrance"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              ENTRANCE
            </Link>
            {/* <Link
              href="/questions/old"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              OLD QUESTIONS
            </Link> */}
            <Link
              href="/ticket"
              className="text-blue-800 font-semibold hover:text-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile Social Media Links */}
          <div className="flex justify-center space-x-6 mt-4 text-blue-800">
            <a
              href="https://www.facebook.com/bcaassociation"
              target="_blank"
              aria-label="Facebook"
              className="hover:text-blue-600"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="mailto:bcaassociationmmc@gmail.com"
              target="_blank"
              aria-label="Email"
              className="hover:text-blue-600"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );

};

export default Navbar;
