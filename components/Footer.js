import React from 'react'

const Footer = () => {
  return (
    
<footer className="bg-white text-blue-900 pt-20 mt-10 border-t border-blue-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-bold">BCA Association MMC</h2>
            <p className="text-gray-600 mt-2 text-lg">Empowering students through community and collaboration.</p>
          </div>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 mb-6 md:mb-0">
            <a href="/" className="hover:text-blue-700 transition duration-200 text-lg mb-2 md:mb-0">Home</a>
            <a href="/about" className="hover:text-blue-700 transition duration-200 text-lg mb-2 md:mb-0">About</a>
            <a href="/news" className="hover:text-blue-700 transition duration-200 text-lg mb-2 md:mb-0">News & Notices</a>
            <a href="/teams" className="hover:text-blue-700 transition duration-200 text-lg mb-2 md:mb-0">Teams</a>
            <a href="/contact" className="hover:text-blue-700 transition duration-200 text-lg">Contact</a>
          </div>
          <div className="flex space-x-6">
            <a href="#" aria-label="Facebook" className="hover:text-blue-700 transition duration-200 text-3xl">
              <i className="bx bxl-facebook-circle"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-700 transition duration-200 text-3xl">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-700 transition duration-200 text-3xl">
              <i className="bx bxl-instagram"></i>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-6 pt-6">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} BCA Association MMC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>    )
}

export default Footer
