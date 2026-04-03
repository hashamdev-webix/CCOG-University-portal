import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["business", "technology", "short"],
      required: true,
    },

    mode: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    isFree: {
      type: Boolean,
      default: false,
    },

    fee: {
      type: Number,
      min: 0,
      default: 0,
      validate: {
        validator: function (value) {
          if (this.isFree) return value === 0 || value === undefined;
          return value >= 0;
        },
        message: "Paid courses must have a valid fee, and free courses should have fee 0.",
      },
    },

    certification: {
      type: String,
      default: "",
      trim: true,
    },

    eligibility: {
      type: [String],
      default: [],
    },

    learningPoints: {
      type: [String],
      default: [],
    },

    practicalLearning: {
      type: [String],
      default: [],
    },

    outcomes: {
      type: [String],
      default: [],
    },

    careerOpportunities: {
      type: [String],
      default: [],
    },

    furtherLearning: {
      type: [String],
      default: [],
    },

    thumbnail: {
      type: String,
      default: "",
    },

    thumbnailPublicId: {
      type: String,
      default: "",
    },

    seats: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;