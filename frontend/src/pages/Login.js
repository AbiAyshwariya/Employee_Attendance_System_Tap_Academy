import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    dispatch(login(formData));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "manager") {
        navigate("/manager/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle at top left, #1a002e, #0f0f0f 40%, #001f2f)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, sans-serif",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow background effect */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "#00f5ff",
          filter: "blur(150px)",
          opacity: 0.15,
          top: "-100px",
          left: "-100px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "#b026ff",
          filter: "blur(150px)",
          opacity: 0.15,
          bottom: "-100px",
          right: "-100px",
        }}
      />

      {/* Hero Title */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "bold",
            color: "#00f5ff",
            textShadow: "0 0 15px #00f5ff, 0 0 30px #00f5ff",
            margin: 0,
          }}
        >
          Employee Attendance System
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#b026ff",
            fontSize: "16px",
            letterSpacing: "1px",
          }}
        >
          Smart • Secure • Seamless Workforce Tracking
        </p>
      </div>

      {/* Glass Login Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          padding: "45px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          boxShadow:
            "0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(176,38,255,0.3)",
          width: "380px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#39ff14",
            textShadow: "0 0 10px #39ff14",
          }}
        >
          Welcome Back
        </h2>

        {error && (
          <p style={{ color: "#ff4d4f", marginBottom: "10px" }}>
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
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
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

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #b026ff",
              background: "#111",
              color: "white",
              outline: "none",
              boxShadow: "0 0 10px rgba(176,38,255,0.3)",
            }}
          />

          <button
            type="submit"
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
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "14px" }}>
          New User?
          <span
            onClick={() => navigate("/register")}
            style={{
              marginLeft: "6px",
              color: "#00f5ff",
              cursor: "pointer",
              textShadow: "0 0 8px #00f5ff",
              fontWeight: "bold",
            }}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
