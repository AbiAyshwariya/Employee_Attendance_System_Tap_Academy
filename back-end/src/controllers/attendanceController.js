const Attendance = require("../models/Attendance");
const { Parser } = require("json2csv");

/* ===========================
   HELPER: Get Start Of Today (Timezone Safe)
=========================== */
const getStartOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

/* ===========================
   CHECK IN
=========================== */
exports.checkIn = async (req, res) => {
  try {
    const today = getStartOfToday();

    const existing = await Attendance.findOne({
      userId: req.user._id,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already checked in today",
      });
    }

    const now = new Date();

    // Correct Late Logic
    const isLate =
      now.getHours() > 9 ||
      (now.getHours() === 9 && now.getMinutes() > 30);

    const attendance = await Attendance.create({
      userId: req.user._id,
      date: today,
      checkInTime: now,
      status: isLate ? "late" : "present",
      totalHours: 0,
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   CHECK OUT
=========================== */
exports.checkOut = async (req, res) => {
  try {
    const today = getStartOfToday();

    const attendance = await Attendance.findOne({
      userId: req.user._id,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({
        message: "Check in first",
      });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({
        message: "Already checked out",
      });
    }

    const now = new Date();
    attendance.checkOutTime = now;

    const totalHours =
      (attendance.checkOutTime - attendance.checkInTime) /
      (1000 * 60 * 60);

    attendance.totalHours = totalHours;

    if (totalHours < 4) {
      attendance.status = "half-day";
    }

    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   GET TODAY STATUS
=========================== */
exports.getTodayStatus = async (req, res) => {
  try {
    const today = getStartOfToday();

    const attendance = await Attendance.findOne({
      userId: req.user._id,
      date: today,
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   GET MY HISTORY
=========================== */
exports.getMyHistory = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      userId: req.user._id,
    }).sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   GET MONTHLY SUMMARY
=========================== */
exports.getMonthlySummary = async (req, res) => {
  try {
    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const records = await Attendance.find({
      userId: req.user._id,
      date: { $gte: firstDay, $lte: lastDay },
    });

    let present = 0;
    let late = 0;
    let halfDay = 0;
    let totalHours = 0;

    records.forEach((record) => {
      if (record.status === "present") present++;
      if (record.status === "late") late++;
      if (record.status === "half-day") halfDay++;
      totalHours += record.totalHours || 0;
    });

    res.json({
      month: now.toLocaleString("default", { month: "long" }),
      year: now.getFullYear(),
      totalWorkingDays: records.length,
      present,
      late,
      halfDay,
      totalHours: totalHours.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   EXPORT CSV
=========================== */
exports.exportAttendanceCSV = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Attendance.find(filter)
      .populate("userId", "name email department")
      .lean();

    const formattedData = records.map((record) => ({
      EmployeeName: record.userId?.name,
      Email: record.userId?.email,
      Department: record.userId?.department,
      Date: record.date,
      CheckIn: record.checkInTime,
      CheckOut: record.checkOutTime,
      Status: record.status,
      TotalHours: record.totalHours,
    }));

    const fields = [
      "EmployeeName",
      "Email",
      "Department",
      "Date",
      "CheckIn",
      "CheckOut",
      "Status",
      "TotalHours",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(formattedData);

    res.header("Content-Type", "text/csv");
    res.attachment("attendance_report.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   GET ALL ATTENDANCE (Manager)
=========================== */
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("userId", "name email department role")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   GET EMPLOYEE ATTENDANCE (Manager)
=========================== */
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      userId: req.params.id,
    }).populate("userId", "name email department");

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   GET TODAY STATUS ALL (Manager)
=========================== */
exports.getTodayStatusAll = async (req, res) => {
  try {
    const today = getStartOfToday();

    const records = await Attendance.find({
      date: today,
    }).populate("userId", "name email department");

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   TEAM SUMMARY (Manager)
=========================== */
/* ===========================
   MANAGER DASHBOARD SUMMARY
=========================== */
exports.getManagerDashboard = async (req, res) => {
  try {
    const today = getStartOfToday();

    const todayRecords = await Attendance.find({
      date: today,
    }).populate("userId");

    const summary = {
      totalEmployees: 0,
      present: 0,
      late: 0,
      halfDay: 0,
      absent: 0,
      totalHours: 0,
    };

    const uniqueEmployees = new Set();

    todayRecords.forEach((record) => {
      uniqueEmployees.add(record.userId?._id.toString());

      if (record.status === "present") summary.present++;
      if (record.status === "late") summary.late++;
      if (record.status === "half-day") summary.halfDay++;

      summary.totalHours += record.totalHours || 0;
    });

    summary.totalEmployees = uniqueEmployees.size;
    summary.totalHours = summary.totalHours.toFixed(2);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;

    const selectedDate = new Date(date);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const records = await Attendance.find({
      date: {
        $gte: selectedDate,
        $lt: nextDate,
      },
    }).populate("userId", "name email department");

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
