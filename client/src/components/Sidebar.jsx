import {
  LayoutDashboard,
  Compass,
  FileText,
  Trash2,
  LogOut,
  Layers3,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-section">
        <div className="logo-box">
          <Layers3 size={26} strokeWidth={2.5} color="white" />
        </div>

        <div>
          <h2 className="logo">CourseFlow</h2>
          <p className="logo-subtitle">AI Learning Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <ul className="nav-links">
        <li
          className={currentPage === "dashboard" ? "active" : ""}
          onClick={() => setCurrentPage("dashboard")}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </li>

        <li className={currentPage === "explore" ? "active" : ""}>
          <Compass size={20} />
          <span>Explore</span>
        </li>

        <li className={currentPage === "unpublished" ? "active" : ""}>
          <FileText size={20} />
          <span>Unpublished</span>
        </li>

        <li
          className={currentPage === "delete" ? "active" : ""}
          onClick={() => setCurrentPage("delete-course")}
        >
          <Trash2 size={20} />
          <span>Delete Courses</span>
        </li>

        <li onClick={() => alert("Logged Out Successfully")}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;