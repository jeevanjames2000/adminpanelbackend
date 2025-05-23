require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Routes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const favRoutes = require("./routes/favRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const awsRoutes = require("./routes/awsRoutes");
const adRoutes = require("./routes/adsRoutes");
const packages = require("./routes/packageRoute");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const path = require("path");
app.use(express.json());
// Middleware
const allowedOrigins = [
  "https://testapi.meetowner.in",
  "https://preprod.meetowner.in",
  "https://admin.meetowner.in",
  "http://localhost:3002",
  "http://localhost:3001",
  "http://localhost:3003",
  "http://localhost:5173",
];
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  exposedHeaders: ["Content-Disposition"],
};

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

// Main Routes
app.use("/auth/v1", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", Routes);
app.use("/user/v1", userRoutes);
app.use("/listings/v1", listingRoutes);
app.use("/fav/v1", favRoutes);
app.use("/enquiry/v1", enquiryRoutes);
app.use("/awsS3/v1", awsRoutes);
app.use("/adAssets/v1", adRoutes);
app.use("/packages/v1", packages);
app.use("/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
