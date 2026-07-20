const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Coding", "Health", "Creative", "Business"],
    },
    topic: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
    },
    duration: {
      type: String,
    },
    chapters: {
      type: String,
    },
    video: {
      type: String,
    },
    modules: [
      {
        title: { type: String },
        chapters: [
          {
            title: { type: String },
            content: { type: String },
          },
        ],
        videos: [
          {
            title: { type: String },
            channel: { type: String },
            videoId: { type: String },
            url: { type: String },
            thumbnail: { type: String },
          },
        ],
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);