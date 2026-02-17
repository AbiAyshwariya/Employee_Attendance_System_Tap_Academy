import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
    };

    fetchProfile();
  }, []);

  if (!user)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0f0f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#00f5ff",
          fontFamily: "Segoe UI, sans-serif",
          textShadow: "0 0 10px #00f5ff",
        }}
      >
        Loading Profile...
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #14001f, #0f0f0f 50%, #001a26)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "rgba(255,255,255,0.06)",
          padding: "40px",
          borderRadius: "25px",
          backdropFilter: "blur(15px)",
          boxShadow:
            "0 0 40px rgba(0,245,255,0.3), 0 0 60px rgba(176,38,255,0.3)",
          textAlign: "center",
        }}
      >
        {/* Neon Avatar Circle */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            margin: "0 auto 25px auto",
            background: "linear-gradient(135deg,#00f5ff,#b026ff)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px",
            fontWeight: "bold",
            color: "black",
            boxShadow:
              "0 0 25px #00f5ff, 0 0 40px #b026ff",
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h2
          style={{
            marginBottom: "25px",
            color: "#00f5ff",
            textShadow: "0 0 12px #00f5ff",
          }}
        >
          My Profile
        </h2>

        <div style={{ textAlign: "left", lineHeight: "2" }}>
          <p>
            <strong style={{ color: "#39ff14" }}>Name:</strong> {user.name}
          </p>

          <p>
            <strong style={{ color: "#39ff14" }}>Email:</strong> {user.email}
          </p>

          <p>
            <strong style={{ color: "#39ff14" }}>Department:</strong>{" "}
            {user.department}
          </p>

          <p>
            <strong style={{ color: "#39ff14" }}>Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
