import { useState } from "react";
import api from "../services/api";

function Investor() {
  const [investor, setInvestor] = useState({
    investorName: "",
    organization: "",
    sectors: "",
    preferredStage: "Idea",
    minInvestment: "",
    maxInvestment: "",
    preferredLocation: "",
    bio: "",
  });

  const handleChange = (e) => {
    setInvestor({
      ...investor,
      [e.target.name]: e.target.value,
    });
  };

  const saveInvestor = async () => {
    try {
      await api.post("/investor", {
        investorName: investor.investorName,
        organization: investor.organization,
        sectors: investor.sectors,
        preferredStage: investor.preferredStage,
        minInvestment: Number(investor.minInvestment),
        maxInvestment: Number(investor.maxInvestment),
        preferredLocation: investor.preferredLocation,
        bio: investor.bio,
      });

      alert("✅ Investor Profile Saved Successfully");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
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
          💼 Investor Profile
        </h1>

        <label>Investor Name</label>
        <input
          style={inputStyle}
          type="text"
          name="investorName"
          placeholder="Enter Investor Name"
          value={investor.investorName}
          onChange={handleChange}
        />

        <label>Organization</label>
        <input
          style={inputStyle}
          type="text"
          name="organization"
          placeholder="Enter Organization"
          value={investor.organization}
          onChange={handleChange}
        />

        <label>Preferred Sector</label>
        <input
          style={inputStyle}
          type="text"
          name="sectors"
          placeholder="AI, Agriculture, Healthcare..."
          value={investor.sectors}
          onChange={handleChange}
        />

        <label>Preferred Startup Stage</label>
        <select
          style={inputStyle}
          name="preferredStage"
          value={investor.preferredStage}
          onChange={handleChange}
        >
          <option value="Idea">Idea</option>
          <option value="MVP">MVP</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
        </select>

        <label>Minimum Investment (₹)</label>
        <input
          style={inputStyle}
          type="number"
          name="minInvestment"
          placeholder="1000000"
          value={investor.minInvestment}
          onChange={handleChange}
        />

        <label>Maximum Investment (₹)</label>
        <input
          style={inputStyle}
          type="number"
          name="maxInvestment"
          placeholder="10000000"
          value={investor.maxInvestment}
          onChange={handleChange}
        />

        <label>Preferred Location</label>
        <input
          style={inputStyle}
          type="text"
          name="preferredLocation"
          placeholder="City"
          value={investor.preferredLocation}
          onChange={handleChange}
        />

        <label>Bio</label>
        <textarea
          style={{
            ...inputStyle,
            resize: "none",
            height: "120px",
          }}
          name="bio"
          placeholder="Tell us about the investor..."
          value={investor.bio}
          onChange={handleChange}
        />

        <button
          onClick={saveInvestor}
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
          💾 Save Investor Profile
        </button>
      </div>
    </div>
  );
}

export default Investor;