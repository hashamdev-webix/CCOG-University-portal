import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },

    // optional profile fields
    dateOfBirth: Date,
    gender: String,
    nationality: String,
    country: String,
    city: String,

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);