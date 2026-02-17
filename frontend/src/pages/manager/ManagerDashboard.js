import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function ManagerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/manager");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!data)
    return (
      <div style={loadingContainer}>
        <div style={loadingGlow}>Loading Dashboard...</div>
      </div>
    );

  return (
    <div style={container}>
      {/* Header */}
      {/* Header */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "50px",
  }}
>
  <h1
    style={{
      fontSize: "32px",
      color: "#b026ff",
      textShadow: "0 0 15px #b026ff, 0 0 30px #b026ff",
    }}
  >
    Manager Control Panel
  </h1>

  <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
    
    <Link to="/manager/calendar">
      <button style={neonButton("#00f5ff")}>
        Calendar View
      </button>
    </Link>

    <Link to="/manager/reports">
      <button style={neonButton("#39ff14")}>
        Reports
      </button>
    </Link>

    <Link to="/manager/attendance">
      <button style={neonButton("#b026ff")}>
        View Attendance
      </button>
    </Link>

    <button
      onClick={handleLogout}
      style={neonButton("#ff004f")}
    >
      Logout
    </button>

  </div>
</div>

      {/* Summary Cards */}
      <div style={cardGrid}>
        <Card title="Total Employees" value={data.totalEmployees} glow="#00f5ff" />
        <Card title="Present Today" value={data.todayAttendance.present} glow="#39ff14" />
        <Card title="Absent Today" value={data.todayAttendance.absent} glow="#ff004f" />
        <Card title="Late Today" value={data.todayAttendance.late} glow="#b026ff" />
      </div>

      {/* Absent Employees */}
      <h2 style={sectionTitle}>Absent Employees Today</h2>

      {data.absentEmployees.length === 0 ? (
        <div style={successBox}>All employees are present today 🎉</div>
      ) : (
        <div style={tableWrapper}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Employee ID</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.absentEmployees.map((emp) => (
                <tr key={emp._id} style={rowStyle}>
                  <td style={tdStyle}>{emp.name}</td>
                  <td style={tdStyle}>{emp.employeeId}</td>
                  <td style={tdStyle}>{emp.department}</td>
                  <td style={tdStyle}>{emp.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================== COMPONENTS ================== */

function Card({ title, value, glow }) {
  return (
    <div
      style={{
        ...cardStyle,
        boxShadow: `0 0 25px ${glow}, 0 0 50px ${glow}40`,
        border: `1px solid ${glow}55`,
      }}
    >
      <h3 style={{ color: glow, textShadow: `0 0 12px ${glow}` }}>
        {title}
      </h3>
      <p style={cardValue}>{value}</p>
    </div>
  );
}

/* ================== STYLES ================== */

const container = {
  minHeight: "100vh",
  padding: "50px",
  fontFamily: "Segoe UI, sans-serif",
  color: "white",
  background:
    "radial-gradient(circle at 20% 20%, #1a002b, #0a0a0a 60%, #001a26)",
  animation: "fadeIn 0.6s ease-in-out",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "50px",
};

const title = {
  fontSize: "32px",
  color: "#b026ff",
  textShadow: "0 0 15px #b026ff, 0 0 30px #b026ff",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "30px",
  marginBottom: "60px",
};

const cardStyle = {
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(15px)",
  textAlign: "center",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const cardValue = {
  fontSize: "36px",
  fontWeight: "bold",
  marginTop: "15px",
};

const sectionTitle = {
  marginBottom: "25px",
  fontSize: "22px",
  color: "#ff004f",
  textShadow: "0 0 12px #ff004f",
};

const tableWrapper = {
  background: "rgba(255,255,255,0.04)",
  borderRadius: "20px",
  padding: "25px",
  backdropFilter: "blur(15px)",
  boxShadow: "0 0 30px rgba(255,0,79,0.3)",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  color: "white",
};

const thStyle = {
  padding: "15px",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  color: "#00f5ff",
  textShadow: "0 0 8px #00f5ff",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  textAlign: "center",
};

const rowStyle = {
  transition: "0.3s",
};

const successBox = {
  padding: "20px",
  borderRadius: "15px",
  background: "rgba(57,255,20,0.1)",
  color: "#39ff14",
  textShadow: "0 0 10px #39ff14",
  boxShadow: "0 0 25px #39ff1440",
};

const loadingContainer = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "radial-gradient(circle at 20% 20%, #1a002b, #0a0a0a 60%, #001a26)",
};

const loadingGlow = {
  fontSize: "24px",
  color: "#00f5ff",
  textShadow: "0 0 20px #00f5ff",
};

const neonButton = (color) => ({
  padding: "10px 20px",
  borderRadius: "8px",
  border: `1px solid ${color}`,
  background: "transparent",
  color: color,
  cursor: "pointer",
  boxShadow: `0 0 12px ${color}`,
  transition: "all 0.3s ease",
});
 export default ManagerDashboard;