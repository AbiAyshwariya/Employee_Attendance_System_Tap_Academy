import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeDashboard } from "../../features/dashboard/dashboardSlice";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  employeeCheckIn,
  employeeCheckOut,
} from "../../features/dashboard/dashboardSlice";

function EmployeeDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchEmployeeDashboard());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCheckIn = async () => {
    await dispatch(employeeCheckIn());
    dispatch(fetchEmployeeDashboard());
  };

  const handleCheckOut = async () => {
    await dispatch(employeeCheckOut());
    dispatch(fetchEmployeeDashboard());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #14001f, #0f0f0f 50%, #001a26)",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
        color: "white",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            color: "#00f5ff",
            textShadow: "0 0 15px #00f5ff",
          }}
        >
          Employee Dashboard
        </h1>

        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/employee/profile">
            <button
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "1px solid #39ff14",
                background: "transparent",
                color: "#39ff14",
                cursor: "pointer",
                boxShadow: "0 0 15px #39ff14",
              }}
            >
              My Profile
            </button>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#ff004f",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 0 15px #ff004f",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {/* Action Buttons */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={handleCheckIn}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg,#00f5ff,#00c3ff)",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            marginRight: "15px",
            boxShadow: "0 0 20px #00f5ff",
          }}
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg,#b026ff,#8f00ff)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 20px #b026ff",
          }}
        >
          Check Out
        </button>

        <Link to="/attendance/my-history">
          <button
            style={{
              marginLeft: "20px",
              padding: "12px 20px",
              borderRadius: "10px",
              border: "1px solid #39ff14",
              background: "transparent",
              color: "#39ff14",
              cursor: "pointer",
              boxShadow: "0 0 15px #39ff14",
            }}
          >
            View My Attendance History
          </button>
        </Link>
      </div>

      {/* Data Cards */}
      {data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* Today Status Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: "30px",
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 0 30px rgba(0,245,255,0.3), 0 0 50px rgba(176,38,255,0.2)",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                color: "#00f5ff",
                textShadow: "0 0 10px #00f5ff",
              }}
            >
              Today's Status
            </h3>

            <p>
              Status:{" "}
              <strong style={{ color: "#39ff14" }}>
                {data.todayStatus?.status || "Not Checked In"}
              </strong>
            </p>

            <p>
              Check In:{" "}
              {data.todayStatus?.checkInTime
                ? new Date(
                    data.todayStatus.checkInTime
                  ).toLocaleTimeString()
                : "-"}
            </p>

            <p>
              Check Out:{" "}
              {data.todayStatus?.checkOutTime
                ? new Date(
                    data.todayStatus.checkOutTime
                  ).toLocaleTimeString()
                : "-"}
            </p>
          </div>

          {/* Monthly Summary Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: "30px",
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 0 30px rgba(176,38,255,0.3), 0 0 50px rgba(0,245,255,0.2)",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                color: "#b026ff",
                textShadow: "0 0 10px #b026ff",
              }}
            >
              Monthly Summary
            </h3>

            <p>Present Days: {data.monthlyStats.present}</p>
            <p>Late Days: {data.monthlyStats.late}</p>
            <p>Half Days: {data.monthlyStats.halfDay}</p>
            <p>Total Hours: {data.monthlyStats.totalHours}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
