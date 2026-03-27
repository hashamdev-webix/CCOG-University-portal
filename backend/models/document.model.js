import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "passport",
        "photo",
        "transcript",
        "id_card",
        "certificate",
        "resume",
        "other",
      ],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      default: "",
      trim: true,
    },

    format: {
      type: String,
      default: "",
      trim: true,
    },

    size: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    verifiedBy: {
      type: String,
      default: "",
      trim: true,
    },

    verifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;