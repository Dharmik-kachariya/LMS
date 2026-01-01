import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/Authcontext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/login", formData);

      if (res.data.success) {
        const user = res.data.user;

        // Save user in AuthContext
        login(user);

        // ✅ Role-based redirect
        if (user.role === "instructor") {
          navigate("/instructor/dashboard");
        } else {
          navigate("/"); // student home
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-linear-to-br from-black via-gray-900 to-black px-4">

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl 
                      rounded-2xl shadow-2xl border border-gray-800 p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white
                       border border-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white
                       border border-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white
                       bg-blue-600 hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
