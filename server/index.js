const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- DYNAMIC DATA (Linked with user email) ---
let dummyCourses = [
  { id: "1", title: "React Basics for Beginners", instructor: "Kritika Grover", createdBy: "kritika@gmail.com" },
  { id: "2", title: "Node.js & Express Advanced", instructor: "Senior Developer", createdBy: "senior@gmail.com" },
  { id: "3", title: "AI Course Generation Guide", instructor: "Kritika Grover", createdBy: "kritika@gmail.com" }
];

// Home Route
app.get("/", (req, res) => {
  res.send("CourseFlow Backend Running 🚀");
});

// 1. DYNAMIC DASHBOARD ROUTE (Filters courses by logged-in user email)
app.get("/api/dashboard/courses", (req, res) => {
  const userEmail = req.query.email; // Frontend query parameter se email read karega

  if (!userEmail) {
    return res.status(400).json({ success: false, message: "User email is required" });
  }

  // Sirf usi logged-in user ke courses filter honge
  const userSpecificCourses = dummyCourses.filter(course => course.createdBy === userEmail);

  res.json({
    success: true,
    totalCourses: userSpecificCourses.length,
    courses: userSpecificCourses
  });
});

// 2. DELETE COURSE ROUTE
app.delete("/api/courses/delete/:id", (req, res) => {
  const courseId = req.params.id;
  
  // Array se us id ka course delete karne ke liye filter out kiya
  dummyCourses = dummyCourses.filter(course => course.id !== courseId);

  res.json({
    success: true,
    message: `Course ${courseId} deleted successfully`,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
