import Course from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";

// Helper to upload buffer to Cloudinary
const uploadBufferToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    uploadStream.end(buffer);
  });
};

// helper: convert incoming value to boolean
const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return false;
};

// helper: safely parse arrays from form-data or json
const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  // if sent as JSON string from frontend/form-data
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch {
      return [value];
    }
  }

  return [];
};

// ✅ Create Course (Admin)
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      category,
      mode,
      level,
      duration,
      fee,
      isFree,
      seats,
      certification,
      eligibility,
      learningPoints,
      practicalLearning,
      outcomes,
      careerOpportunities,
      furtherLearning,
      status,
    } = req.body;

    if (!title || !description || !category || !mode || !duration || !seats) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, category, mode, duration, and seats are required",
      });
    }

    const parsedIsFree = parseBoolean(isFree);
    const parsedFee = parsedIsFree ? 0 : Number(fee);

    if (
      !parsedIsFree &&
      (fee === undefined ||
        fee === null ||
        fee === "" ||
        Number.isNaN(parsedFee))
    ) {
      return res.status(400).json({
        success: false,
        message: "Fee is required for paid courses",
      });
    }

    let thumbnail = "";
    let thumbnailPublicId = "";

    if (req.file) {
      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        "ccog/courses",
      );

      thumbnail = result.secure_url;
      thumbnailPublicId = result.public_id;
    }

    const course = await Course.create({
      title,
      shortDescription,
      description,
      category,
      mode,
      level,
      duration,
      isFree: parsedIsFree,
      fee: parsedFee,
      seats: Number(seats),
      certification,
      eligibility: parseArrayField(eligibility),
      learningPoints: parseArrayField(learningPoints),
      practicalLearning: parseArrayField(practicalLearning),
      outcomes: parseArrayField(outcomes),
      careerOpportunities: parseArrayField(careerOpportunities),
      furtherLearning: parseArrayField(furtherLearning),
      status,
      thumbnail,
      thumbnailPublicId,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get All Courses (Public)
export const getAllCourses = async (req, res) => {
  try {
    const { category, mode, level, isFree } = req.query;

    const filter = { status: "active" };

    if (category) filter.category = category;
    if (mode) filter.mode = mode;
    if (level) filter.level = level;
    if (isFree !== undefined) filter.isFree = parseBoolean(isFree);

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get Single Course
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Update Course (Admin)
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // update image if new file uploaded
    if (req.file) {
      if (course.thumbnailPublicId) {
        await cloudinary.uploader.destroy(course.thumbnailPublicId);
      }

      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        "ccog/courses",
      );

      course.thumbnail = result.secure_url;
      course.thumbnailPublicId = result.public_id;
    }

    // normal fields
    const simpleFields = [
      "title",
      "shortDescription",
      "description",
      "category",
      "mode",
      "level",
      "duration",
      "certification",
      "status",
    ];

    simpleFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        course[field] = req.body[field];
      }
    });

    if (req.body.seats !== undefined) {
      course.seats = Number(req.body.seats);
    }

    // arrays
    if (req.body.eligibility !== undefined) {
      course.eligibility = parseArrayField(req.body.eligibility);
    }

    if (req.body.learningPoints !== undefined) {
      course.learningPoints = parseArrayField(req.body.learningPoints);
    }

    if (req.body.practicalLearning !== undefined) {
      course.practicalLearning = parseArrayField(req.body.practicalLearning);
    }

    if (req.body.outcomes !== undefined) {
      course.outcomes = parseArrayField(req.body.outcomes);
    }

    if (req.body.careerOpportunities !== undefined) {
      course.careerOpportunities = parseArrayField(
        req.body.careerOpportunities,
      );
    }

    if (req.body.furtherLearning !== undefined) {
      course.furtherLearning = parseArrayField(req.body.furtherLearning);
    }

    // free / paid logic
    if (req.body.isFree !== undefined) {
      course.isFree = parseBoolean(req.body.isFree);
    }

    if (course.isFree) {
      course.fee = 0;
    } else {
      if (req.body.fee !== undefined) {
        const parsedFee = Number(req.body.fee);

        if (Number.isNaN(parsedFee)) {
          return res.status(400).json({
            success: false,
            message: "Fee must be a valid number",
          });
        }

        course.fee = parsedFee;
      }

      if (
        course.fee === undefined ||
        course.fee === null ||
        Number.isNaN(Number(course.fee))
      ) {
        return res.status(400).json({
          success: false,
          message: "Fee is required for paid courses",
        });
      }
    }

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Delete Course (Admin)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.thumbnailPublicId) {
      await cloudinary.uploader.destroy(course.thumbnailPublicId);
    }

    await course.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
