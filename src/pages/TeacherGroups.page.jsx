import React, { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { ryhmat } from "../mockData/ryhmat";
import { opiskelijat } from "../mockData/opiskelijat";

export default function TeacherGroupsPage({ teacher }) { // teacher-prop saatava ylhäältä
  const navigate = useNavigate();
  const { courseName, yearId } = useParams();
  const [activeView, setActiveView] = useState("groups"); // "groups" or "cards"

  const ryhmalistaus = ryhmat.sort((a, b) => a.nimi.localeCompare(b.nimi));

  const getStudentCount = (ryhmaId) => {
    return opiskelijat.filter((student) => student.ryhmaId === ryhmaId).length;
  };

  const kortit = []; // placeholder

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <div style={styles.headerRow}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <div style={styles.topRight}>
              <div style={styles.studentInfo}>
                {teacher.firstname} {teacher.lastname}
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

      
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            style={{
              ...styles.primaryButton,
              backgroundColor: activeView === "groups" ? "#005A94" : "#6c757d",
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onClick={() => setActiveView("groups")}
          >
            Ryhmät
          </button>
          <button
            style={{
              ...styles.primaryButton,
              backgroundColor: activeView === "cards" ? "#005A94" : "#6c757d",
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onClick={() => setActiveView("cards")}
          >
            Kortit
          </button>
        </div>

        {activeView === "groups" ? (
          <>
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
              {courseName}: Ryhmät
            </h1>

            <div style={styles.itemContainer}>
              {ryhmalistaus.map((ryhma) => {
                const studentCount = getStudentCount(ryhma.id);
                return (
                  <button
                    key={ryhma.id}
                    style={styles.itemButton}
                    onClick={() => {
                      const route = yearId
                        ? `/teacherYears/${yearId}/teacherCourses/${courseName}/group/${ryhma.id}`
                        : `/teacherCourses/${courseName}/group/${ryhma.id}`;
                      navigate(route, { state: { teacher, courseName, ryhma } });
                    }}
                  >
                    <div style={styles.courseInfo}>
                      <div>
                        <p>{ryhma.nimi}</p>
                        <p style={{ fontSize: "0.9em", color: "#666" }}>
                          {studentCount} opiskelijaa
                        </p>
                      </div>
                      <div style={styles.arrow}>→</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
              {courseName}: Kortit
            </h1>

            <div style={styles.itemContainer}>
              {kortit.length === 0 ? (
                <p>Ei vielä kortteja. Lisää uusi kortti.</p>
              ) : (
                kortit.map((kortti) => (
                  <button
                    key={kortti.id}
                    style={styles.itemButton}
                    onClick={() => alert(`Siirryt korttiin: ${kortti.nimi}`)}
                  >
                    <div style={styles.courseInfo}>
                      <div>
                        <p>{kortti.nimi}</p>
                      </div>
                      <div style={styles.arrow}>→</div>
                    </div>
                  </button>
                ))
              )}
            </div>

            <button
              style={{
                ...styles.primaryButton,
                marginTop: "20px",
                padding: "12px 24px",
                fontSize: "16px",
                width: "100%",
              }}
              onClick={() => {
                const route = yearId 
                  ? `/teacherYears/${yearId}/teacherCourses/${courseName}/teacherCards`
                  : `/teacherCourses/${courseName}/teacherCards`;
                navigate(route, { state: { teacher, courseName } });
              }}
            >
              + Luo uusi kortti
            </button>
          </>
        )}
      </LayoutCard>
    </div>
  );
}
