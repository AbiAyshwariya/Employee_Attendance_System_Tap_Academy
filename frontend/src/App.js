import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";



import ManagerDashboard from "./pages/manager/ManagerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeHistory from "./pages/employee/EmployeeHistory";
import AllEmployeesAttendance from "./pages/manager/AllEmployeesAttendance";
import Reports from "./pages/manager/Reports";
import Profile from "./pages/employee/Profile"
import TeamCalendar from "./pages/manager/TeamCalendar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADD THIS */}
        <Route
          path="/attendance/my-history"
          element={
            <ProtectedRoute role="employee">
              <EmployeeHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/manager/attendance"
  element={
    <ProtectedRoute role="manager">
      <AllEmployeesAttendance />
    </ProtectedRoute>
  }
/>






<Route
  path="/manager/reports"
  element={
    <ProtectedRoute role="manager">
      <Reports />
    </ProtectedRoute>
  }
/>

<Route path="/employee/profile" element={<Profile />} />
<Route path="/manager/calendar" element={<TeamCalendar />} />

      </Routes>
    </Router>
  );
}

export default App;
