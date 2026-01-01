import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "Beginner",
    courseprice: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/course/${courseId}`,
          { withCredentials: true }
        );

        const course = res.data.course;

        setFormData({
          courseTitle: course.courseTitle || "",
          subTitle: course.subTitle || "",
          description: course.description || "",
          category: course.category || "",
          courseLevel: course.courseLevel || "Beginner",
          courseprice: course.courseprice ?? "",
        });

        setPreview(course.courseThumbnail || "");
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  // ✅ Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Extra safety: block negative price while typing
    if (name === "courseprice" && Number(value) < 0) return;

    setFormData({ ...formData, [name]: value });
  };

  // ✅ Thumbnail change
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.courseTitle || !formData.category) {
      alert("Course title and category are required.");
      return;
    }

    if (Number(formData.courseprice) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (thumbnail) {
        data.append("courseThumbnail", thumbnail);
      }

      await axios.put(
        `http://localhost:3000/api/v1/course/${courseId}`,
        data,
        { withCredentials: true }
      );

      alert("✅ Course updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update course");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Course Title
          </label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md px-4 py-2"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Subtitle
          </label>
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Category & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ✅ CATEGORY DROPDOWN */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-4 py-2"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Course Level
            </label>
            <select
              name="courseLevel"
              value={formData.courseLevel}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-4 py-2"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* ✅ PRICE (NEGATIVE BLOCKED) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Price (₹)
          </label>
          <input
            type="number"
            name="courseprice"
            value={formData.courseprice}
            onChange={handleChange}
            min="0"
            step="1"
            className="mt-1 w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Course Thumbnail
          </label>
          <input
            type="file"
            onChange={handleThumbnail}
            className="mt-2"
          />

          {preview && (
            <img
              src={preview}
              alt="thumbnail"
              className="mt-4 w-64 rounded-md border"
            />
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
          >
            Update Course
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditCourse;
