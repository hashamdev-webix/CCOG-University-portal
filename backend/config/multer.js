import multer from "multer";

// Use memory storage for serverless environments (Vercel)
const storage = multer.memoryStorage();

export const upload = multer({ storage });
