import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { styles } from "../styles/commonStyles";

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Virheellinen käyttäjä tai salasana");
      }

      const user = await response.json();

      if (user.role === "TEACHER") {
        navigate("/teacherYears", { state: { user } });
      } else if (user.role === "STUDENT") {
        navigate("/studentCourses", { state: { user } });
      } else if (user.role === "ADMIN") {
        navigate("/adminDashboard", { state: { user } });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.app}>
      <LayoutCard
        header={<img src={logo} alt="Logo" style={styles.logo} />}
        footer={<p style={styles.alatunniste}>@Helsingin Yliopisto</p>}
      >
        <h1 style={styles.appName}>DigiDens</h1>
        <p style={styles.subtitle}>
          Helsingin Yliopiston
          <br />
          Hammaslääketieteen oppimisympäristö
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "40px",
          }}
        >
          <input
            type="text"
            placeholder="Käyttäjänimi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleLogin}>
            Kirjaudu sisään
          </button>
        </div>
      </LayoutCard>
    </div>
  );
}

export default HomePage;
