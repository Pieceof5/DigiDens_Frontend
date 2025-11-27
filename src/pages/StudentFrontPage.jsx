import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { studentFrontStyles as styles } from "../styles/commonStyles";

export default function StudentFrontPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Haetaan kirjautunut käyttäjä state:sta
  const user = location.state?.user;

  if (!user) {
    // Jos käyttäjää ei ole, voidaan ohjata takaisin home-sivulle
    navigate("/");
    return null;
  }

  // Kurssit käyttäjälle (mock-data voidaan vaihtaa myöhemmin API-kutsuun)
  const kurssitOppilaalle = user.courses?.sort((a, b) =>
    a.name.localeCompare(b.name)
  ) || [];

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

        {/* Kurssinavigointipalkki */}
        <div style={styles.navBar}>
          {kurssitOppilaalle.map((k) => (
            <button key={k.id} style={styles.navButton}>
              {k.name}
            </button>
          ))}
        </div>

        {/* Kurssit isona painikkeena */}
        <div style={styles.itemContainer}>
          {kurssitOppilaalle.map((k) => {
            const edistyminen = k.tehtavatYhteensa
              ? Math.floor((k.tehtavatValmiina / k.tehtavatYhteensa) * 100)
              : 0;

            return (
              <ds-card
                key={k.id}
                onClick={() => alert(`Siirryt suoritekortille: ${k.name}`)}
                ds-heading={k.courseCode || ""}
                ds-eyebrow={k.name}
                ds-url="#"
                ds-subtitle={`Edistyminen ${k.tehtavatValmiina || 0}/${
                  k.tehtavatYhteensa || 0
                }`}
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
      </LayoutCard>
    </div>
  );
}
