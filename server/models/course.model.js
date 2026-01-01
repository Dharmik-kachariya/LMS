import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  subTitle: String,
  description: String,
  category: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  courseprice: Number,
  courseThumbnail: String,
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lectures: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ispublished: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;
