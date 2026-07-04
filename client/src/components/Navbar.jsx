function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid #ddd",
        background: "#fff",
      }}
    >
      <h1>CourseFlow</h1>

      <button
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Home
      </button>
    </nav>
  );
}

export default Navbar;