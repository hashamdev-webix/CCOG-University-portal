import mongoose from "mongoose";

const insightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: ["news", "article", "publication"],
      required: true,
    },

    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    featuredImage: {
      type: String,
      default: "",
      trim: true,
    },

    featuredImagePublicId: {
      type: String,
      default: "",
      trim: true,
    },

    authorName: {
      type: String,
      default: "Admin",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    seoTitle: {
      type: String,
      default: "",
      trim: true,
    },

    seoDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Insight = mongoose.model("Insight", insightSchema);

export default Insight;