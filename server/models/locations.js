import express from "express";

const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// Route to get all locations
router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);  // Send the locations as JSON to the client
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;


// const mongoose = require("mongoose");

// const LocationSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
// });

// module.exports = mongoose.model("Location", LocationSchema);
