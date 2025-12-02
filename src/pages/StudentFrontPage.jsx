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
        const response = await fetch(
          `http://localhost:8080/api/students/${user.id}/courses`
        );
        if (!response.ok) {
          throw new Error("Kurssien haku epäonnistui");
        }
        const data = await response.json();

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
            <div style={styles.itemContainer}>
              {kurssitOppilaalle.map((instance) => {
                const edistyminen = instance.progressPercentage ?? 0;
                const totalTasks = instance.totalTasks ?? 0;
                const completedTasks = instance.completedTasks ?? 0;

                return (
                  <ds-card
                    key={instance.courseInstanceId}
                    onClick={() =>
                      navigate(`/studentCourse/${instance.courseInstanceId}`, {
                        state: { course: instance },
                      })
                    }
                    ds-heading={`${instance.courseName} ${instance.instanceCode}`}
                    ds-eyebrow=""
                    ds-url="#"
                    ds-subtitle={
                      instance.startDate && instance.endDate
                        ? `${new Date(instance.startDate).toLocaleDateString(
                            "fi-FI"
                          )} - ${new Date(instance.endDate).toLocaleDateString(
                            "fi-FI"
                          )}`
                        : "(Päivämäärä ei määritelty)"
                    }
                    ds-tag="Kurssi"
                    ds-horizontal="false"
                  >
                    <div slot="content">
                      <div
                        style={{
                          marginLeft: "18px",
                          fontSize: "1.05em",
                          marginBottom: "8px",
                          opacity: 0.8,
                        }}
                      >
                        Edistyminen {/* Murtoluku 4/10 */} {completedTasks}/{totalTasks}
                      </div>

                      {/* Palkki + murtoluku vierekkäin  */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginLeft: "18px",
                        }}
                      >
                        {/* Palkki */}
                        <div style={styles.progressBar}>
                          <div
                            style={{
                              ...styles.progress,
                              width: `${edistyminen}%`
                            }}
                          ></div>
                        </div>

                        {/* Murtoluku 4/10 */}
                  
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
