import { useState } from "react";
import api from "../services/api";

function Startup() {
  const [startup, setStartup] = useState({
    startupName: "",
    founder: "",
    industry: "",
    stage: "Idea",
    fundingRequired: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setStartup({
      ...startup,
      [e.target.name]: e.target.value,
    });
  };

  const saveStartup = async () => {
    try {
      await api.post("/startup", {
        startupName: startup.startupName,
        founder: startup.founder,
        industry: startup.industry,
        stage: startup.stage,
        fundingRequired: Number(startup.fundingRequired),
        location: startup.location,
        description: startup.description,
      });

      alert("✅ Startup Profile Saved Successfully");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "650px",
          margin: "auto",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "30px",
          }}
        >
          🚀 Startup Profile
        </h1>

        <label>Startup Name</label>
        <input
          style={inputStyle}
          type="text"
          name="startupName"
          placeholder="Enter Startup Name"
          value={startup.startupName}
          onChange={handleChange}
        />

        <label>Founder</label>
        <input
          style={inputStyle}
          type="text"
          name="founder"
          placeholder="Enter Founder Name"
          value={startup.founder}
          onChange={handleChange}
        />

        <label>Industry</label>
        <input
          style={inputStyle}
          type="text"
          name="industry"
          placeholder="AI, Agriculture, Healthcare..."
          value={startup.industry}
          onChange={handleChange}
        />

        <label>Startup Stage</label>
        <select
          style={inputStyle}
          name="stage"
          value={startup.stage}
          onChange={handleChange}
        >
          <option value="Idea">Idea</option>
          <option value="MVP">MVP</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
        </select>

        <label>Funding Required (₹)</label>
        <input
          style={inputStyle}
          type="number"
          name="fundingRequired"
          placeholder="5000000"
          value={startup.fundingRequired}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          style={inputStyle}
          type="text"
          name="location"
          placeholder="City"
          value={startup.location}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          style={{
            ...inputStyle,
            resize: "none",
            height: "120px",
          }}
          name="description"
          placeholder="Describe your startup..."
          value={startup.description}
          onChange={handleChange}
        />

        <button
          onClick={saveStartup}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "17px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          💾 Save Startup Profile
        </button>
      </div>
    </div>
  );
}

export default Startup;