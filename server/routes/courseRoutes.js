const express = require("express");
const {
  createCourse,
  updateCourse,
  publishCourse,
  getCourses,
  getCourseById,
  deleteCourse,
} = require("../controllers/courseController");
const { generateContent } = require("../controllers/courseGenerator.controller");

const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.patch("/:id", updateCourse);
router.patch("/:id/publish", publishCourse);
router.delete("/:id", deleteCourse);
router.post("/generate-content", generateContent);

module.exports = router;