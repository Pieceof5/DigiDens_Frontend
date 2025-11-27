import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";
import { styles } from "../styles/commonStyles";


function TeacherYearsPage() {
  const navigate = useNavigate();

  const getCourseCount = (yearId) => {
    return kurssit.filter((course) => course.vuosikurssiId === yearId).length;
  };

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <>
            <img src={logo} alt="Logo" style={styles.logo} />
          </>
        }
        footer={<p style={styles.alatunniste}>@Helsingin Yliopisto</p>}
      >
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Takaisin
        </button>

        <h1 style={styles.appNameMini}>DigiDens</h1>
        <p style={styles.subtitle}>Tervetuloa opettajan vuosinäkymään!</p>

        <h2 style={styles.pageTitle}>Vuosivalikko</h2>
        <p style={styles.subtitle2}>Valitse vuosi jatkaaksesi tehtävien hallintaan</p>

        <div style={styles.listContainer}>
          <ul style={styles.listItems}>
            {vuosikurssit.map((year) => (
              <li key={year.id} style={styles.listItem}>
                <button
                  style={styles.primaryButton}
                  onClick={() => navigate(`/teacherYears/${year.id}/teacherCourses`)}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {year.kausi}
                  </div>
                  <div>{year.nimi}</div>
                  <div style={{ fontWeight: "normal", fontSize: "0.9em", marginTop: "4px" }}>
                    Kurssit: {getCourseCount(year.id)}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </LayoutCard>
    </div>
  );
}

export default TeacherYearsPage;
