import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";

const AllEmployeesAttendance = () => {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    employee: "",
    status: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await API.get("/attendance/all");
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams(filters).toString();
      const res = await API.get(`/attendance/all?${query}`);
      setRecords(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, [fetchEmployees, fetchAttendance]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={container}>
      <h2 style={title}>All Employees Attendance</h2>

      {/* Filters */}
      <div style={filterContainer}>
        {/* Employee Dropdown */}
        <select
          name="employee"
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="" style={optionStyle}>
            All Employees
          </option>
          {employees.map((emp) => (
            <option
              key={emp._id}
              value={emp._id}
              style={optionStyle}
            >
              {emp.name}
            </option>
          ))}
        </select>

        {/* Status Dropdown */}
        <select
          name="status"
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="" style={optionStyle}>
            All Status
          </option>
          <option value="present" style={optionStyle}>
            Present
          </option>
          <option value="absent" style={optionStyle}>
            Absent
          </option>
          <option value="late" style={optionStyle}>
            Late
          </option>
          <option value="half-day" style={optionStyle}>
            Half-Day
          </option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={fetchAttendance} style={filterButton}>
          Apply Filter
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div style={loadingText}>Loading Attendance...</div>
      ) : (
        <div style={tableWrapper}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Employee</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Check In</th>
                <th style={thStyle}>Check Out</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="6" style={noRecordStyle}>
                    No records found
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record._id} style={rowStyle}>
                    <td style={tdStyle}>{record.userId?.name}</td>
                    <td style={tdStyle}>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>
                      {record.checkInTime
                        ? new Date(record.checkInTime).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td style={tdStyle}>
                      {record.checkOutTime
                        ? new Date(record.checkOutTime).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        fontWeight: "bold",
                        color:
                          record.status === "present"
                            ? "#39ff14"
                            : record.status === "late"
                            ? "#ffae00"
                            : record.status === "half-day"
                            ? "#00f5ff"
                            : "#ff004f",
                        textShadow: "0 0 8px currentColor",
                      }}
                    >
                      {record.status}
                    </td>
                    <td style={tdStyle}>
                      {record.totalHours?.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  padding: "50px",
  background:
    "radial-gradient(circle at 20% 20%, #1a002b, #0a0a0a 60%, #001a26)",
  fontFamily: "Segoe UI, sans-serif",
  color: "white",
};

const title = {
  fontSize: "28px",
  marginBottom: "30px",
  color: "#00f5ff",
  textShadow: "0 0 15px #00f5ff",
};

const filterContainer = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  marginBottom: "30px",
};

const inputStyle = {
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

const optionStyle = {
  backgroundColor: "#0f0f0f",
  color: "white",
};

const filterButton = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg,#00f5ff,#b026ff)",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 0 15px #b026ff",
};

const loadingText = {
  color: "#00f5ff",
  textShadow: "0 0 15px #00f5ff",
};

const tableWrapper = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "20px",
  padding: "25px",
  backdropFilter: "blur(15px)",
  boxShadow: "0 0 30px rgba(0,245,255,0.3)",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "15px",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  color: "#b026ff",
  textShadow: "0 0 8px #b026ff",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  textAlign: "center",
};

const rowStyle = {
  transition: "0.3s",
};

const noRecordStyle = {
  padding: "20px",
  textAlign: "center",
  color: "#ff004f",
  textShadow: "0 0 10px #ff004f",
};

export default AllEmployeesAttendance;
