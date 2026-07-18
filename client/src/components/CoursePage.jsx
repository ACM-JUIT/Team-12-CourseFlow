import { useEffect, useState } from "react";
import "./CoursePage.css";

const API_BASE = "http://localhost:5000/api";

export default function CoursePage({ courseId }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!courseId) {
      setError("No course selected");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/courses/${courseId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load course");
        return r.json();
      })
      .then((data) => {
        setCourse(data); // getCourseById returns the raw course object
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [courseId]);

  const handleCopy = () => {
    const url = `https://www.courseflow.tech/course/${courseId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return (
    <div className="cp-center">
      <div className="cp-spinner" />
      <p>Loading course...</p>
    </div>
  );

  if (error) return (
    <div className="cp-center cp-error">
      <span>⚠️</span>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  const courseUrl = `https://www.courseflow.tech/course/${courseId}`;
  const modules = course.modules || [];
  const videos = course.videos || [];

  return (
    <div className="cp-page">

      {/* ── Hero Card ─────────────────────────────────────────────────── */}
      <div className="cp-card cp-hero">
        <div className="cp-hero-left">
          <h1 className="cp-title">{course.topic || "(untitled course)"}</h1>
          <p className="cp-desc">{course.description}</p>

          <div className="cp-category">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            <span>{course.category}</span>
          </div>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <div className="cp-card cp-stats">
        {[
          { label: "Difficulty", value: course.difficulty || "—" },
          { label: "Duration", value: course.duration || "—" },
          { label: "No of Modules", value: modules.length },
          { label: "Videos Included?", value: videos.length > 0 ? "Yes" : "No" },
        ].map((stat, i) => (
          <div className="cp-stat-item" key={i}>
            <p className="cp-stat-label">{stat.label}</p>
            <p className="cp-stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Course URL ────────────────────────────────────────────────── */}
      <div className="cp-card">
        <p className="cp-url-label">Course URL:</p>
        <div className="cp-url-row">
          <div className="cp-url-box">
            <span>{courseUrl}</span>
          </div>
          <button
            className={`cp-copy-btn ${copied ? "cp-copied" : ""}`}
            onClick={handleCopy}
            title="Copy URL"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* ── Modules & Chapters ────────────────────────────────────────── */}
      <div className="cp-card">
        <h2 className="cp-chapters-heading">Modules</h2>
        {modules.length === 0 ? (
          <p>No modules generated yet for this course.</p>
        ) : (
          <div className="cp-chapters-list">
            {modules.map((mod, i) => (
              <div className="cp-chapter-card" key={i}>
                <div className="cp-chapter-num">{i + 1}</div>
                <div className="cp-chapter-body">
                  <h3 className="cp-chapter-title">{mod.title}</h3>
                  <ul>
                    {(mod.chapters || []).map((ch, j) => (
                      <li key={j} style={{ fontSize: "14px", color: "#475569" }}>{ch}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Videos ────────────────────────────────────────────────────── */}
     {videos.length > 0 && (
  <div className="cp-card">
    <h2 className="cp-chapters-heading">Videos</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {videos.map((v, i) => {
        const cardStyle = {
          flex: "0 0 220px",
          width: "220px",
          textDecoration: "none",
          color: "inherit",
          display: "block",
        };
        const imgWrapStyle = {
          width: "100%",
          height: "124px",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#f1f5f9",
        };
        const imgStyle = {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        };
        return (
          <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={cardStyle}>
            <div style={imgWrapStyle}>
              <img src={v.thumbnail} alt={v.title} style={imgStyle} />
            </div>
            <p style={{ fontSize: "13px", fontWeight: 600, marginTop: "8px", lineHeight: 1.3 }}>{v.title}</p>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{v.channel}</p>
          </a>
        );
      })}
    </div>
  </div>
)}

    </div>
  );
}