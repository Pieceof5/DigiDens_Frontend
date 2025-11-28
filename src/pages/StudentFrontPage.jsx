import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { studentFrontStyles as styles } from "../styles/commonStyles";

export default function StudentFrontPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.user;

  const [kurssitOppilaalle, setKurssitOppilaalle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/students/${user.id}/courses`);
        if (!response.ok) {
          throw new Error("Kurssien haku epäonnistui");
        }
        const data = await response.json();
        // Sortataan kurssit aakkosjärjestykseen
        setKurssitOppilaalle(
          data.sort((a, b) => a.courseName.localeCompare(b.courseName))
        );
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <div style={styles.headerRow}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <div style={styles.topRight}>
              <div style={styles.studentInfo}>
                {user.firstname} {user.lastname} {user.studentNumber || ""}
              </div>
              <span style={styles.filter}>Suodata: Kaikki</span>
              <span style={styles.hamburger}>☰</span>
            </div>
          </div>
        }
        dividerStyle={{ backgroundColor: "#00000022" }}
        contentStyle={{ padding: "15px 30px" }}
        footer={<p style={styles.footerText}>@Helsingin Yliopisto</p>}
      >
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Takaisin
        </button>

        {loading && <p>Kurssit latautuvat...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            {/* Kurssinavigointipalkki */}
            <div style={styles.navBar}>
              {kurssitOppilaalle.map((k) => (
                <button key={k.courseId} style={styles.navButton}>
                  {k.courseName}
                </button>
              ))}
            </div>

            {/* Kurssit isona painikkeena */}
            <div style={styles.itemContainer}>
              {kurssitOppilaalle.map((k) => {
                const edistyminen = k.progressPercentage ?? 0;
                const totalTasks = k.totalTasks ?? 0;
                const completedTasks = k.completedTasks ?? 0;

                return (
                  <ds-card
                    key={k.courseId}
                    onClick={() => alert(`Siirryt suoritekortille: ${k.courseName}`)}
                    ds-heading={String(k.courseCode || "")}
                    ds-eyebrow={String(k.courseName)}
                    ds-url="#"
                    ds-subtitle={`Edistyminen ${completedTasks}/${totalTasks}`}
                    ds-tag="Kurssi"
                    ds-horizontal="false"
                  >
                    <div slot="content">
                      <div style={styles.progressBar}>
                        <div
                          style={{
                            ...styles.progress,
                            width: `${edistyminen}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </ds-card>
                );
              })}
            </div>
          </>
        )}
      </LayoutCard>
    </div>
  );
}
