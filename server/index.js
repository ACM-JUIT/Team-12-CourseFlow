const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Existing Course Routes
app.use("/api/courses", courseRoutes);

// Temporary Dashboard Data
let dummyCourses = [
  {
    id: "1",
    title: "React Basics for Beginners",
    instructor: "Kritika Grover",
    createdBy: "kritika@gmail.com",
  },
  {
    id: "2",
    title: "Node.js & Express Advanced",
    instructor: "Senior Developer",
    createdBy: "senior@gmail.com",
  },
  {
    id: "3",
    title: "AI Course Generation Guide",
    instructor: "Kritika Grover",
    createdBy: "kritika@gmail.com",
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("CourseFlow Backend");
});

// Dashboard Route
app.get("/api/dashboard/courses", (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message: "User email is required",
    });
  }

  const userSpecificCourses = dummyCourses.filter(
    (course) => course.createdBy === userEmail
  );

  res.json({
    success: true,
    totalCourses: userSpecificCourses.length,
    courses: userSpecificCourses,
  });
});

// Delete Course Route
app.delete("/api/courses/delete/:id", (req, res) => {
  const courseId = req.params.id;

  dummyCourses = dummyCourses.filter(
    (course) => course.id !== courseId
  );

  res.json({
    success: true,
    message: `Course ${courseId} deleted successfully`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});