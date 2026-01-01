import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/course/${courseId}`,
          { withCredentials: true }
        );
        setCourse(res.data.course);
      } catch (err) {
        console.error(err);
        setError("Failed to load course");
      }
    };
    fetchCourse();
  }, [courseId]);

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  if (!course) {
    return <div className="p-10 text-center text-gray-500">Loading course...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {course.courseTitle}
          </h1>
          {course.subTitle && (
            <p className="text-gray-500 text-sm">
              {course.subTitle}
            </p>
          )}
        </div>

        <Link
          to={`/instructor/edit-course/${course._id}`}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Edit Course
        </Link>
      </div>

      {/* THUMBNAIL SECTION */}
      {course.courseThumbnail && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Course Thumbnail</h2>
          <img
            src={course.courseThumbnail}
            alt="Course Thumbnail"
            className="w-full h-72 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* COURSE OVERVIEW */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Course Overview</h2>

        <div className="flex flex-wrap gap-3 text-sm mb-4">
          <span className="px-3 py-1 bg-gray-100 rounded">
            Category: {course.category}
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded">
            Level: {course.courseLevel}
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded">
            Price: ₹{course.courseprice}
          </span>
          <span
            className={`px-3 py-1 rounded ${
              course.ispublished
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {course.ispublished ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {course.description || "No description provided."}
        </p>
      </div>

      {/* STATS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Course Statistics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Enrolled Students</p>
            <p className="text-2xl font-bold text-gray-800">
              {course.enrolledStudents?.length || 0}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Created On</p>
            <p className="font-semibold">
              {new Date(course.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-semibold">
              {new Date(course.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* LECTURES (FUTURE READY) */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Lectures</h2>
        <p className="text-sm text-gray-600">
          Lectures will appear here once added.
        </p>
      </div>

      {/* FOOTER */}
      <div>
        <Link
          to="/instructor/manage-course"
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to Manage Courses
        </Link>
      </div>
    </div>
  );
};

export default ViewCourse;
