import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={user.photoUrl || "https://via.placeholder.com/100"}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm rounded bg-blue-100 text-blue-700">
            {user.role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Student Section */}
      {user.role === "student" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Enrolled Courses
          </h3>

          {user.enrolledCourses?.length === 0 ? (
            <p className="text-gray-500">No courses enrolled yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.enrolledCourses?.map((course) => (
                <div
                  key={course._id}
                  className="p-4 border rounded hover:shadow"
                >
                  <h4 className="font-bold">{course.courseTitle}</h4>
                  <p className="text-sm text-gray-600">{course.category}</p>
                  <p className="text-sm mt-1">
                    Level: {course.courseLevel}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instructor Section */}
      {user.role === "instructor" && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">
            Instructor Account
          </h3>
          <p className="text-gray-600 mt-2">
            You can create and manage courses from the Instructor Dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
