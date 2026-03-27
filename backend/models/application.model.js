import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    applicationNumber: {
      type: String,
      unique: true,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "under_review",
        "documents_pending",
        "approved",
        "rejected",
        "offer_generated",
      ],
      default: "submitted",
    },

    personalInfo: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      dateOfBirth: {
        type: Date,
      },
      gender: {
        type: String,
        trim: true,
      },
      nationality: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
        default: "",
      },
    },

    academicInfo: {
      highestQualification: {
        type: String,
        trim: true,
        default: "",
      },
      instituteName: {
        type: String,
        trim: true,
        default: "",
      },
      passingYear: {
        type: String,
        trim: true,
        default: "",
      },
      percentageOrCgpa: {
        type: String,
        trim: true,
        default: "",
      },
    },

    additionalInfo: {
      englishProficiency: {
        type: String,
        trim: true,
        default: "",
      },
      workExperience: {
        type: String,
        trim: true,
        default: "",
      },
      statementOfPurpose: {
        type: String,
        trim: true,
        default: "",
      },
    },

    reviewNotes: {
      type: String,
      default: "",
      trim: true,
    },

    rejectionReason: {
      type: String,
      default: "",
      trim: true,
    },

    reviewedBy: {
      type: String,
      default: "",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;