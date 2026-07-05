import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import DeleteCourses from "./pages/DeleteCourses";
import CreateCourse from "./pages/CreateCourse";
import CoursePage from "./components/CoursePage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );

      case "create-course":
        return <CreateCourse />;

      case "delete-course":
        return (
          <DeleteCourses
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );

      case "course-page":
        return <CoursePage />;

      default:
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
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

export default App;