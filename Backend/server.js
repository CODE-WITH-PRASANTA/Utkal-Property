const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./src/config/db");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/testimonials", testimonialRoutes);
app.use('/api/gallery', galleryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server Running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});