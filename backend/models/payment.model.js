import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "usd",
      lowercase: true,
      trim: true,
    },

    provider: {
      type: String,
      default: "stripe",
      trim: true,
    },

    stripeSessionId: {
      type: String,
      default: "",
      index: true,
    },

    stripePaymentIntentId: {
      type: String,
      default: "",
      index: true,
    },

    stripeCustomerEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled", "refunded"],
      default: "pending",
    },

    paymentMethodType: {
      type: String,
      default: "",
      trim: true,
    },

    paidAt: {
      type: Date,
    },

    receiptUrl: {
      type: String,
      default: "",
      trim: true,
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;