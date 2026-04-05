const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth/auth-routes");
const designationsRoutes = require("./routes/admin/designation-routes");
const aboutRoutes = require("./routes/admin/about-routes");
const awardRoutes = require("./routes/admin/award-routes");
const fundingRoutes = require("./routes/admin/funding-routes");
const researchRoutes = require("./routes/admin/research-routes");
const publicationRoutes = require("./routes/admin/publication-routes");
const contactRoutes = require("./routes/admin/contact-routes");
const sociallinksRoutes = require("./routes/admin/sociallinks-routes");
const consultancyRoutes = require("./routes/admin/consultancy-routes");
const mentorshipRoutes = require("./routes/admin/mentorship-routes");
const visitorRoutes = require("./routes/admin/visitor-router");
const newsEventRoutes = require("./routes/admin/news-event-routes");
const membershipRoutes = require("./routes/admin/membership-routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
  "https://www.mahbubulalam.me",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// Routes
app.use(express.json());
app.use("/api/alive", async (req, res) => {
  res.json({ message: "Server is alive!" });
});
app.use("/api/auth", authRoutes);
app.use("/api/designation", designationsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/award", awardRoutes);
app.use("/api/funding", fundingRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sociallinks", sociallinksRoutes);
app.use("/api/consultancy", consultancyRoutes);
app.use("/api/mentorship", mentorshipRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/news-event", newsEventRoutes);
app.use("/api/membership", membershipRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
