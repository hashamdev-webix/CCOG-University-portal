import stripe from "../config/stripe.js";
import Payment from "../models/payment.model.js";
import Application from "../models/application.model.js";
import Course from "../models/course.model.js";


// Student creates checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "Application ID is required",
      });
    }

    const application = await Application.findById(applicationId)
      .populate("courseId");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.studentId.toString() !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to pay for this application",
      });
    }

    const course = await Course.findById(application.courseId._id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // optional: prevent duplicate paid payment
    const alreadyPaid = await Payment.findOne({
      applicationId,
      paymentStatus: "paid",
    });

    if (alreadyPaid) {
      return res.status(400).json({
        success: false,
        message: "Payment already completed for this application",
      });
    }

    const amount = Number(course.fee);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid course fee",
      });
    }

    const payment = await Payment.create({
      studentId,
      applicationId: application._id,
      courseId: course._id,
      amount,
      currency: "usd",
      provider: "stripe",
      paymentStatus: "pending",
      metadata: {
        applicationNumber: application.applicationNumber,
        courseTitle: course.title,
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: application.personalInfo?.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description || "Course payment",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        paymentId: payment._id.toString(),
        applicationId: application._id.toString(),
        studentId: studentId.toString(),
        courseId: course._id.toString(),
      },
    });

    payment.stripeSessionId = session.id;
    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Checkout session created successfully",
      url: session.url,
      sessionId: session.id,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Student can view own payments
export const getMyPayments = async (req, res) => {
  try {
    const studentId = req.user.id;

    const payments = await Payment.find({ studentId })
      .populate("courseId", "title fee mode duration")
      .populate("applicationId", "applicationNumber status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Admin gets all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("studentId", "firstName lastName email")
      .populate("courseId", "title fee")
      .populate("applicationId", "applicationNumber status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};