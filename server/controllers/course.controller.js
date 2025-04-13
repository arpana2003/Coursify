import { log } from "console";
import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async function (req, res, next) {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const getLecturesByCourseId = async function (req, res, next) {
  try {
    const { id } = req.params; //gets the course ID from the request parameters.

    //retrieves the course document with the specified ID.
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Invalid course id", 400));
    }
    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are required", 400));
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: {
      public_id: "Dummy",
      secure_url: "Dummy",
    },
  });

  if (!course) {
    return next(
      new AppError("Course could not be created, please try again", 500)
    );
  }

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  }

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course created successfully",
    course,
  });
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log("UPDATED DATA ", updateData);

    // Perform the update
    const course = await Course.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        runValidators: true,
        new: true,
      }
    );

    console.log(course);

    // Check if the course was found and updated
    if (!course) {
      return next(new AppError("Course with given id does not exist", 404));
    }

    // Send the updated course in the response
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course with given id does not exist", 500));
    }
    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: " Course Deleted successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!title || !description) {
      return next(new AppError("Title and description are required", 500));
    }

    if (!course) {
      return next(new AppError("Course does not exist with given id", 500));
    }

    let lectureData = {};

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          chunk_size: 50000000, //50mb
          resource_type: "video",
        });

        if (result) {
          lectureData.public_id = result.public_id;
          lectureData.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
      } catch (e) {
        //Empty the uploads diretory without deleting the uploads directory
        for (const file of await fs.readdir("uploads/")) {
          await fs.unlink(path.join("uploads/", file));
        }

        return next(new AppError(e.message, 500));
      }
    }

    course.lectures.push({
      title,
      description,
      lecture: lectureData,
    });
    course.numbersOfLectures = course.lectures.length;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture Successfully added to the course",
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const removeLectureFromCourse = (req, res, next) => {
  // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError("Course ID is required", 400));
  }

  if (!lectureId) {
    return next(new AppError("Lecture ID is required", 400));
  }

  // Find the course using the courseId
  Course.findById(courseId)
    .then((course) => {
      // If no course send custom message
      if (!course) {
        return next(new AppError("Invalid ID or Course does not exist.", 404));
      }

      // Find the index of the lecture using the lectureId
      const lectureIndex = course.lectures.findIndex(
        (lecture) => lecture._id.toString() === lectureId.toString()
      );

      // If returned index is -1 then send error
      if (lectureIndex === -1) {
        return next(new AppError("Lecture does not exist.", 404));
      }

      // Delete the lecture from Cloudinary
      return cloudinary.v2.uploader
        .destroy(course.lectures[lectureIndex].lecture.public_id, {
          resource_type: "video",
        })
        .then(() => {
          // Remove the lecture from the array
          course.lectures.splice(lectureIndex, 1);

          // Update the number of lectures based on lectures array length
          course.numberOfLectures = course.lectures.length;

          // Save the course object
          return course.save();
        });
    })
    .then(() => {
      // Return response
      res.status(200).json({
        success: true,
        message: "Course lecture removed successfully",
      });
    })
    .catch((err) => {
      // Handle any errors that occur during the process
      next(err);
    });
};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  removeLectureFromCourse,
};
