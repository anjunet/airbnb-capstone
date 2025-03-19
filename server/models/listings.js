// server/models/listing.js
import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  guests: { type: Number, required: true },
  type: { type: String, required: true },
  amenities: { type: [String], required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
