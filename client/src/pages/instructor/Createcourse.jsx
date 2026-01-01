import { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "Beginner",
    courseprice: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // ✅ VALIDATION
    if (!formData.courseTitle || !formData.category) {
      setMessage("Course title and category are required.");
      return;
    }

    if (Number(formData.courseprice) < 0) {
      setMessage("Price cannot be negative.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/course",
        formData,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Course created successfully");

      setFormData({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "Beginner",
        courseprice: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 text-white">
        
        <h2 className="text-3xl font-extrabold mb-2 text-center">
          🎓 Create New Course
        </h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          Fill in the details to publish your course
        </p>

        {message && (
          <div className="mb-4 text-center text-sm text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-2">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            name="courseTitle"
            placeholder="Course Title"
            value={formData.courseTitle}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            name="subTitle"
            placeholder="Sub Title"
            value={formData.subTitle}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            name="description"
            placeholder="Course Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CATEGORY */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="DevOps">DevOps</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="UI/UX Design">UI / UX Design</option>
              <option value="Programming Languages">Programming Languages</option>
            </select>

            <select
              name="courseLevel"
              value={formData.courseLevel}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* ✅ PRICE – NEGATIVE BLOCKED */}
          <input
            type="number"
            name="courseprice"
            placeholder="Price (₹)"
            value={formData.courseprice}
            onChange={handleChange}
            min="0"
            step="1"
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 p-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
