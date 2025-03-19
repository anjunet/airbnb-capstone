const mongoose = require("mongoose");
const Location = require("./models/locations"); // Import the Location model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/airbnb-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define locations
const seedLocations = async () => {
  try {
    const locations = [
      { name: "Cape Town" },
      { name: "Paris" },
      { name: "New York" },
      { name: "Tokyo" },
      { name: "Phuket" },
    ];

    await Location.insertMany(locations);
    console.log("✅ Locations added to the database!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding locations:", error);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedLocations();
