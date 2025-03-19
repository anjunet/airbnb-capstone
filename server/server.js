import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";  // Default import for jsonwebtoken
import bcrypt from "bcryptjs"; // Ensure you have bcryptjs installed
import accommodationRoutes from "./routes/accommodations.js";
import listingsRoutes from "./routes/listings.js";
import User from "./models/user.js"; // Import User model

dotenv.config();

const app = express();

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Get the directory path

// Middleware
app.use(express.json()); // Built-in express.json() to parse JSON data
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve images statically

// Routes
app.use("/api/accommodations", accommodationRoutes);  // Accommodation routes
app.use("/api/listings", listingsRoutes);  // Listings routes

// User signup API
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Use the User model to find the user by email

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
