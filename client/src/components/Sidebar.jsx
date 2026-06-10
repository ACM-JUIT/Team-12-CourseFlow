import {
  LayoutDashboard,
  Compass,
  FileText,
  Trash2,
  LogOut,
} from "lucide-react";

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-box">CF</div>

        <div>
          <h2 className="logo">CourseFlow</h2>
          <p className="logo-subtitle">
            AI Learning Platform
          </p>
        </div>
      </div>

      <ul className="nav-links">
        <li
          className={
            currentPage === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            setCurrentPage("dashboard")
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </li>

        <li>
          <Compass size={20} />
          <span>Explore</span>
        </li>

        <li>
          <FileText size={20} />
          <span>Unpublished</span>
        </li>

        <li
          className={
            currentPage === "delete"
              ? "active"
              : ""
          }
          onClick={() =>
            setCurrentPage("delete")
          }
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