// src/api/courseApi.js
//
// This is a STUB for now — it returns local lesson data wrapped in a
// fake network delay, so the rest of the app already behaves like it's
// talking to a real backend (loading states work, error handling works).
//
// Once Khushi's model + Pragnya's MongoDB cluster are ready, replace the
// inside of getCourseContent() with a real fetch call, for example:
//
//   export async function getCourseContent(courseId) {
//     const res = await fetch(`/api/courses/${courseId}/content`);
//     if (!res.ok) throw new Error("Failed to load course content");
//     return res.json();
//   }
//
// Nothing else in the app needs to change — CourseContent.jsx already
// calls this function and handles loading/error states.

import lessons from "../data/lessons";

export async function getCourseContent(courseId) {
  // Simulate network delay so loading states are visible during dev
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Simulate a possible failure case (uncomment to test error UI):
  // throw new Error("Network error");

  return lessons;
}
