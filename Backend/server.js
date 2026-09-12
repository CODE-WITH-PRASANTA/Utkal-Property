const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./src/config/db");

// =====================================================
// ROUTE IMPORTS
// =====================================================

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
const sellPropertyRoutes = require("./src/routes/sellPropertyRoutes");

// =====================================================
// DATABASE
// =====================================================

connectDB();

// =====================================================
// APP
// =====================================================

const app = express();

// =====================================================
// ALLOWED ORIGINS
// =====================================================

const allowedOrigins = [
  // Production
  "https://admin.customersupportdesk.us",
  "https://customersupportdesk.us",
  "https://backend.customersupportdesk.us",

  // Localhost
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",

  // 127.0.0.1
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

// =====================================================
// CORS OPTIONS
// =====================================================

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without Origin
    // Example: Postman, server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(
      "CORS Error: Origin not allowed:",
      origin
    );

    return callback(
      new Error(
        `CORS Error: Origin ${origin} is not allowed`
      )
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],

  optionsSuccessStatus: 200,
};

// =====================================================
// CORS MIDDLEWARE
// =====================================================

app.use(cors(corsOptions));

// =====================================================
// BODY PARSERS
// =====================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// =====================================================
// STATIC UPLOADS
// =====================================================
//
// IMPORTANT:
// Files inside:
//    /uploads/gallery
//    /uploads/team
//    /uploads/blogs
//    /uploads/property
//    /uploads/categories
//    /uploads/locations
//    /uploads/users
//    /uploads/amenities
//    /uploads/sell-properties
//
// will be accessible through:
//
// http://localhost:5000/uploads/...
//
// =====================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads"),
    {
      fallthrough: false,
      maxAge: "1d",
    }
  )
);

// =====================================================
// API ROUTES
// =====================================================

app.use(
  "/api/testimonials",
  testimonialRoutes
);

app.use(
  "/api/gallery",
  galleryRoutes
);

app.use(
  "/api/team",
  teamRoutes
);

app.use(
  "/api/properties",
  propertyRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/locations",
  locationRoutes
);

app.use(
  "/api/property-reviews",
  propertyReviewRoutes
);

app.use(
  "/api/amenities",
  amenityRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/blogs",
  blogRoutes
);

app.use(
  "/api/leads",
  leadRoutes
);

app.use(
  "/api/property-contacts",
  contactRoutes
);

app.use(
  "/api/sell-properties",
  sellPropertyRoutes
);

// =====================================================
// ROOT / HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server Running Successfully",
  });
});

// =====================================================
// UPLOAD HEALTH CHECK
// =====================================================

app.get("/uploads", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Uploads folder is available",
  });
});

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error(
    "======================================"
  );

  console.error(
    "GLOBAL ERROR:",
    err
  );

  console.error(
    "======================================"
  );

  // CORS Error
  if (
    err.message &&
    err.message.startsWith("CORS Error")
  ) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  // Multer file size error
  if (
    err.code === "LIMIT_FILE_SIZE"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "File size is too large. Maximum allowed size is 5MB.",
    });
  }

  // Multer unexpected file
  if (
    err.code === "LIMIT_UNEXPECTED_FILE"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Unexpected upload field.",
    });
  }

  return res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    "======================================"
  );

  console.log(
    `Server running on port ${PORT}`
  );

  console.log(
    `Local API: http://localhost:${PORT}`
  );

  console.log(
    `Uploads: http://localhost:${PORT}/uploads`
  );

  console.log(
    `Gallery API: http://localhost:${PORT}/api/gallery`
  );

  console.log(
    "======================================"
  );
});