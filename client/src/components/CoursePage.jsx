import { useEffect, useState } from "react";
import "./CoursePage.css";

const COURSE_ID = "516d05dd-0e73-4a8d-96ab-755a5a1517af";
const API_BASE  = "http://localhost:5000/api";

// ── Change this to your team's page route when it is ready ──────────────────
const START_URL = `/course/${COURSE_ID}/learn`;

export default function CoursePage() {
  const [course,  setCourse]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [copied,  setCopied]  = useState(false);

  // ── Fetch course ────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${API_BASE}/courses/${COURSE_ID}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load course");
        return r.json();
      })
      .then((json) => { setCourse(json.data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  // ── Copy URL ────────────────────────────────────────────────────────────────
  const handleCopy = () => {
    const url = `https://www.courseflow.tech/course/${COURSE_ID}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── Start → redirect to team's page ─────────────────────────────────────────
  const handleStart = () => {
    window.location.href = START_URL;
  };

  // ── States ──────────────────────────────────────────────────────────────────
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

  const courseUrl = `https://www.courseflow.tech/course/${COURSE_ID}`;

  return (
    <div className="cp-page">

      {/* ── Hero Card ─────────────────────────────────────────────────────── */}
      <div className="cp-card cp-hero">
        <div className="cp-hero-left">
          <h1 className="cp-title">{course.title}</h1>
          <p className="cp-desc">{course.description}</p>

          <div className="cp-category">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            <span>{course.category}</span>
          </div>

          <button className="cp-start-btn" onClick={handleStart}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3l14 9-14 9V3z"/>
            </svg>
            Start
          </button>
        </div>

        <div className="cp-hero-right">
          <img
            src={course.image}
            alt={course.title}
            className="cp-course-img"
            onError={(e) => { e.target.src = "https://via.placeholder.com/480x280?text=C%2B%2B"; }}
          />
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div className="cp-card cp-stats">
        {[
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            ),
            label: "Skill Level",
            value: course.skillLevel,
          },
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            ),
            label: "Duration",
            value: course.duration,
          },
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            ),
            label: "No of Chapters",
            value: course.chaptersCount,
          },
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            ),
            label: "Videos Included?",
            value: course.videosIncluded ? "Yes" : "No",
          },
        ].map((stat, i) => (
          <div className="cp-stat-item" key={i}>
            <div className="cp-stat-icon">{stat.icon}</div>
            <p className="cp-stat-label">{stat.label}</p>
            <p className="cp-stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Course URL ────────────────────────────────────────────────────── */}
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
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Chapters ──────────────────────────────────────────────────────── */}
      <div className="cp-card">
        <h2 className="cp-chapters-heading">Chapters</h2>
        <div className="cp-chapters-list">
          {course.chapters.map((ch) => (
            <div className="cp-chapter-card" key={ch.id}>
              <div className="cp-chapter-num">{ch.id}</div>
              <div className="cp-chapter-body">
                <h3 className="cp-chapter-title">{ch.title}</h3>
                <p className="cp-chapter-desc">{ch.description}</p>
                <div className="cp-chapter-duration">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{ch.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
