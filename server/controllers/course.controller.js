import { json } from "express";
import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";


//create course
export const createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      courseprice,
    } = req.body;

    // Basic validation
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course title and category are required",
      });
    }

    // Logged-in instructor id (from isAuthenticated middleware)
    const creatorId = req.user._id;

    // Create course
    const course = await Course.create({
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      courseprice,
      creator: creatorId,
      lectures: [],
      enrolledStudents: [],
      ispublished: false,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create Course Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

//get instructor course
export const getInstructorCourses = async (req, res) => {
  try {
    // Passport session user
    const userId = req.user._id;

    const courses = await Course.find({ creator: userId });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch instructor courses",
    });
  }
};


//search course
export const searchCourse = async (req,res) => {
    try {
        const {query = "", category = [], sortByPrice = ""} = req.query;
        console.log(category);

        //create serach query
        const serachCriteria = {
            isPublished:true,
            $or:[
                {courseTitle: {$regex:query , $options:"i"}},
                {subTitle: {$regex:query , $options:"i"}},
                {category: {$regex:query , $options:"i"}}
            ]
        }

        //if categories selected
        if (categories.length > 0) {
            serachCriteria.category = {$in : categories};
        }

        //define sorting oredr
        const sortOptions = {};
        if (sortByPrice === "low") {
            sortOptions.coursePrice = -1;
        } else if(sortByPrice == "high") {
            sortOptions.coursePrice = -1;
        }

        let course = await Course.find(serachCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOptions);

        return res.status(200).json({
            success:true,
            courses: courses || []
        });

    } catch (error) {
        console.log(error);
    }
}


//get published course
export const getPublishedCourse = async (_,res) => {
    try {
        const course =await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"});
        if (!course) {
            return res.status(404).json({
                message:"Course not found"
            })
        }
        return res.status(200).json({
            course,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed toget a published courses"
        })
    }
}

//get creator coureses
export const getCreatorCourses = async (req , res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId});
        if(!courses){
            return res.status(404).json({
                courses:[],
                message:"Course not found"  
            })
        };
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500),json({
            message : "Failed to create course"
        })
    }
}

// export const editCourse = async (req,res) => {
//     try {
//         const courseId = req.params.courseId;
//         const {courseTitle,subTitle, description , category , courseLevel , courseprice}= req.body;
//         const thumbnail =req.file;

//         let course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({
//                 message: "Course not found!"
//             })
//         }
//         let courseThumbnail;
//         if (thumbnail) {
//             if (course.courseThumbnail) {
//                 const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
//                 await deleteMediaFromCloudinary(publicId);  // delete old image
//             }
//         // upload a thumbnail on clourdinary
//             courseThumbnail = await uploadMedia(thumbnail.path);
//         }

//         const updateData = {courseTitle,subTitle,description,category,courseLevel,courseprice, courseThumbnail:courseThumbnail?.secure_url};

//         course = await Course.findByIdAndUpdate(courseId , updateData , {new:true});

//         return res.status(200).json({
//             course,
//             message:"Course update successfully."
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message : "Failed to create course"
//         })
//     }
// }
export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, courseprice } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId); // ✅ FIX
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    let courseThumbnail = course.courseThumbnail;

    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      const uploadResult = await uploadMedia(thumbnail.path);
      courseThumbnail = uploadResult.secure_url;
    }

    course = await Course.findByIdAndUpdate(
      courseId,
      {
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        courseprice,
        courseThumbnail,
      },
      { new: true }
    );

    return res.status(200).json({
      course,
      message: "Course updated successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};

//get course by CourseID
export const getCourseById  = async (req,res) => {
    try {
        const {courseId} = req.params;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            })
        }
        return res.status(200).json({
            course
            
        })
        console.log("courseId:", courseId);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Failed to get course by id"
        })
    }
}

// delete course 
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id; // from auth middleware

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // ✅ Security: only creator can delete
    if (course.creator.toString() !== instructorId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this course",
      });
    }

    // ✅ Delete thumbnail from Cloudinary (optional)
    if (course.courseThumbnail) {
      const publicId = course.courseThumbnail
        .split("/")
        .pop()
        .split(".")[0];

      await deleteMediaFromCloudinary(publicId);
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({
      message: "Failed to delete course",
    });
  }
};


//lecture
export const createLecture = async (req, res)=> {
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;  

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message : "Lecture title is required"
            })
        };

        //create leacture
        const lecture = await Lecture.create({lectureTitle});

        const course = await Course.findById(courseId);
        if(course){
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(201).json({
            lecture,
            message : "Lecture created successfully."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create lecture"
        })
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate("lectures");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            lectures: course.lectures, // ✅ correct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get lectures",
        });
    }
};


export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;
        const { courseId, lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found!",
            });
        }

        // ✅ Update lecture fields safely
        if (lectureTitle) lecture.lectureTitle = lectureTitle;

        if (videoInfo?.videoUrl) {
            lecture.videoInfo.videoUrl = videoInfo.videoUrl;
        }

        if (videoInfo?.publicId) {
            lecture.videoInfo.publicId = videoInfo.publicId;
        }

        if (typeof isPreviewFree === "boolean") {
            lecture.isPreviewFree = isPreviewFree;
        }

        await lecture.save();

        // ✅ Ensure lecture exists in course
        const course = await Course.findById(courseId);
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({
            success: true,
            lecture,
            message: "Lecture updated successfully.",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to edit lecture",
        });
    }
};


export const removeLeacture = async (req,res) => {
    try {
        const {lectureId} =req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message : "Lecture not found!"
            });
        }

        // delete the lecture from couldinary as well
        if (lecture.publicId) {
            await deleteMediaFromCloudinary(lecture.publicId);
        }

        // Remove the lecture reference from the associated course
        await Course.updateOne(
            {lecture:lectureId}, // find the course that contains the lecture
            {$pull: {lectures: lectureId}}  // Remove the lectures id from the lectures array
        );

        return res.status(200).json({
            message : "Lecture removed successfully."
        })

    } catch (error) {
     console.log(error);
     return res.status(500).json({
        message : "Failed to remove lecture"
     })   
    }
}

export const getLectureById  = async (req , res) => {
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found!"
            });
        }
        return res.status(200).json({
            lecture
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get lecture by id"
        })
    }
}


// publich unpublish course logic
export const tooglepublishCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const {publish} = req.body;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            });
        }
        // publish status based on the query paramter
        courses.isPublished = publish == "true" ;
        await course.save();

        const statusMessage = course.isPublished ? "Course published successfully." : "Course unpublished successfully.";
        return res.status(200).json({
            course,
            message:`Course is ${statusMessage}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to publish/unpublish status"
        })
    }
}