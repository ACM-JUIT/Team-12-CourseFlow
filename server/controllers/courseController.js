const Course = require("../models/Course");

// @desc  Create a new course (called after Step 1 - Category)
// @route POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const course = await Course.create({
      category,
      currentStep: 1,
      status: "draft",
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update a course at any step (Topic, Options, etc.)
// @route PATCH /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Finalize course creation (called after Step 3 - Options -> Submit)
// @route PATCH /api/courses/:id/publish
const publishCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, status: "published", currentStep: 3 } },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all courses
// @route GET /api/courses
const getCourses = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single course by id
// @route GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete a course
// @route DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  publishCourse,
  getCourses,
  getCourseById,
  deleteCourse,
};
