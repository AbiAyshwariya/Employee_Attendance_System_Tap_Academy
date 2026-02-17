🕒 Employee Attendance System

A full-stack Employee Attendance Tracking System with role-based access (Employee & Manager). This application allows employees to mark daily attendance and managers to monitor and manage team attendance efficiently.

🚀 Tech Stack

Frontend

React.js

Redux Toolkit (or Zustand)

React Router

Axios

Chart.js / Recharts

Backend

Node.js

Express.js

JWT Authentication

bcrypt

Database

MongoDB (Mongoose) (or PostgreSQL if implemented)

📌 Project Overview

The system supports:

Role-based authentication (Employee / Manager)

Daily Check-In / Check-Out

Attendance history tracking

Monthly attendance summary

Employee & Manager dashboards

CSV export for attendance reports

👥 User Roles
1️⃣ Employee
Features

Register / Login

Mark Attendance (Check In / Check Out)

View Attendance History

View Monthly Summary (Present / Absent / Late)

Dashboard with stats

Pages

Login / Register

Dashboard

Mark Attendance

My Attendance History

Profile

2️⃣ Manager
Features

Login

View all employees attendance

Filter by employee, date, status

View team attendance summary

Export attendance reports (CSV)

Dashboard with analytics

Pages

Login

Dashboard

All Employees Attendance

Team Calendar View

Reports

🗂️ Database Schema
Users Collection

id

name

email

password (hashed)

role (employee / manager)

employeeId (unique, e.g., EMP001)

department

createdAt

Attendance Collection

id

userId

date

checkInTime

checkOutTime

status (present / absent / late / half-day)

totalHours

createdAt

🔐 API Endpoints
Auth

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

Attendance – Employee

POST /api/attendance/checkin
POST /api/attendance/checkout
GET /api/attendance/my-history
GET /api/attendance/my-summary
GET /api/attendance/today

Attendance – Manager

GET /api/attendance/all
GET /api/attendance/employee/:id
GET /api/attendance/summary
GET /api/attendance/export
GET /api/attendance/today-status

Dashboard

GET /api/dashboard/employee
GET /api/dashboard/manager

📊 Dashboard Features
Employee Dashboard

Today's attendance status

Monthly summary (Present / Absent / Late)

Total hours worked this month

Recent attendance (Last 7 days)

Quick Check In / Check Out button

Manager Dashboard

Total employees

Today's attendance statistics

Late arrivals

Weekly attendance trend chart

Department-wise attendance chart

List of absent employees today

⚙️ Setup Instructions
1️⃣ Clone Repository

git clone <your-repository-url>
cd employee-attendance-system

2️⃣ Backend Setup

cd server
npm install

Create a .env file inside server/ folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

Run backend:

npm run dev

Server runs at:
http://localhost:5000

3️⃣ Frontend Setup

cd client
npm install

Create a .env file inside client/ folder:

REACT_APP_API_URL=http://localhost:5000/api

Run frontend:

npm start

App runs at:
http://localhost:3000

🌱 Seed Data

To populate sample users and attendance data:

npm run seed

Sample Accounts

Manager
Email: manager@example.com

Password: 123456

Employee
Email: employee@example.com

Password: 123456

📦 Environment Variables
Backend (.env)

PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=

Frontend (.env)

REACT_APP_API_URL=

📁 Project Structure

employee-attendance-system/
│
├── client/ (React frontend)
├── server/ (Node + Express backend)
├── README.md
└── .env.example
