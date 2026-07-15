import React, { useState, useEffect } from "react";
import "./CourseContent.css";
import CodeSnippet from "../components/CodeSnippet";
import { getCourseContent } from "../api/courseContentApi";


function ClockIcon() {
  return (
    <svg
      className="clock-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CourseContent() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tracks which lesson _ids the learner has marked as complete.
  // Persisted in localStorage so progress survives a page refresh.
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("courseflow_completed_lessons");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch course content (currently from local data via the API stub —
  // swap the inside of getCourseContent() for a real fetch() later, this
  // component doesn't need to change at all).
  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourseContent("course-id-placeholder");
        if (isMounted) {
          setLessons(data);
          setSelectedLesson(data[0]);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Something went wrong.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadContent();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("courseflow_completed_lessons", JSON.stringify(completedIds));
  }, [completedIds]);

  function toggleComplete(lessonId) {
    setCompletedIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="course-page">
        <div className="state-screen">
          <div className="spinner"></div>
          <p>Loading course content...</p>
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className="course-page">
        <div className="state-screen error">
          <p>Couldn't load this course. {error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const completedCount = completedIds.length;
  const totalCount = lessons.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const isCurrentLessonComplete = selectedLesson && completedIds.includes(selectedLesson._id);

  return (
    <div className="course-page">

      {/* ── Sidebar ── */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2><big>Intermediate C++ Programming Mastery</big></h2>
          <p className="sidebar-course-label">Course Content</p>
        </div>

        {/* Progress bar */}
        <div className="progress-section">
          <div className="progress-label">
            <span>Your progress</span>
            <span className="count">{completedCount}/{totalCount} done</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="sidebar-lessons">
          {lessons.map((lesson) => {
            const isComplete = completedIds.includes(lesson._id);
            return (
              <div
                key={lesson._id}
                className={`lesson-card ${selectedLesson._id === lesson._id ? "active" : ""}`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className={`lesson-number ${isComplete ? "completed" : ""}`}>
                  {isComplete ? <CheckIcon /> : lesson._id}
                </div>
                <div className="lesson-info">
                  <h4>{lesson.title}</h4>
                  <span className="lesson-duration">
                    <ClockIcon />
                    {lesson.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="main-content">

        <div className="lesson-header-row">
          <h1>{selectedLesson.title}</h1>
          <button
            className={`mark-complete-btn ${isCurrentLessonComplete ? "completed" : ""}`}
            onClick={() => toggleComplete(selectedLesson._id)}
          >
            {isCurrentLessonComplete ? <CheckIcon /> : null}
            {isCurrentLessonComplete ? "Completed" : "Mark as complete"}
          </button>
        </div>

        <p className="lesson-description">{selectedLesson.description}</p>

        {/* Video */}
        <div className="video-wrapper">
          <iframe
            key={selectedLesson.videoId}
            src={`https://www.youtube.com/embed/${selectedLesson.videoId}`}
            title={selectedLesson.title}
            allowFullScreen
          />
        </div>

        {/* Topics */}
        {selectedLesson.topics.map((topic) => (
          <div key={topic._id} className="topic-card">
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <CodeSnippet code={topic.code} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default CourseContent;
