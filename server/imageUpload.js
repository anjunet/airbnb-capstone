const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer upload middleware
const upload = multer({ storage });

// API Route to handle image uploads
router.post("/upload", upload.array("images", 5), (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded." });
  }
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
  res.status(200).json({ message: "Upload successful", images: imageUrls });
});

module.exports = router;
