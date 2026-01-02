import React from "react";

const PopularCourses = () => {
  const courses = ["MERN Stack", "React Mastery", "Node.js API"];

  return (
    <section className="py-16 px-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Popular Courses
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((course) => (
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
  );
};

export default PopularCourses;
