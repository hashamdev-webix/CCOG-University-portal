import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import courseRoutes from "./routes/course.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import documentRoutes from "./routes/document.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import stripeWebhookRoutes from "./routes/stripeWebhook.routes.js";
import insightRoutes from "./routes/insight.routes.js";
import contactMessageRoutes from "./routes/contactMessage.routes.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    credentials: true,
  }),
);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));
app.use(cookieParser());

// Webhook route - raw body chahiye stripe ke liye
app.use("/api/webhooks", stripeWebhookRoutes);

// Baaki routes ke liye JSON parser
app.use(express.json());

connectDB();
connectCloudinary();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/contact-messages", contactMessageRoutes);

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
