import { v2 as cloudinary } from "cloudinary";
import Insight from "../models/insight.model.js";

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

const generateSlug = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
};

// ✅ Create Insight (Admin)
export const createInsight = async (req, res) => {
  try {
    const {
      title,
      slug,
      type,
      shortDescription,
      content,
      authorName,
      tags,
      isFeatured,
      status,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!title || !type || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, type, and content are required",
      });
    }

    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);

    const existingSlug = await Insight.findOne({ slug: finalSlug });
    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    let featuredImage = "";
    let featuredImagePublicId = "";

    if (req.file) {
      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        "ccog/insights",
      );

      featuredImage = result.secure_url;
      featuredImagePublicId = result.public_id;
    }

    const finalStatus = status || "draft";

    const insight = await Insight.create({
      title,
      slug: finalSlug,
      type,
      shortDescription,
      content,
      featuredImage,
      featuredImagePublicId,
      authorName: authorName || "Admin",
      tags: parseArrayField(tags),
      isFeatured: isFeatured === "true" || isFeatured === true,
      status: finalStatus,
      publishedAt: finalStatus === "published" ? new Date() : null,
      seoTitle,
      seoDescription,
    });

    return res.status(201).json({
      success: true,
      message: "Content created successfully",
      insight,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get all published insights (Public)
export const getAllInsights = async (req, res) => {
  try {
    const { type, featured, search } = req.query;

    const filter = { status: "published" };

    if (type) filter.type = type;
    if (featured !== undefined) {
      filter.isFeatured = featured === "true";
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const insights = await Insight.find(filter).sort({
      publishedAt: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: insights.length,
      insights,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get single published insight by slug (Public)
export const getInsightBySlug = async (req, res) => {
  try {
    const insight = await Insight.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    return res.status(200).json({
      success: true,
      insight,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Admin get all insights
export const getAllInsightsAdmin = async (req, res) => {
  try {
    const { type, status } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;

    const insights = await Insight.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: insights.length,
      insights,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Admin get insight by id
export const getInsightByIdAdmin = async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    return res.status(200).json({
      success: true,
      insight,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Update insight (Admin)
export const updateInsight = async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    if (req.file) {
      if (insight.featuredImagePublicId) {
        await cloudinary.uploader.destroy(insight.featuredImagePublicId);
      }

      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        "ccog/insights",
      );

      insight.featuredImage = result.secure_url;
      insight.featuredImagePublicId = result.public_id;
    }

    const fields = [
      "title",
      "type",
      "shortDescription",
      "content",
      "authorName",
      "seoTitle",
      "seoDescription",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        insight[field] = req.body[field];
      }
    });

    if (req.body.slug !== undefined) {
      const newSlug = generateSlug(req.body.slug || insight.title);
      const existingSlug = await Insight.findOne({
        slug: newSlug,
        _id: { $ne: insight._id },
      });

      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }

      insight.slug = newSlug;
    }

    if (req.body.tags !== undefined) {
      insight.tags = parseArrayField(req.body.tags);
    }

    if (req.body.isFeatured !== undefined) {
      insight.isFeatured =
        req.body.isFeatured === "true" || req.body.isFeatured === true;
    }

    if (req.body.status !== undefined) {
      insight.status = req.body.status;

      if (req.body.status === "published" && !insight.publishedAt) {
        insight.publishedAt = new Date();
      }

      if (req.body.status === "draft") {
        insight.publishedAt = null;
      }
    }

    await insight.save();

    return res.status(200).json({
      success: true,
      message: "Content updated successfully",
      insight,
    });
  } catch (error) {
    if (req.file?.path) {
      await removeLocalFile(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Delete insight (Admin)
export const deleteInsight = async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    if (insight.featuredImagePublicId) {
      await cloudinary.uploader.destroy(insight.featuredImagePublicId);
    }

    await insight.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
