
Name: Abi Ayshwariya S
College: Vel Tech Rangarajan Dr Sagunthala R&D institute of science and technology
Phone: 9150150292

# 🏢 Employee Attendance Management System

### 📌 Project Overview
A full-stack Employee Attendance Management System built using the MERN stack.
Includes JWT authentication, role-based access control, employee check-in/check-out,
and real-time dashboards for Employees and Managers.

---

### 🌐 Preview URLs
Frontend_URL: <YOUR_FRONTEND_PREVIEW_URL>
Backend_URL: <YOUR_BACKEND_PREVIEW_URL>

---

### 🛠 Tech Stack

#### 🔹 Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- CSS

#### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password Hashing)

---

### 🔐 Authentication & Authorization
- User Registration
- Secure Login with JWT
- Password Hashing using bcrypt
- Middleware Token Verification
- Role-Based Route Protection
- Protected Frontend Routes

---

### 👩‍💼 Employee Features
- Check-In functionality
- Check-Out functionality
- View Today's Attendance Status
- Monthly Summary:
  - Present Days
  - Late Days
  - Half Days
  - Total Working Hours

---

### 👨‍💼 Manager Features
- View Total Employees
- Today's Attendance Summary
- Absent Employees List

---

### 🗂 Project Structure

#### Backend
- controllers/
- models/
- routes/
- middleware/
- server.js

#### Frontend
- components/
- pages/
- features/
- services/
- App.js

---

### ⚙️ Setup Instructions

#### 🔹 Backend Setup
cd backend  
npm install  
Create .env file with:
  PORT=5000  
  MONGO_URI=your_mongodb_connection_string  
  JWT_SECRET=your_secret_key  
npm start  

Runs on: http://localhost:5000

#### 🔹 Frontend Setup
cd frontend  
npm install  
npm start  

Runs on: http://localhost:3000

---

### 📡 API Endpoints

#### API Endpoints
### Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

##### Attendance (Employee)
##### POST /api/attendance/checkin - Check in
##### POST /api/attendance/checkout - Check out
##### GET /api/attendance/my-history - My attendance
##### GET /api/attendance/my-summary - Monthly summary
##### GET /api/attendance/today - Today's status

#### Attendance (Manager).
##### GET /api/attendance/all - All employees
##### GET /api/attendance/employee/:id - Specific employee
##### GET /api/attendance/summary - Team summary
##### GET /api/attendance/export - Export CSV
##### GET /api/attendance/today-status - Who's present today

#### Dashboard
##### GET /api/dashboard/employee - Employee stats
##### GET /api/dashboard/manager - Manager stats

---
## Seed Data

To populate sample users and attendance:

cd backend
npm run seed

Sample Credentials:

Manager:
Email: manager@test.com
Password: 123456

Employee:
Email: employee1@test.com
Password: 123456
----

### 🚀 Deployment Options

Use generated public URLs.

#### 🔹 Production Deployment
Frontend → Vercel / Netlify  
Backend → Render / Railway  

---

### 👩‍💻 Author
Name: Ayshwariya  
Role: Computer Science Engineering Student  
Tap Academy Evaluation

# Employee
------------------------------------------------------------
## Login/Register
<img width="1859" height="952" alt="image" src="https://github.com/user-attachments/assets/82dd94f9-c5ed-4a83-86ed-8f4e45685171" />
<img width="1905" height="932" alt="image" src="https://github.com/user-attachments/assets/e7fb6677-d192-47af-b21d-69dd440199ca" />

## Dashboard
<img width="1842" height="833" alt="image" src="https://github.com/user-attachments/assets/244e1caf-37d7-4b39-8245-5e3a55aefef5" />

## Mark Attendance
<img width="1909" height="907" alt="image" src="https://github.com/user-attachments/assets/edb8c897-efed-432a-9326-546b1c0dcd71" />

## My Attendance History
<img width="1876" height="890" alt="image" src="https://github.com/user-attachments/assets/94c6fe6e-2bdb-443c-9aa2-84f4c4d596c8" />

## Profile 
<img width="1907" height="929" alt="image" src="https://github.com/user-attachments/assets/f6660947-d0f6-44f3-92bc-570ecb05a39e" />

# Manager
-------------------------------------------------------------
## Login
<img width="1910" height="974" alt="image" src="https://github.com/user-attachments/assets/fa27fecc-1ee7-4431-a2ab-ab8d6a2c7942" />

## Dashboard with Team Stats
<img width="1913" height="935" alt="image" src="https://github.com/user-attachments/assets/d65a4e34-e296-4102-b7c8-e45451696c4e" />

## AllEmployeesAttendance
<img width="1776" height="924" alt="image" src="https://github.com/user-attachments/assets/661ee919-a8c5-41db-bffa-30fa8373d56e" />

## Calender View
<img width="1851" height="1001" alt="image" src="https://github.com/user-attachments/assets/4cb00ef5-7105-417f-b08f-840b779d6c23" />


## Export Attendance Reports(CSV)
<img width="1907" height="963" alt="image" src="https://github.com/user-attachments/assets/1c37c1e8-2906-4505-81f1-226f263c64a3" />

--------------------------------------------------------------------------------------
# Additional Features Implemented

## Attendance History Page:
● Calendar view showing present/absent/late days
● Color coding: Green (Present), Red (Absent), Yellow (Late), Orange (Half
Day)
● Click on date to see details
<img width="1851" height="1001" alt="image" src="https://github.com/user-attachments/assets/4cb00ef5-7105-417f-b08f-840b779d6c23" />
● Filter by month
<img width="1816" height="921" alt="image" src="https://github.com/user-attachments/assets/5f424a4b-ac2c-4445-a15c-9ccdcb68b9ca" />
## Reports Page (Manager):
● Select date range
● Show table with attendance data
● Export to CSV button

<img width="1907" height="963" alt="image" src="https://github.com/user-attachments/assets/1c37c1e8-2906-4505-81f1-226f263c64a3" />
<img width="921" height="541" alt="image" src="https://github.com/user-attachments/assets/d4149c87-d7c2-4d81-aef8-286fdbf8d9d0" />

