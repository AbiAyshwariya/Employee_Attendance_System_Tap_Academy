
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

#### Auth
- POST /api/auth/register
- POST /api/auth/login

#### Employee
- POST /api/attendance/checkin
- POST /api/attendance/checkout
- GET  /api/dashboard/employee

#### Manager
- GET /api/dashboard/manager

---

### 🚀 Deployment Options

#### 🔹 Quick Preview (ngrok)
ngrok http 5000  
ngrok http 3000  

Use generated public URLs.

#### 🔹 Production Deployment
Frontend → Vercel / Netlify  
Backend → Render / Railway  

---

### 📈 Future Enhancements
- Leave Management System
- Admin Role
- Attendance Export (PDF/Excel)
- Email Notifications
- Calendar View
- CI/CD Integration

---

### 👩‍💻 Author
Name: Ayshwariya  
Role: Computer Science Engineering Student  
Specialization: MERN Stack Developer
