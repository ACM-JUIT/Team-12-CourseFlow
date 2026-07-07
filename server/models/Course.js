const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    // Step 1: Category
    category: {
      type: String,
      required: true,
      enum: ["Coding", "Health", "Creative", "Business"],
    },

    // Step 2: Topic
    topic: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    // Step 3: Options
    difficulty: {
      type: String,
    },
    duration: {
      type: String, // e.g. "4 weeks", "10 hours"
    },
    chapters: {
      type: String, // change to Number if OptionsStep uses a number input
    },
    video: {
      type: String, // URL or file path
    },

    // Bookkeeping
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // will link up once auth teammate's User model exists
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    currentStep: {
      type: Number, // 1, 2, or 3 - lets the frontend resume an in-progress wizard
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);