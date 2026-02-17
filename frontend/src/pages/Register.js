import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    employeeId: "",
    department: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #1a002e, #0f0f0f 40%, #001f2f)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, sans-serif",
        color: "white",
        padding: "40px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow Effects */}
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "#00f5ff",
          filter: "blur(160px)",
          opacity: 0.15,
          top: "-120px",
          right: "-120px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "#b026ff",
          filter: "blur(160px)",
          opacity: 0.15,
          bottom: "-120px",
          left: "-120px",
        }}
      />

      {/* Title */}
      <h1
        style={{
          fontSize: "34px",
          marginBottom: "30px",
          color: "#00f5ff",
          textShadow: "0 0 15px #00f5ff, 0 0 30px #00f5ff",
        }}
      >
        Create Your Account
      </h1>

      {/* Glass Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          padding: "45px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          boxShadow:
            "0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(176,38,255,0.3)",
          width: "400px",
        }}
      >
        {error && (
          <p style={{ color: "#ff4d4f", marginBottom: "15px" }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {[
            { name: "name", placeholder: "Full Name" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "employeeId", placeholder: "Employee ID" },
            { name: "department", placeholder: "Department" },
          ].map((field, index) => (
            <input
              key={index}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #00f5ff",
                background: "#111",
                color: "white",
                outline: "none",
                boxShadow: "0 0 10px rgba(0,245,255,0.3)",
              }}
            />
          ))}

          <select
            name="role"
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #b026ff",
              background: "#111",
              color: "white",
              outline: "none",
              boxShadow: "0 0 10px rgba(176,38,255,0.3)",
            }}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(90deg, #00f5ff, #b026ff)",
              color: "black",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow:
                "0 0 20px #00f5ff, 0 0 40px #b026ff",
              transition: "0.3s ease",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Already have an account?
          <span
            onClick={() => navigate("/")}
            style={{
              marginLeft: "6px",
              color: "#39ff14",
              cursor: "pointer",
              textShadow: "0 0 8px #39ff14",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
