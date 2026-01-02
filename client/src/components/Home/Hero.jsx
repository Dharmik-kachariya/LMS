import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Learn Anytime, Anywhere
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto mb-6">
        An online learning platform to improve your skills with
        industry-ready courses.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Get Started
        </Link>

        <Link
          to="/courses"
          className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Browse Courses
        </Link>
      </div>
    </section>
  );
};

export default Hero;
