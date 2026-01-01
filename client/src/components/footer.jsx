import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">LMS</h2>
          <p className="text-gray-400 text-sm">
            Learn at your pace with our online courses. Expand your knowledge and skills from anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">Courses</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/help" className="hover:text-white">Help Center</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm">123 LMS Street, Learning City, 45678</p>
          <p className="text-gray-400 text-sm mt-2">Email: support@lms.com</p>
          <p className="text-gray-400 text-sm">Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-6">
        <p className="text-center text-gray-500 py-4 text-sm">
          &copy; {new Date().getFullYear()} LMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
