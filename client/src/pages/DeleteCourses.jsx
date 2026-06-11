import Sidebar from "../components/Sidebar";

function DeleteCourses({
  currentPage,
  setCurrentPage,
}) {
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
              Delete Courses
            </h1>

            <p className="page-subtitle">
              Manage and remove courses from your workspace.
            </p>
          </div>
        </div>

        <div className="activity-card">
          <h3>No Courses Available</h3>

          <p>
            Courses will appear here when they are
            added to the platform.
          </p>
        </div>
      </main>
    </div>
  );
}

export default DeleteCourses;