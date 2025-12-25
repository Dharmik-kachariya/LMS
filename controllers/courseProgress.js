import { CourseProgress } from "../models/courseProgress.model";
import { Course } from "../models/course.model";

//get courseProgress logic
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // step-1 fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Step-2 If no progress found, return course details with an empty progress

    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // Step-3 Return the user's course progress alog with course details

    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update lectureProgress logic
export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    //  Fetch or Create Course Progress
    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      // If no progress exists, create a new record immediately
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    // Find the specific lecture in the progress array
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // Lecture ALREADY exists in array -> Update it
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // Lecture does NOT exist (-1) -> Add new entry
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }
    // Check if the whole course is completed
    // Count how many lectures are actually viewed
    const lecturesViewedCount = courseProgress.lectureProgress.filter(
      (lecture) => lecture.viewed
    ).length;

    // Fetch the course to get the total number of lectures
    const course = await Course.findById(courseId);

    // Compare View Count vs Total Count
    if (course.lectures.length === lecturesViewedCount) {
      courseProgress.completed = true;
    }

    // Save to Database
    await courseProgress.save();

    return res.status(200).json({
      message: "Lecture progress updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // Find the specific progress record
    const courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }

    // Loop through all tracked lectures and mark them as viewed
    // Note: This only marks lectures that are *already* in the progress list.
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );

    // Set the master flag to true
    courseProgress.completed = true;

    // Save updates
    await courseProgress.save();

    return res.status(200).json({ 
        message: "Course marked as completed." 
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // Find the progress record
    const courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }

    // Loop through all videos and force them to be "Unwatched"
    // We use .map to iterate, but we are modifying the object directly.
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );

    // Set the master completed flag to false
    courseProgress.completed = false;

    // Save the changes to the database
    await courseProgress.save();

    return res.status(200).json({ 
        message: "Course marked as incompleted." 
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};








// Example Frontend Call
// const handleComplete = async () => {
//   await axios.post(`http://localhost:8000/api/v1/progress/${courseId}/complete`);
//   alert("Course Completed!");
// };