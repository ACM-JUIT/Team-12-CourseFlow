const express = require("express");
const cors    = require("cors");

const app  = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ── Course Data ───────────────────────────────────────────────────────────────
const courses = [
  {
    id: "516d05dd-0e73-4a8d-96ab-755a5a1517af",
    title: "Intermediate C++ Programming Mastery",
    description:
      "This course provides a comprehensive dive into intermediate C++ concepts for learners familiar with basics. You'll explore object-oriented programming, memory management, templates, and the STL through practical examples. Hands-on exercises reinforce key techniques for efficient coding. By the end, you'll be equipped to build robust C++ applications.",
    category: "Coding",
    skillLevel: "Intermediate",
    duration: "2 Hours",
    chaptersCount: 4,
    videosIncluded: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    chapters: [
      {
        id: 1,
        title: "Object-Oriented Programming",
        description:
          "Learn encapsulation, inheritance, and polymorphism principles. Design classes with constructors and access specifiers. Implement abstract classes and interfaces for modular code. Apply OOP concepts to solve real-world problems efficiently.",
        duration: "25 minutes",
      },
      {
        id: 2,
        title: "Memory Management and Pointers",
        description:
          "Master dynamic memory allocation using new and delete. Understand pointer arithmetic and reference variables. Explore smart pointers to prevent memory leaks. Practice safe memory handling techniques through coding scenarios.",
        duration: "35 minutes",
      },
      {
        id: 3,
        title: "Templates and Generic Programming",
        description:
          "Create reusable code with function and class templates. Implement template specialization for edge cases. Understand type deduction and variadic templates. Apply generic programming to build flexible algorithms.",
        duration: "30 minutes",
      },
      {
        id: 4,
        title: "Standard Template Library (STL)",
        description:
          "Explore STL containers like vectors, maps, and sets. Use iterators and algorithms for efficient data processing. Understand functors, lambdas, and the power of the STL. Solve complex problems using built-in STL utilities.",
        duration: "30 minutes",
      },
    ],
  },
];

// ── Routes ────────────────────────────────────────────────────────────────────

// GET all courses
app.get("/api/courses", (req, res) => {
  const summary = courses.map(({ id, title, category, skillLevel, duration, chaptersCount, videosIncluded, image }) => ({
    id, title, category, skillLevel, duration, chaptersCount, videosIncluded, image,
  }));
  res.json({ success: true, data: summary });
});

// GET single course by ID
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }
  res.json({ success: true, data: course });
});

// POST enroll (start course)
app.post("/api/courses/:id/enroll", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }
  res.json({ success: true, message: `Enrolled in "${course.title}" successfully!` });
});

app.listen(PORT, () => {
  console.log(`\n✅  CourseFlow API running at http://localhost:${PORT}`);
  console.log(`   GET  /api/courses`);
  console.log(`   GET  /api/courses/:id`);
  console.log(`   POST /api/courses/:id/enroll\n`);
});
