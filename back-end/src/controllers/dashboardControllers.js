const Attendance = require("../models/Attendance");
const User = require("../models/User");

exports.employeeDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);

    const todayRecord = await Attendance.findOne({
      userId,
      date: today,
    });

    const monthlyRecords = await Attendance.find({
      userId,
      date: { $gte: firstDay },
    });

    const recentRecords = await Attendance.find({
      userId,
      date: { $gte: last7Days },
    }).sort({ date: -1 });

    let present = 0;
    let late = 0;
    let halfDay = 0;
    let totalHours = 0;

    monthlyRecords.forEach((record) => {
      if (record.status === "present") present++;
      if (record.status === "late") late++;
      if (record.status === "half-day") halfDay++;
      totalHours += record.totalHours;
    });

    res.json({
      todayStatus: todayRecord,
      monthlyStats: {
        present,
        late,
        halfDay,
        totalHours: totalHours.toFixed(2),
      },
      recentAttendance: recentRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.managerDashboard = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecords = await Attendance.find({
      date: today,
    }).populate("userId", "role");

    // Only count employees
    const presentUserIds = [
      ...new Set(
        todayRecords
          .filter((r) => r.userId.role === "employee")
          .map((r) => r.userId._id.toString())
      ),
    ];

    const presentToday = presentUserIds.length;

    const lateToday = todayRecords.filter(
      (r) =>
        r.userId.role === "employee" &&
        r.status === "late"
    ).length;

    const absentEmployees = await User.find({
      role: "employee",
      _id: { $nin: presentUserIds },
    }).select("-password -__v");

    res.json({
      totalEmployees,
      todayAttendance: {
        present: presentToday,
        absent: absentEmployees.length,
        late: lateToday,
      },
      absentEmployees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
