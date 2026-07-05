import CourseContent from "./pages/CourseContent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
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