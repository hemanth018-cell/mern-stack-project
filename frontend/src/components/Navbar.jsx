import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1f2937",
        color: "white",
        padding: "15px 30px",
      }}
    >
      <h2>🚀 AI Startup Funding</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/startup"
          style={{ color: "white", textDecoration: "none" }}
        >
          Startup
        </Link>

        <Link
          to="/investor"
          style={{ color: "white", textDecoration: "none" }}
        >
          Investor
        </Link>

        <Link
          to="/matches"
          style={{ color: "white", textDecoration: "none" }}
        >
          AI Matches
        </Link>
      </div>

      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;