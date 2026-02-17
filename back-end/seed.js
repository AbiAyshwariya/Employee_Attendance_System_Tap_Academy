import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Attendance from "./models/Attendance.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    // Clear existing data
    await User.deleteMany();
    await Attendance.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    // Create Manager
    const manager = await User.create({
      name: "HR Manager",
      email: "manager@test.com",
      password: hashedPassword,
      role: "manager",
      employeeId: "MGR001",
      department: "HR",
    });

    // Create Employees
    const employee1 = await User.create({
      name: "John Employee",
      email: "employee1@test.com",
      password: hashedPassword,
      role: "employee",
      employeeId: "EMP001",
      department: "IT",
    });

    const employee2 = await User.create({
      name: "Jane Employee",
      email: "employee2@test.com",
      password: hashedPassword,
      role: "employee",
      employeeId: "EMP002",
      department: "Finance",
    });

    // Create Attendance Records
    const today = new Date();

    await Attendance.insertMany([
      {
        userId: employee1._id,
        date: today,
        checkInTime: new Date(today.setHours(9, 0)),
        checkOutTime: new Date(today.setHours(18, 0)),
        status: "present",
        totalHours: 9,
      },
      {
        userId: employee2._id,
        date: today,
        checkInTime: new Date(today.setHours(10, 30)),
        checkOutTime: new Date(today.setHours(18, 0)),
        status: "late",
        totalHours: 7.5,
      },
    ]);

    console.log("Seed Data Inserted Successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
