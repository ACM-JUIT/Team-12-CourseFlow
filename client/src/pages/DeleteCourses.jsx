import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function DeleteCourses({
  currentPage,
  setCurrentPage,
}) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // 1. LocalStorage se user check karke sirf uske courses load karna
    const storedUser = localStorage.getItem("courseflow_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      if (parsedUser.email) {
        fetch(`http://localhost:5000/api/dashboard/courses?email=${parsedUser.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setCourses(data.courses);
            }
          })
          .catch((err) => console.error("Error fetching courses for deletion:", err));
      }
    }
  }, []);

  // 2. Delete Course handler
  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/delete/${courseId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        if (data.success) {
          alert("Course Deleted Successfully!");
          // UI se turant course delete karne ke liye state refresh kiya
          setCourses(courses.filter(course => course.id !== courseId));
        } else {
          alert("Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
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
            <h1 className="page-title">Delete Courses</h1>
            <p className="page-subtitle">
              Manage and remove courses from your workspace.
            </p>
          </div>
        </div>

        {/* Dynamic Display with Delete Option */}
        <div className="activity-card">
          <h3>Available Courses ({courses.length})</h3>

          {courses.length === 0 ? (
            <p>
              Courses will appear here when they are
              added to the platform.
            </p>
          ) : (
            <div style={{ marginTop: "15px" }}>
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  style={{ 
                    padding: "12px", 
                    borderBottom: "1px solid #eee", 
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <strong style={{ display: "block" }}>{course.title}</strong>
                    <span style={{ fontSize: "13px", color: "#666" }}>
                      Instructor: {course.instructor}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(course.id)}
                    style={{ 
                      backgroundColor: "#ff4d4d", 
                      color: "white", 
                      border: "none", 
                      padding: "6px 12px", 
                      borderRadius: "4px", 
                      cursor: "pointer" 
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DeleteCourses;