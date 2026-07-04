import lessons from "../data/lessons";

export async function getCourseContent(courseId) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return lessons;
}
