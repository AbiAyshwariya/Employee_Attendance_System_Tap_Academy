import { useState } from "react";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/attendance/export?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "attendance_report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("Failed to download report");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Attendance Reports</h1>

        <div style={inputGroup}>
          <label style={label}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputGroup}>
          <label style={label}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button onClick={handleDownload} style={downloadButton}>
          Download CSV Report
        </button>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "radial-gradient(circle at 20% 20%, #1a002b, #0a0a0a 60%, #001a26)",
  fontFamily: "Segoe UI, sans-serif",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  padding: "50px",
  borderRadius: "25px",
  width: "400px",
  boxShadow: "0 0 40px rgba(0,245,255,0.3)",
  textAlign: "center",
};

const title = {
  marginBottom: "40px",
  color: "#00f5ff",
  textShadow: "0 0 15px #00f5ff",
};

const inputGroup = {
  marginBottom: "25px",
  textAlign: "left",
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#b026ff",
  textShadow: "0 0 8px #b026ff",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #00f5ff",
  backgroundColor: "#0f0f0f",
  color: "white",
  boxShadow: "0 0 10px #00f5ff55",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
};

const downloadButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  marginTop: "10px",
  background: "linear-gradient(90deg,#00f5ff,#b026ff)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 20px #b026ff",
  transition: "0.3s",
};

export default Reports;
