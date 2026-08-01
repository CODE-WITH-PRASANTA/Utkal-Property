const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./src/config/db");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const teamRoutes = require("./src/routes/teamRoutes");
const propertyRoutes = require("./src/routes/propertyRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const locationRoutes = require("./src/routes/locationRoutes");
const userRoutes = require(
  "./src/routes/userRoutes"
);



const blogRoutes = require("./src/routes/blogRoutes");

// Initialize MongoDB Connection
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded webp assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/testimonials", testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/locations", locationRoutes);
app.use(
  "/api/users",
  userRoutes
);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server Running Successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
