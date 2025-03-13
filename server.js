import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";


import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { protect, verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./middleware/authMiddleware.js";
import { generateToken } from "./utils/generateToken.js";

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
