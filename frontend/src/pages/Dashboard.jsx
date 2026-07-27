import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [startup, setStartup] = useState(null);
  const [topMatch, setTopMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const startupRes = await api.get("/startup/me");
      const matchRes = await api.get("/match");

      setStartup(startupRes.data.startup);

      if (matchRes.data.matches.length > 0) {
        setTopMatch(matchRes.data.matches[0]);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const readinessScore = () => {
    if (!startup) return 0;

    let score = 0;

    if (startup.startupName) score += 15;
    if (startup.founder) score += 10;
    if (startup.industry) score += 15;
    if (startup.stage) score += 20;
    if (startup.fundingRequired) score += 15;
    if (startup.location) score += 10;
    if (startup.description) score += 15;

    return score;
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        ⏳ Loading Dashboard...
      </h2>
    );
  }

  return (
    <div
      style={{
        width: "1000px",
        margin: "30px auto",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2563eb" }}>
        🚀 AI Startup Funding Platform
      </h1>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Startup</h3>
          <h2>✔ Created</h2>
        </div>

        <div
          style={{
            background: "#10b981",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Matches</h3>
          <h2>{topMatch ? 1 : 0}</h2>
        </div>

        <div
          style={{
            background: "#f59e0b",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Top Score</h3>
          <h2>{topMatch ? topMatch.score : 0}%</h2>
        </div>

        <div
          style={{
            background: "#8b5cf6",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Funding</h3>
          <h2>₹{startup?.fundingRequired}</h2>
        </div>
      </div>

      {/* Startup Details */}

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginBottom: "25px",
        }}
      >
        <h2>🏢 Startup Details</h2>

        <p><b>Name:</b> {startup?.startupName}</p>
        <p><b>Founder:</b> {startup?.founder}</p>
        <p><b>Industry:</b> {startup?.industry}</p>
        <p><b>Stage:</b> {startup?.stage}</p>
        <p><b>Funding Required:</b> ₹{startup?.fundingRequired}</p>
        <p><b>Location:</b> {startup?.location}</p>
      </div>

      {/* Funding Readiness */}

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginBottom: "25px",
        }}
      >
        <h2>📈 Funding Readiness</h2>

        <h1>{readinessScore()} / 100</h1>

        <div
          style={{
            width: "100%",
            height: "20px",
            background: "#ddd",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              width: `${readinessScore()}%`,
              height: "20px",
              background: "#10b981",
              borderRadius: "20px",
            }}
          ></div>
        </div>
      </div>

      {/* Top Match */}

      {topMatch && (
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🏆 Top Investor Match</h2>

          <h3>{topMatch.investorName}</h3>

          <h4>{topMatch.organization}</h4>

          <h2 style={{ color: "#10b981" }}>
            ⭐ {topMatch.score}% Match
          </h2>

          <div
            style={{
              width: "100%",
              background: "#ddd",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: `${topMatch.score}%`,
                height: "20px",
                background: "#10b981",
                borderRadius: "20px",
              }}
            ></div>
          </div>

          <h3>Matched On</h3>

          <ul>
            {topMatch.matchedOn.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;