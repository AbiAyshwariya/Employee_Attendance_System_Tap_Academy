import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TeamCalendar() {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance(date);
  }, [date]);

  const fetchAttendance = async (selectedDate) => {
    const token = localStorage.getItem("token");
    const formattedDate = selectedDate.toISOString().split("T")[0];

    const res = await fetch(
      `http://localhost:5000/api/attendance?date=${formattedDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setAttendance(data);
  };

  return (
    <div style={container}>
      <h2 style={title}>Team Calendar View</h2>

      {/* Calendar Wrapper */}
      <div style={calendarWrapper}>
        <Calendar
          onChange={setDate}
          value={date}
          className="dark-calendar"
        />
      </div>

      <h3 style={subTitle}>
        Attendance on {date.toDateString()}
      </h3>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Check In</th>
              <th style={thStyle}>Check Out</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td colSpan="4" style={noDataStyle}>
                  No records found
                </td>
              </tr>
            ) : (
              attendance.map((item) => (
                <tr key={item._id} style={rowStyle}>
                  <td style={tdStyle}>{item.userId?.name}</td>

                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: "bold",
                      color:
                        item.status === "present"
                          ? "#39ff14"
                          : item.status === "late"
                          ? "#ffae00"
                          : item.status === "half-day"
                          ? "#00f5ff"
                          : "#ff004f",
                      textShadow: "0 0 8px currentColor",
                    }}
                  >
                    {item.status}
                  </td>

                  <td style={tdStyle}>
                    {item.checkInTime
                      ? new Date(item.checkInTime).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td style={tdStyle}>
                    {item.checkOutTime
                      ? new Date(item.checkOutTime).toLocaleTimeString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Dark Calendar Styling */}
      <style>
        {`
          .dark-calendar {
            background: #0f0f0f;
            border: none;
            border-radius: 15px;
            box-shadow: 0 0 30px #00f5ff55;
            color: white;
            padding: 10px;
          }

          .react-calendar__tile {
            color: white;
            border-radius: 8px;
          }

          .react-calendar__tile--active {
            background: linear-gradient(90deg,#00f5ff,#b026ff);
            color: white;
            box-shadow: 0 0 15px #b026ff;
          }

          .react-calendar__tile:hover {
            background: rgba(0,245,255,0.2);
          }

          .react-calendar__navigation button {
            color: #00f5ff;
          }

          .react-calendar__month-view__weekdays {
            color: #b026ff;
          }
        `}
      </style>
    </div>
  );
}

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

const subTitle = {
  marginTop: "40px",
  marginBottom: "20px",
  color: "#b026ff",
  textShadow: "0 0 12px #b026ff",
};

const calendarWrapper = {
  display: "flex",
  justifyContent: "center",
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

const noDataStyle = {
  padding: "20px",
  textAlign: "center",
  color: "#ff004f",
  textShadow: "0 0 10px #ff004f",
};

export default TeamCalendar;
