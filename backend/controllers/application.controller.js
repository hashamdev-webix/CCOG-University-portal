import Application from "../models/application.model.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

const generateApplicationNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `APP-${Date.now()}-${random}`;
};


// ✅ Student creates application
export const createApplication = async (req, res) => {
  try {
    const studentId = req.user.id;
    const {
      courseId,
      personalInfo,
      academicInfo,
      additionalInfo,
    } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const existingApplication = await Application.findOne({
      studentId,
      courseId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this course",
      });
    }

    const application = await Application.create({
      studentId,
      courseId,
      applicationNumber: generateApplicationNumber(),
      status: "submitted",
      personalInfo: {
        firstName: personalInfo?.firstName || student.firstName,
        lastName: personalInfo?.lastName || student.lastName,
        email: personalInfo?.email || student.email,
        phone: personalInfo?.phone || student.phone,
        dateOfBirth: personalInfo?.dateOfBirth || student.dateOfBirth,
        gender: personalInfo?.gender || student.gender,
        nationality: personalInfo?.nationality || student.nationality,
        country: personalInfo?.country || student.country,
        city: personalInfo?.city || student.city,
        address: personalInfo?.address || "",
      },
      academicInfo: {
        highestQualification: academicInfo?.highestQualification || "",
        instituteName: academicInfo?.instituteName || "",
        passingYear: academicInfo?.passingYear || "",
        percentageOrCgpa: academicInfo?.percentageOrCgpa || "",
      },
      additionalInfo: {
        englishProficiency: additionalInfo?.englishProficiency || "",
        workExperience: additionalInfo?.workExperience || "",
        statementOfPurpose: additionalInfo?.statementOfPurpose || "",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ Student gets own applications
export const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications = await Application.find({ studentId })
      .populate("courseId", "title description mode duration fee thumbnail status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ Admin gets all applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("studentId", "firstName lastName email phone")
      .populate("courseId", "title mode duration fee")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ Admin gets single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("studentId", "firstName lastName email phone")
      .populate("courseId", "title description mode duration fee thumbnail");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ Admin updates application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, reviewNotes, rejectionReason } = req.body;

    const allowedStatuses = [
      "submitted",
      "under_review",
      "documents_pending",
      "approved",
      "rejected",
      "offer_generated",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    application.reviewNotes = reviewNotes || application.reviewNotes;
    application.rejectionReason = rejectionReason || "";
    application.reviewedBy = req.user.email || req.user.id || "admin";
    application.reviewedAt = new Date();

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};