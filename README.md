
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

#### Attendance (Manager)
##### GET /api/attendance/all - All employees
##### GET /api/attendance/employee/:id - Specific employee
##### GET /api/attendance/summary - Team summary
##### GET /api/attendance/export - Export CSV
##### GET /api/attendance/today-status - Who's present today

#### Dashboard
##### GET /api/dashboard/employee - Employee stats
##### GET /api/dashboard/manager - Manager stats

---

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

<img width="1859" height="952" alt="image" src="https://github.com/user-attachments/assets/82dd94f9-c5ed-4a83-86ed-8f4e45685171" />
<img width="1842" height="896" alt="image" src="https://github.com/user-attachments/assets/b3ca2097-bea5-4896-b387-d4738e932571" />


