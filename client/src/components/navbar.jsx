import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/Authcontext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await api.post("/users/logout");

      if (res.data.success) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-cyan-400 hover:text-cyan-300"
          >
            LMS
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Contact Us
            </Link>

            <Link
              to="/careers"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Careers
            </Link>

              <Link
              to="/blog"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Blog
            </Link>

            <Link
              to="/blogdetail"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Blog-Details
            </Link>

            <Link
              to="/pricing"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Pricing
            </Link>

            
            <Link
              to="/faq"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              FAQ
            </Link>

            <Link
              to="/testimonials"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Testimonials
            </Link>

            <Link
              to="/profile"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
            >
              Profile
            </Link>


            {user && user.role === "instructor" && (
              <Link
                to="/instructor/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
              >
                Instructor Dashboard
              </Link>
            )}

            {user && user.role === "student" && (
              <Link
                to="/student/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gray-800"
              >
                Student Dashboard
              </Link>
            )}

            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg text-sm font-semibold
                           bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg text-sm font-semibold
                             bg-gray-800 text-white border border-gray-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg text-sm font-semibold
                             bg-cyan-600 text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
