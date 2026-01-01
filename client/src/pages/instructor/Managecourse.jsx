import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/course/instructor",
        { withCredentials: true }
      );
      setCourses(res.data);
      setFilteredCourses(res.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ SEARCH + FILTER LOGIC
  useEffect(() => {
    let result = courses;

    // Search by title
    if (search.trim()) {
      result = result.filter((course) =>
        course.courseTitle
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Filter by level
    if (levelFilter) {
      result = result.filter(
        (course) => course.courseLevel === levelFilter
      );
    }

    // Min price
    if (minPrice !== "") {
      result = result.filter(
        (course) => Number(course.courseprice) >= Number(minPrice)
      );
    }

    // Max price
    if (maxPrice !== "") {
      result = result.filter(
        (course) => Number(course.courseprice) <= Number(maxPrice)
      );
    }

    setFilteredCourses(result);
  }, [search, levelFilter, minPrice, maxPrice, courses]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/course/${courseId}`,
        { withCredentials: true }
      );
      fetchCourses();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Courses
        </h2>

        <Link
          to="/instructor/create-course"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + Create Course
        </Link>
      </div>

      {/* 🔍 SEARCH & FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {/* Search with Icon */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by course title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Level Filter */}
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="border rounded-md px-4 py-2"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Min Price */}
        <input
          type="number"
          min="0"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-md px-4 py-2"
        />

        {/* Max Price */}
        <input
          type="number"
          min="0"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-md px-4 py-2"
        />

        {/* Reset */}
        <button
          onClick={() => {
            setSearch("");
            setLevelFilter("");
            setMinPrice("");
            setMaxPrice("");
          }}
          className="bg-gray-200 rounded-md px-4 py-2 hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

      {/* COURSE LIST */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white border rounded-lg p-10 text-center text-gray-500">
          No courses found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {course.courseTitle}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                Level: {course.courseLevel || "Beginner"} • ₹
                {course.courseprice || 0}
              </p>

              <div className="flex gap-3">
                <Link
                  to={`/course/${course._id}`}
                  className="px-3 py-1.5 text-sm rounded-md bg-green-100 text-green-700 hover:bg-green-200"
                >
                  View
                </Link>

                <Link
                  to={`/instructor/edit-course/${course._id}`}
                  className="px-3 py-1.5 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
