import Sidebar from "../components/Sidebar";

function Dashboard({
  currentPage,
  setCurrentPage,
}) {

  const user = {
    name: "Kritika Grover",
    email: "kritikagrover83@gmail.com",
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
              Welcome, {user.name} 👋
            </h1>

            <p className="page-subtitle">
              Manage your courses and content from one place.
            </p>
          </div>

          <div className="top-actions">
            <button className="create-btn">
              + Create AI Course
            </button>

            <div className="notification">
              🔔
            </div>

            <div className="profile">
              {user.name.charAt(0)}
            </div>
          </div>

        </div>

        <div className="activity-card">
          <h3>Recent Activity</h3>

          <p>
            No activity available yet.
            Your course activity will
            appear here.
          </p>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;