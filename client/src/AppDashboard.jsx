import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import DeleteCourses from "./pages/DeleteCourses";
import CreateCourse from "./pages/CreateCourse";
import CoursePage from "./components/CoursePage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

function AppDashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedCourseId={setSelectedCourseId}
          />
        );

      case "create-course":
  return (
    <CreateCourse
      setCurrentPage={setCurrentPage}
      setSelectedCourseId={setSelectedCourseId}
    />
  );

      case "delete-course":
        return (
          <DeleteCourses
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );

      case "course-page":
        return <CoursePage courseId={selectedCourseId} />;

      default:
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedCourseId={setSelectedCourseId}
          />
        );
    }
  };

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </>
  );
}

export default AppDashboard;