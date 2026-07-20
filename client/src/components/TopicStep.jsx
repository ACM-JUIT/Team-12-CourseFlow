import { useState } from "react";
import { generateCourseContent } from "../api/courseApi";

export default function TopicStep({
  formData,
  setFormData,
}) {
  const [moduleCount, setModuleCount] = useState(5);
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
      const content = await generateCourseContent(formData.topic, moduleCount);

      setFormData({
        ...formData,
        topic: content.title,
        description: content.description,
        modules: content.modules,
      });
    } catch (err) {
      setError(err.message || "Failed to generate content");
    } finally {
      setGenerating(false);
    }
  };

  const generateBtnStyle = {
    background: generating ? "#93b4f8" : "#2563eb",
    color: "#fff",
    fontWeight: 700,
    border: "none",
    borderRadius: "10px",
    padding: "12px 24px",
    fontSize: "15px",
    cursor: generating ? "not-allowed" : "pointer",
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

      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "14px 0" }}>
        <label style={{ fontSize: "14px" }}>Number of modules:</label>
        <input
          type="number"
          min="1"
          max="12"
          value={moduleCount}
          onChange={(e) => setModuleCount(Number(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>

      <button type="button" onClick={handleGenerate} disabled={generating} style={generateBtnStyle}>
        {generating ? "Generating..." : "Generate with AI"}
      </button>
      {error && <p className="errorText" style={{ marginTop: "8px" }}>{error}</p>}

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
        style={{ marginTop: "14px" }}
      />

    </div>
  );
}