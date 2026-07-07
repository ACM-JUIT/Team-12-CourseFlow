function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #333",
        padding: "40px",
        marginTop: "60px",
        textAlign: "center",
        color: "#ccc",
      }}
    >
      <h2>CourseFlow</h2>

      <p>Developer: Team 11-12 OSO</p>

      <p style={{ marginTop: "15px" }}>
        <a
          href="#"
          style={{
            color: "#4f8cff",
            textDecoration: "none",
            marginRight: "20px",
          }}
        >
          Privacy Policy
        </a>

        <a
          href="#"
          style={{
            color: "#4f8cff",
            textDecoration: "none",
          }}
        >
          Terms & Conditions
        </a>
      </p>

      <p style={{ marginTop: "20px" }}>
        © 2026 CourseFlow™. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;