const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads.js"); // Import the multer middleware

// Example POST route for creating a listing with image upload
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    // Assuming other listing data is sent as JSON in the request body
    const { title, location, description, price } = req.body;

    // Handle the uploaded images (req.files will contain the uploaded files)
    const uploadedImages = req.files.map((file) => file.filename);

    // Save the listing data and image filenames into your database
    // (use your database ORM, like Mongoose, to save the listing)

    // Example: Assuming you have a Listing model
    const newListing = new Listing({
      title,
      location,
      description,
      price,
      images: uploadedImages, // Store image filenames
    });

    await newListing.save();

    res.status(201).json({ message: "Listing created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating listing" });
  }
});

module.exports = router;
