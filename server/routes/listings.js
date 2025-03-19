const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");

// ✅ Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get all listings (with optional location filter)
router.get("/", async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};

    if (location && location !== "All locations") {
      query.location = location;
    }

    const listings = await Listing.find(query);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ Get a single listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Create a new listing
router.post("/", async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ message: "Error creating listing", error });
  }
});

// ✅ Update a listing
router.put("/:id", async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delete a listing
router.delete("/:id", async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) return res.status(404).json({ message: "Listing not found" });
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
