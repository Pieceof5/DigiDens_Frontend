import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { studentFrontStyles as styles } from "../styles/commonStyles";

export default function TeacherCourseInstancePage() {
  const navigate = useNavigate();
  const { teacherId, instanceId } = useParams();
  const location = useLocation();

  const [teacher, setTeacher] = useState(location.state?.teacher || null);
  const [instance, setInstance] = useState(location.state?.instance || null);
  const [loading, setLoading] = useState(!instance);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!instance) {
      const fetchInstance = async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/teachers/${teacherId}/course-instances/${instanceId}`
          );
          if (!res.ok) throw new Error("Toteutuksen haku epäonnistui");

          const data = await res.json();
          setInstance(data);

          if (!teacher && data.teacher) setTeacher(data.teacher);
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchInstance();
    }
  }, [teacherId, instanceId, instance, teacher]);

  if (loading) return <p>Dataa haetaan...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!instance) return null;

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <div style={styles.headerRow}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <div style={styles.topRight}>
              <div style={styles.studentInfo}>
                {teacher
                  ? `${teacher.firstname} ${teacher.lastname}`
                  : `Opettaja ID: ${instance.teacherId}`}
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

        <h2 style={styles.pageTitle}>
          {instance.courseName} {instance.instanceCode}
        </h2>
        <p style={styles.subtitle2}>
          {instance.startDate && instance.endDate
            ? `${new Date(instance.startDate).toLocaleDateString("fi-FI")} - ${new Date(instance.endDate).toLocaleDateString("fi-FI")}`
            : "(Päivämäärä ei määritelty)"}
        </p>
        <p style={styles.subtitle2}>Opiskelijoita: {instance.students?.length || 0}</p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            style={{
              ...styles.primaryButton,
              backgroundColor: "#005A94",
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Toteutuksen tiedot
          </button>
          <button
            style={{
              ...styles.primaryButton,
              backgroundColor: "#6c757d",
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onClick={() =>
              navigate(`/teacherCourses/${teacherId}/${instanceId}/teacherCards`, {
                state: { teacher, instance },
              })
            }
          >
            Suoritekortti
          </button>
        </div>

        {/* Lista opiskelijoista ja edistyminen 
        {/*
        <div style={{ ...styles.itemContainer, maxHeight: "500px", overflowY: "auto" }}>
          {instance.students && instance.students.length > 0 ? (
            instance.students.map((student) => {
              const completedTasks = student.completedTasks ?? 0;
              const totalTasks = student.totalTasks ?? 0;
              const progress = student.progressPercentage ?? 0;

              
              return (
                <ds-card
                  key={student.id}
                  ds-heading={`${student.firstname} ${student.lastname}`}
                  ds-eyebrow={student.studentNumber || ""}
                  ds-url="#"
                  ds-subtitle={`Tehtävät: ${completedTasks}/${totalTasks}`}
                  ds-tag="Opiskelija"
                  ds-horizontal="false"
                >
                  <div slot="content" style={{ marginLeft: "18px" }}>
                    <div
                      style={{
                        marginBottom: "8px",
                        fontSize: "1.05em",
                        opacity: 0.8,
                      }}
                    >
                      Edistyminen {completedTasks}/{totalTasks}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div style={styles.progressBar}>
                        <div
                          style={{
                            ...styles.progress,
                            width: `${progress}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </ds-card>
              );
            })
          ) : (
            <p>Ei opiskelijoita toteutuksella.</p>
          )}
        </div>
        */}

 {/* Feikkidata värikoodilla*/}
<div style={{ ...styles.itemContainer, maxHeight: "500px", overflowY: "auto" }}>
  {instance.students && instance.students.length > 0 ? (
    instance.students.map((student, index) => {
      // Fake progress: kaikille 4/10, yhdelle 2/10
      const completedTasks = index === 0 ? 2 : 4;
      const totalTasks = 10;
      const progressPercentage = (completedTasks * 100) / totalTasks;

      // Murtoluvun väri: punainen, jos vähiten tehtäviä
      const fractionStyle = {
        color: completedTasks === Math.min(...instance.students.map((_, i) => i === 0 ? 2 : 4)) ? "red" : "inherit",
      };

      return (
        <ds-card
          key={student.id}
          ds-heading={`${student.firstname} ${student.lastname}`}
          ds-eyebrow={student.studentNumber || ""}
          ds-url="#"
          ds-tag="Opiskelija"
          ds-horizontal="false"
        >
          <div slot="content" style={{ marginLeft: "18px" }}>
            <div
              style={{
                marginBottom: "8px",
                fontSize: "1.05em",
                opacity: 0.8,
              }}
            >
              Edistyminen <span style={fractionStyle}>{completedTasks}/{totalTasks}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progress,
                    width: `${progressPercentage}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </ds-card>
      );
    })
  ) : (
    <p>Ei opiskelijoita toteutuksella.</p>
  )}
</div>

{/* feikkidata
 <div style={{ ...styles.itemContainer, maxHeight: "500px", overflowY: "auto" }}>
          {instance.students && instance.students.length > 0 ? (
          instance.students.map((student, index) => {
                // Fake progress: kaikille 4/10, yhdelle 2/10
      const completedTasks = index === 0 ? 2 : 4;
      const totalTasks = 10;
      const progressPercentage = (completedTasks * 100) / totalTasks;

      return (
        <ds-card
          key={student.id}
          ds-heading={`${student.firstname} ${student.lastname}`}
          ds-eyebrow={student.studentNumber || ""}
          ds-url="#"
        //  ds-subtitle={`Tehtävät: ${completedTasks}/${totalTasks}`}
          ds-tag="Opiskelija"
          ds-horizontal="false"
        >
          <div slot="content" style={{ marginLeft: "18px" }}>
            <div
              style={{
                marginBottom: "8px",
                fontSize: "1.05em",
                opacity: 0.8,
              }}
            >
              Edistyminen {completedTasks}/{totalTasks}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progress,
                    width: `${progressPercentage}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </ds-card>
      );
    })
  ) : (
    <p>Ei opiskelijoita toteutuksella.</p>
  )}
</div>
    */}     

      </LayoutCard>
    </div> 
  );
}
