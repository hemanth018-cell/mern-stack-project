import { useEffect, useState } from "react";
import api from "../services/api";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [startup, setStartup] = useState("");

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const res = await api.get("/match");

      setStartup(res.data.startup);
      setMatches(res.data.matches);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to fetch matches");
    }
  };

  return (
    <div
      style={{
        width: "900px",
        margin: "30px auto",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🤖 AI Investor Matches</h1>

      <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
        Startup : {startup}
      </h3>

      {matches.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Investors Found</h2>
      ) : (
        matches.map((match, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>
              {match.investorName}

              {index === 0 && (
                <span
                  style={{
                    color: "gold",
                    marginLeft: "10px",
                    fontSize: "18px",
                  }}
                >
                  🏆 Top Match
                </span>
              )}
            </h2>

            <h4>{match.organization}</h4>

            <h3>⭐ Match Score : {match.score}%</h3>

            {/* Progress Bar */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#ddd",
                borderRadius: "20px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  width: `${match.score}%`,
                  height: "18px",
                  backgroundColor: "green",
                  borderRadius: "20px",
                }}
              ></div>
            </div>

            <p>
              <b>Matched On:</b>
            </p>

            <ul>
              {match.matchedOn.map((field, i) => (
                <li key={i}>✔ {field}</li>
              ))}
            </ul>

            <button
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() =>
                alert(`Investor Name: ${match.investorName}

Organization: ${match.organization}

Sector: ${match.sectors}

Preferred Stage: ${match.preferredStage}

Investment Range:
₹${match.minInvestment} - ₹${match.maxInvestment}

Preferred Location:
${match.preferredLocation}

Match Score: ${match.score}%

Matched On:
${match.matchedOn.join(", ")}`)
              }
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Matches;