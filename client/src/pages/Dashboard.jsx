import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard({
  currentPage,
  setCurrentPage,
}) {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // 1. LocalStorage se user info load karna
    const storedUser = localStorage.getItem("courseflow_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // 2. Sirf logged-in user ke specific courses backend se mangwana
      if (parsedUser.email) {
        fetch(`http://localhost:5000/api/dashboard/courses?email=${parsedUser.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setCourses(data.courses);
            }
          })
          .catch((err) => console.error("Error fetching dashboard data:", err));
      }
    }
  }, []);

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

        {/* Dynamic Courses Display */}
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
                  key={course.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <strong>{course.title}</strong>
                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                      Instructor: {course.instructor}
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