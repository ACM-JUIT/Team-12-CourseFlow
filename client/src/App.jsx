import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      
      {/* HERO */}
      <h1 style={{
        fontSize: "48px",
        background: "linear-gradient(to right, #60a5fa, #a78bfa)",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>
        CourseFlow 🚀
      </h1>

      <p style={{ maxWidth: "600px", margin: "20px auto" }}>
        Learn smarter, grow faster, and track your progress like never before.
      </p>

      <button style={btn}>
        Get Started 
      </button>

      {/* FEATURES */}
      <div style={{ marginTop: "80px" }}>
        <h2> Features</h2>

        <div style={grid}>
          {features.map((item, i) => (
            <div
              key={i}
              className="glass"
              style={card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const features = [
  "Smart Learning",
  "Progress Tracking",
  "Goal Setting",
  "Skill Growth"
];

const grid = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap",
  marginTop: "30px"
};

const card = {
  padding: "25px",
  width: "200px",
  cursor: "pointer"
};

const btn = {
  padding: "14px 35px",
  border: "none",
  borderRadius: "999px",
  background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 0 20px rgba(99,102,241,0.5)"
};

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;