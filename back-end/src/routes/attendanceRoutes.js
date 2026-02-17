const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  getTodayStatus,
} = require("../controllers/attendanceController");
const { getMyHistory } = require("../controllers/attendanceController");
const { getMonthlySummary } = require("../controllers/attendanceController");
const { managerOnly } = require("../middleware/authMiddleware");
const {
  getAllAttendance,
  getEmployeeAttendance,
  getTodayStatusAll,
  getManagerDashboard,
  getAttendanceByDate
} = require("../controllers/attendanceController");
const { exportAttendanceCSV } = require("../controllers/attendanceController");


const { protect } = require("../middleware/authMiddleware");
console.log("protect:", protect);
console.log("managerOnly:", managerOnly);
console.log("getTeamSummary:", getManagerDashboard);
router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);
router.get("/today", protect, getTodayStatus);
router.get("/my-history", protect, getMyHistory);
router.get("/my-summary", protect, getMonthlySummary);
router.get("/all", protect, managerOnly, getAllAttendance);
router.get("/employee/:id", protect, managerOnly, getEmployeeAttendance);
router.get("/today-status", protect, managerOnly, getTodayStatusAll);
router.get("/summary", protect, managerOnly, getManagerDashboard);
router.get("/export", protect, managerOnly, exportAttendanceCSV);
router.get("/manager/dashboard", protect, managerOnly, getManagerDashboard);
router.get("/", protect, managerOnly, getAttendanceByDate);



module.exports = router;
