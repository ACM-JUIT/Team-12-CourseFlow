const BASE_URL = "http://localhost:5000/api/courses";

// Step 1: create the draft course, returns the saved course (with _id)
export async function createCourse(category) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create course");
  }
  return res.json();
}

// Step 2 (and any mid-wizard save): update fields on the existing course
export async function updateCourse(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update course");
  }
  return res.json();
}

// Step 3: final submit, marks the course as published
export async function publishCourse(id, data) {
  const res = await fetch(`${BASE_URL}/${id}/publish`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to publish course");
  }
  return res.json();
}