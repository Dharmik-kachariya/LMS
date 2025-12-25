import mongoose from "mongoose";

const lectureSchema = mongoose.Schema({
    lectureTitle : {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
    },
    publicId: {type: String},
    isPreview: {type: Boolean}
},
 {timestamps: true},
);

module.exports = mongoose.model("Lecture", lectureSchema)