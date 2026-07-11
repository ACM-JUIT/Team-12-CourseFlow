import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer style={{
      background: "#020617",
      padding: "25px",
      textAlign: "center",
      borderTop: "1px solid #1e293b"
    }}>
      <p>©️ 2026 CourseFlow</p>

      <div style={{ margin: "15px 0" }}>
        <Link to="/about" style={link}>About</Link>
        <a href="#" style={link}>Privacy</a>
        <a href="mailto:support@courseflow.com" style={link}>Contact</a>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {[FaGithub, FaLinkedin, FaInstagram].map((Icon, i) => (
          <Icon
            key={i}
            size={22}
            style={{ cursor: "pointer" }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.3)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          />
        ))}
      </div>

      
    </footer>
  );
}

const link = {
  margin: "0 10px",
  color: "#60a5fa",
  textDecoration: "none"
};

export default Footer;