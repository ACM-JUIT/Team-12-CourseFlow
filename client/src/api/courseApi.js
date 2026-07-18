const BASE_URL = "http://localhost:5000/api/courses";

// Step 1: Create the draft course
export async function createCourse(category) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create course");
  }

  return res.json();
}

// Step 2: Update the course
export async function updateCourse(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update course");
  }

  return res.json();
}

// Step 3: Publish the course
export async function publishCourse(id, data) {
  const res = await fetch(`${BASE_URL}/${id}/publish`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to publish course");
  }

  return res.json();
}

// AI-assisted content generation: fetch real sources + structure into a course draft
export async function generateCourseContent(topic) {
  const res = await fetch(`${BASE_URL}/generate-content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || "Failed to generate course content");
  }

  return res.json();
}