import mongoose from "mongoose";

const leactureSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,
        require: true,
    },
    videoUrl: {
        type: String
    },
    publicId: {
        type: String
    },
    isPreviewFree: {
        type: Boolean
    },
},
    { timestamps: true }
);

const Lecture = mongoose.model("Lecture" , leactureSchema);
export default Lecture;