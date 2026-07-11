const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Course || mongoose.model("Course", courseSchema);