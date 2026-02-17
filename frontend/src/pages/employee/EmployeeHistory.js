import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeHistory = () => {
  const [records, setRecords] = useState([]);
  const [month, setMonth] = useState("");

  const fetchHistory = async () => {
    try {
      const query = month ? `?month=${month}` : "";
      const res = await axios.get(
        `http://localhost:5000/api/attendance/my-history${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #1a002e, #0f0f0f 50%, #001a26)",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#00f5ff",
          textShadow: "0 0 15px #00f5ff",
        }}
      >
        My Attendance History
      </h1>

      {/* Filter Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #00f5ff",
            background: "#111",
            color: "white",
            boxShadow: "0 0 10px rgba(0,245,255,0.3)",
          }}
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <button
          onClick={fetchHistory}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(90deg,#00f5ff,#b026ff)",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 15px #00f5ff",
          }}
        >
          Filter
        </button>
      </div>

      {/* Table Container */}
      <div
        style={{
          overflowX: "auto",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "20px",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 0 30px rgba(0,245,255,0.2), 0 0 40px rgba(176,38,255,0.2)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr
              style={{
                background: "rgba(0,245,255,0.1)",
                color: "#00f5ff",
              }}
            >
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Check In</th>
              <th style={{ padding: "12px" }}>Check Out</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "20px",
                    color: "#ff4d4f",
                  }}
                >
                  No records found
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr
                  key={record._id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {new Date(record.date).toLocaleDateString()}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {record.checkInTime
                      ? new Date(
                          record.checkInTime
                        ).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {record.checkOutTime
                      ? new Date(
                          record.checkOutTime
                        ).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "bold",
                      color:
                        record.status === "present"
                          ? "#39ff14"
                          : record.status === "late"
                          ? "#ffa500"
                          : record.status === "half-day"
                          ? "#00f5ff"
                          : "#ff004f",
                      textShadow: "0 0 8px currentColor",
                    }}
                  >
                    {record.status}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {record.totalHours?.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeHistory;
