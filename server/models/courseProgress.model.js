import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,   
    },
    videoUrl: {
        type: Boolean
    },
});

const courseProgressSchema = new mongoose.Schema({
    userId:{
        type : String,
    },
    courseId:{
        type : String,
    },
    completed:{
        type : Boolean,
    },
    lectureProgress: [lectureProgressSchema] 

}, { timestamps: true });

const CourseProgress = mongoose.model("CourseProgress" , courseProgressSchema);
export default CourseProgress;