const mongoose = require("mongoose");

const lectureProgressSchema = new mongoose.Schema({
  lectureId: { type: String },
  viewed: { type: Boolean },
});

const courseProgressSchema = new mongoose.Schema({
  serId: { type: String },
  courseId: { type: String },
  completed: { type: Boolean },
  lectureProgress: [lectureProgressSchema],
});

module.exports = mongoose.model("courseProgress", courseProgressSchema);