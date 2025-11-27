import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { opiskelijat } from "../mockData/opiskelijat";

export default function TeacherStudentListPage() {
  const navigate = useNavigate();
  const { courseName, yearId, groupId } = useParams();

  // Filter students by groupId
  const studentsInGroup = opiskelijat.filter(
    (student) => student.ryhmaId === parseInt(groupId)
  );

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <>
            <div style={styles.headerRow}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <div style={styles.topRight}>
                <span style={styles.filter}>Suodata: Kaikki</span>
                <span style={styles.hamburger}>☰</span>
              </div>
            </div>
          </>
        }
        dividerStyle={{ backgroundColor: "#00000022" }}
        contentStyle={{ padding: "15px 30px" }}
        footer={<p style={styles.footerText}>@Helsingin Yliopisto</p>}
      >
        {/* Takaisin-painike */}
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Takaisin
        </button>

        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
          {courseName}: Ryhmä {groupId} - Opiskelijat
        </h1>

        {/* Opiskelijat listana */}
        <div style={styles.itemContainer}>
          {studentsInGroup.map((student) => {
            return (
              <button
                key={student.id}
                style={styles.itemButton}
                onClick={() => alert(`Valitsit opiskelijan: ${student.etunimi} ${student.sukunimi}`)}
              >
                <div style={styles.courseInfo}>
                  <div style={{ textAlign: "left", width: "100%" }}>
                    <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 4px 0" }}>{student.opiskelijanumero}</p>
                    <h3 style={{ margin: 0 }}>{student.etunimi} {student.sukunimi}</h3>
                  </div>
                  <div style={styles.arrow}>→</div>
                </div>
              </button>
            );
          })}
        </div>
      </LayoutCard>
    </div>
  );
}
