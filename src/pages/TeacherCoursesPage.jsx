import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { kurssit } from "../mockData/kurssit";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { styles } from "../styles/commonStyles";


// Kurssivalikko (/teacherCourses)
function TeacherCoursesPage() {
  const navigate = useNavigate();
  const { yearId } = useParams();

  // Filter courses by year if yearId is provided
  const filteredCourses = yearId
    ? kurssit.filter((course) => course.vuosikurssiId === parseInt(yearId))
    : kurssit;

  // Get year name for display
  const year = vuosikurssit.find((y) => y.id === parseInt(yearId));

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
        <p style={styles.subtitle}>Tervetuloa opettajan kurssinäkymään!</p>

        <h2 style={styles.pageTitle}>Kurssivalikko</h2>
        {year && <p style={styles.subtitle2}>{year.nimi}</p>}
        <p style={styles.subtitle2}>Valitse kurssi jatkaaksesi tehtävien hallintaan</p>

        <div style={styles.listContainer}>
          <ul style={styles.listItems}>
            {filteredCourses.map((course) => (
              <li key={course.id} style={styles.listItem}>
                <button
                  style={styles.primaryButton}
                  onClick={() => {
                    const path = yearId
                      ? `/teacherYears/${yearId}/teacherCourses/${course.kurssitunnus}`
                      : `/teacherCourses/${course.kurssitunnus}`;
                    navigate(path);
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {course.kurssitunnus}
                  </div>
                  <div>{course.nimi}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </LayoutCard>
    </div>
  );
}

export default TeacherCoursesPage;
