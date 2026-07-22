import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard({
  currentPage,
  setCurrentPage,
  setSelectedCourseId,
}) {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("courseflow_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    fetch(`http://localhost:5000/api/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentPage("course-page");
  };

  return (
    <div className="layout">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="content">
        <div className="top-section">
          <div>
            <h1 className="page-title">
              Welcome, {user.name || "User"} 👋
            </h1>
            <p className="page-subtitle">
              Manage your courses and content from one place.
            </p>
          </div>

          <div className="top-actions">
            <button
              className="create-btn"
              onClick={() => setCurrentPage("create-course")}
            >
              + Create AI Course
            </button>
            <div className="notification">🔔</div>
            <div className="profile">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h3>Your Courses ({courses.length})</h3>

          {courses.length === 0 ? (
            <p>
              No courses available yet.
              Your course activity will appear here.
            </p>
          ) : (
            <div style={{ marginTop: "15px" }}>
              {courses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => handleCourseClick(course._id)}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <strong>{course.topic || "(untitled)"}</strong>
                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                      {course.category} · {course.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;