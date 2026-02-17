const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./src/models/User");
const Attendance = require("./src/models/Attendance");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    await User.deleteMany();
    await Attendance.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    const manager = await User.create({
      name: "HR Manager",
      email: "manager@test.com",
      password: hashedPassword,
      role: "manager",
      employeeId: "MGR001",
      department: "HR",
      createdAt: new Date(),
    });

    const employees = await User.insertMany([
      { name: "John Doe", email: "employee1@test.com", password: hashedPassword, role: "employee", employeeId: "EMP001", department: "IT", createdAt: new Date() },
      { name: "Jane Smith", email: "employee2@test.com", password: hashedPassword, role: "employee", employeeId: "EMP002", department: "Finance", createdAt: new Date() },
      { name: "David Kumar", email: "employee3@test.com", password: hashedPassword, role: "employee", employeeId: "EMP003", department: "IT", createdAt: new Date() },
    ]);

    const attendanceRecords = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      attendanceRecords.push(
        { userId: employees[0]._id, date, checkInTime: new Date(date.setHours(9, 0)), checkOutTime: new Date(date.setHours(18, 0)), status: "present", totalHours: 9, createdAt: new Date() },
        { userId: employees[1]._id, date, checkInTime: new Date(date.setHours(10, 30)), checkOutTime: new Date(date.setHours(18, 0)), status: "late", totalHours: 7.5, createdAt: new Date() },
        { userId: employees[2]._id, date, checkInTime: new Date(date.setHours(9, 0)), checkOutTime: new Date(date.setHours(13, 0)), status: "half-day", totalHours: 4, createdAt: new Date() }
      );
    }

    await Attendance.insertMany(attendanceRecords);

    console.log("✅ Seed Data Inserted Successfully");
    console.log("\nSample Credentials:");
    console.log("Manager → manager@test.com / 123456");
    console.log("Employee → employee1@test.com / 123456");

    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
