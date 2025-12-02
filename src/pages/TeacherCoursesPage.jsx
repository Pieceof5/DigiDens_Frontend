import React, { useState, useEffect } from "react"; 
// React ja hookit: useState hallitsee komponentin tilaa, useEffect suorittaa koodin komponentin elinkaaren aikana

import { useNavigate, useParams } from "react-router-dom"; 
// useNavigate: ohjelmallinen navigointi React Routerissa
// useParams: lukee parametrin URL-osoitteesta (tässä teacherId)

import LayoutCard from "../components/LayoutCard"; 
// Oma komponentti, joka näyttää kortin tyylikkäästi

import logo from "../assets/logo.png"; 
// Logo, joka näytetään yläkulmassa

import { studentFrontStyles as styles } from "../styles/commonStyles"; 
// Yhteiset tyylit (CSS-in-JS)

function TeacherCoursesPage() {
  const navigate = useNavigate(); 
  // navigate-funktio mahdollistaa sivujen vaihtamisen koodin kautta
  const { teacherId } = useParams(); 
  // teacherId haetaan URL-osoitteesta, esim. /teachers/1/course-instances

  // State-muuttujat
  const [teacher, setTeacher] = useState(null); 
  // Tallentaa opettajan tiedot ja kurssitoteutukset
  const [loading, setLoading] = useState(true); 
  // Hallitsee latausanimaation / "Dataa haetaan..." -viestiä
  const [error, setError] = useState(null); 
  // Tallentaa mahdollisen virheen

  // useEffect suoritetaan, kun komponentti renderöidään ensimmäisen kerran
  // ja aina, kun teacherId muuttuu
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        // Haetaan backendistä opettajan kurssitoteutukset
        const res = await fetch(`http://localhost:8080/api/teachers/${teacherId}/course-instances`);

        // Jos backend ei vastaa 200 OK, heitetään poikkeus
        if (!res.ok) throw new Error("Opettajan tietojen haku epäonnistui");

        // Parsitaan JSON-data
        const data = await res.json();

        // Jos dataa ei löydy tai kurssitoteutuksia ei ole, heitetään virhe
        if (!data || !data.courseInstances) {
          throw new Error("Kurssitoteutuksia ei löytynyt opettajalle");
        }

        // Tallennetaan data stateen
        setTeacher(data);
      } catch (err) {
        // Tulostetaan konsoliin virhe ja asetetaan error stateen
        console.error(err);
        setError(err.message);
      } finally {
        // Lataus valmis, piilotetaan latausviesti
        setLoading(false);
      }
    };

    fetchTeacher(); 
    // Suoritetaan fetchTeacher-funktio asynkronisesti
  }, [teacherId]); 
  // Riippuvuuslista: effect suoritetaan uudelleen, jos teacherId muuttuu

  // Latausviesti
  if (loading) return <p>Dataa haetaan...</p>;

  // Virheviesti
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Jos ei löydy opettajaa, ei renderöidä mitään
  if (!teacher) return null;

  return (
    <div style={styles.app}>
      {/* LayoutCard komponentti sisältää headerin, contentin ja footerin */}
      <LayoutCard
        header={
          <div style={styles.headerRow}>
            {/* Logo vasemmassa reunassa */}
            <img src={logo} alt="Logo" style={styles.logo} />
            <div style={styles.topRight}>
              {/* Opettajan nimi yläkulmassa */}
              <div style={styles.studentInfo}>
                {teacher.firstname} {teacher.lastname}
              </div>
              {/* Suodatus ja hamburger-valikko (ei vielä toiminnallisia) */}
              <span style={styles.filter}>Suodata: Kaikki</span>
              <span style={styles.hamburger}>☰</span>
            </div>
          </div>
        }
        dividerStyle={{ backgroundColor: "#00000022" }} 
        // Dividerin väri (LayoutCardin sisällä)
        contentStyle={{ padding: "15px 30px" }} 
        // Sisällön padding
        footer={<p style={styles.footerText}>@Helsingin Yliopisto</p>} 
        // Footer
      >
        {/* Takaisin-nappi */}
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Takaisin
        </button>

        {/* Sivun otsikko */}
        <h2 style={styles.pageTitle}>Opettajan kurssitoteutukset</h2>
        <p style={styles.subtitle2}>Valitse toteutus jatkaaksesi tehtävien hallintaan</p>

        {/* Lista kurssitoteutuksista */}
        <div style={styles.listContainer}>
          <ul style={styles.listItems}>
            {/* Jos opettajalla ei ole kurssitoteutuksia, näytetään viesti */}
            {teacher.courseInstances.length === 0 && (
              <p>Opettajalla ei ole kurssitoteutuksia.</p>
            )}

            {/* Käydään kaikki kurssitoteutukset läpi */}
            {teacher.courseInstances.map((instance) => (
              <li key={instance.instanceId} style={styles.listItem}>
                <button
                  style={styles.primaryButton}
                  onClick={() =>
                    // Navigoidaan yksittäisen kurssitoteutuksen sivulle
                    navigate(
                      `/teacherCourses/${teacherId}/${instance.instanceId}`,
                      { state: { teacher, instance } } 
                      // Viedään tilaa seuraavalle sivulle, ei tarvitse hakea uudelleen backendistä
                    )
                  }
                >

                        {/* Kurssin nimi ja toteutuskoodi */}
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {instance.courseName} {instance.instanceCode} 
                  </div>

                  {/* Kurssin aikaväli suomalaiseen muotoon */}
                  <div style={{ fontSize: "0.9em", marginTop: "4px", opacity: 0.8 }}>
                    {instance.startDate && instance.endDate
                      ? `${new Date(instance.startDate).toLocaleDateString('fi-FI')} - ${new Date(instance.endDate).toLocaleDateString('fi-FI')}`
                      : '(Päivämäärä ei määritelty)'}
                  </div>

                  {/* Opiskelijoiden määrä */}
                  <div style={{ fontSize: "0.9em", marginTop: "4px", opacity: 0.8 }}>
                    Opiskelijoita: {instance.students ? instance.students.length : 0}
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

export default TeacherCoursesPage;
