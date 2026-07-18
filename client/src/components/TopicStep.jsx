import { useState } from "react";
import { generateCourseContent } from "../api/courseApi";

export default function TopicStep({
  formData,
  setFormData,
}) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!formData.topic?.trim()) {
      setError("Enter a topic first");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const content = await generateCourseContent(formData.topic);

      setFormData({
        ...formData,
        topic: content.title,
        description: content.description,
        modules: content.modules,
        videos: content.videos,
      });
    } catch (err) {
      setError(err.message || "Failed to generate content");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>

      <input
        type="text"
        placeholder="Topic"
        value={formData.topic}
        onChange={(e) =>
          setFormData({
            ...formData,
            topic: e.target.value,
          })
        }
      />

      <button type="button" onClick={handleGenerate} disabled={generating}>
        {generating ? "Generating..." : "Generate with AI"}
      </button>
      {error && <p className="errorText">{error}</p>}

      <textarea
        rows="5"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

    </div>
  );
}