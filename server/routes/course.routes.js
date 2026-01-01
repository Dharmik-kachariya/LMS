import express from "express";
import {
  createCourse,
  searchCourse,
  getPublishedCourse,
  getCreatorCourses,
  editCourse,
  getCourseById,
  deleteCourse,
  createLecture,
  getCourseLecture,
  editLecture,
  removeLeacture,
  getLectureById,
  tooglepublishCourse,
} from "../controllers/course.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
import upload from "../utils/multer.js";
import { getInstructorCourses } from "../controllers/course.controller.js";

//course rouetr

// get instructor course
router.get("/instructor", isAuthenticated, getInstructorCourses);
//createCourse
router.post("/", isAuthenticated, createCourse);

//searchCourse
router.get("/search", isAuthenticated, searchCourse);

//getPublishedCourse
router.get("/published-courses", getPublishedCourse);

//getCreatorCourses
router.get("/", isAuthenticated, getCreatorCourses);

//editCourse
router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);

//delete course
router.delete("/:courseId", isAuthenticated, deleteCourse);

//getCourseById
router.get("/:courseId", isAuthenticated, getCourseById);

//lecture routers
//createLecture
router.post("/:courseId/lecture", isAuthenticated, createLecture);

//getCourseLecture
router.get("/:courseId/lecture", isAuthenticated, getCourseLecture);

//editLecture
router.post("/:courseId/lecture/:lectureId", isAuthenticated, editLecture);

//removeLeacture
router.delete("/lecture/:lectureId", isAuthenticated, removeLeacture);

//getLectureById
router.get("/lecture/:lectureId", isAuthenticated, getLectureById);

//tooglepublishCourse
router.patch("/:courseId", isAuthenticated, tooglepublishCourse);

export default router;

//aek disply leacterwatch routes bnavo padshe
