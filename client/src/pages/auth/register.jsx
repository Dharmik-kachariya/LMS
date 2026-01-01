import { useState } from 'react';
import api from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Optional: toggle to show/hide form
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);
      const { data } = await api.post('users/register', formData);
      alert(data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      {/* Optional toggle button */}
      <button
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Register Form" : "Show Register Form"}
      </button>

      {/* Conditional form rendering */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <p className="text-gray-400 mt-4 text-center">
            Already have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
}
