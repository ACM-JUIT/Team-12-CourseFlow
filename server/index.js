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
app.get("/api/courses/:id", (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      title: "Intermediate C++ Programming Mastery",
      description:
        "This course provides a comprehensive dive into intermediate C++ concepts for learners familiar with basics. You'll explore object-oriented programming memory management, templates, and the STL through practical examples. Hands-on exercises reinforce key techniques for efficient coding. By the end, you'll be equipped to build robust C++ applications.",
      category: "Coding",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
      skillLevel: "Intermediate",
      duration: "2 Hours",
      chaptersCount: 4,
      videosIncluded: true,
      chapters: [
        {
          id: 1,
          title: "Object-Oriented Programming",
          description: "Learn encapsulation, inheritance, and polymorphism principles. Design classes with constructors specifiers.Implement abstract classes and interfaces for modular code. Apply OOF and access concepts to solve real-world problems efficiently.",
          duration: "25 mins"
        },
        {
          id: 2,
          title: "Memory Management and Pointers",
          description: "Master dynamic memory allocation using new and deleteUnderstand pointer arithmetic and reference variables. Explore smar pointers to prevent memory leaks. Practice safe memory handling techniques through coding scenarios",
          duration: "35 mins"
        },
        {
          id: 3,
          title: "Templates and Generic Programming",
          description: "Create reusable code with function and class templates. Implement template specialization for edge cases Understand type deduction and variadic templates- Apply generic programming to build flexible algorithms.",
          duration: "30 mins"
        },
        {
          id: 4,
          title: "STL and Practical Projects",
          description: "Apply all the concepts learned by building a complete C++ application. Learn debugging techniques, code optimization, and industry-standard coding practices for writing clean and maintainable programs.",
          duration: "40 mins"
        }
      ]
    }
  });
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
