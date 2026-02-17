const express = require("express");
const router = express.Router();

const {
  employeeDashboard,
  managerDashboard,
} = require("../controllers/dashboardControllers");

const { protect, managerOnly } = require("../middleware/authMiddleware");

router.get("/employee", protect, employeeDashboard);
router.get("/manager", protect, managerOnly, managerDashboard);
module.exports = router;
