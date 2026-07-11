import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import DeleteCourses from "./pages/DeleteCourses";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <>
      {currentPage === "dashboard" ? (
        <Dashboard
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <DeleteCourses
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default App;