import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our LMS?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 px-10">
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-400">
              Learn from experienced developers and professionals.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p className="text-gray-400">
              Access courses anytime, anywhere on any device.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Certificates</h3>
            <p className="text-gray-400">
              Get certified after course completion.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Courses
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["MERN Stack", "React Mastery", "Node.js API"].map((course) => (
            <div
              key={course}
              className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{course}</h3>
              <p className="text-gray-400 mb-4">
                Learn {course} from beginner to advanced level.
              </p>
              <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            LMS Platform
          </h2>
          <p className="text-sm">
            Learn new skills online with top instructors and
            industry-relevant courses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>Web Development</li>
            <li>Data Science</li>
            <li>Mobile Apps</li>
            <li>UI / UX Design</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@lms.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: India</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} LMS Platform. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
