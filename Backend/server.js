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
const userRoutes = require("./src/routes/userRoutes");
const amenityRoutes = require("./src/routes/amenityRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const propertyReviewRoutes = require("./src/routes/propertyReview.routes");
const contactRoutes = require("./src/routes/contactRoutes");
const leadRoutes = require("./src/routes/leadRoutes");

// Initialize MongoDB Connection
connectDB();

const app = express();

// Allowed Origins List
const allowedOrigins = [
  "https://admin.customersupportdesk.us",
  "https://customersupportdesk.us",
  "https://backend.customersupportdesk.us",
  // Local development environments (optional)
  "http://localhost:3000",
  "http://localhost:5173"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: Origin ${origin} is not allowed`));
    }
  },
  credentials: true, // Enables cookies / authorization headers across origins
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200 // Legacy browsers support for HTTP 200 on OPTIONS
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded webp assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/property-reviews", propertyReviewRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/property-contacts", contactRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server Running Successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});