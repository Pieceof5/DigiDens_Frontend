import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import LayoutCard from "./LayoutCard";
import { teacherAddCardStyles as styles } from "../styles/commonStyles";

function TeacherAddCard({ courseName, courseInstanceId }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState("");
  const [savedCards, setSavedCards] = useState([]);

  // --------------------------------
  // HAE TALLENNETUT KORTIT
  // --------------------------------
  const fetchSavedCards = async () => {
    if (!courseInstanceId) return;

    try {
      const res = await axios.get(
        `http://localhost:8080/api/taskCardTemplates/courseInstance/${courseInstanceId}`
      );
      if (res.data) setSavedCards(res.data);
    } catch (err) {
      console.error("Korttien haku epäonnistui:", err);
    }
  };

  useEffect(() => {
    fetchSavedCards();
  }, [courseInstanceId]);

  const addCard = () => {
    if (!newCardName.trim()) return;
    setCards((prev) => [
      {
        id: Date.now(),
        name: newCardName,
        columns: [],
        rows: [],
        newColumnName: "",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setNewCardName("");
  };

  const deleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  const addColumn = (cardIndex) => {
    const newCards = [...cards];
    const colName = newCards[cardIndex].newColumnName.trim();
    if (!colName) return;

    const newCol = {
      id: Date.now(),
      name: colName,
      type: "text",
      options: [],
      owner: "STUDENT",
      position: newCards[cardIndex].columns.length + 1,
    };

    newCards[cardIndex].columns.push(newCol);

    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => ({
      ...row,
      [colName]: "",
    }));

    newCards[cardIndex].newColumnName = "";
    setCards(newCards);
  };

  const addRow = (cardIndex) => {
    const newCards = [...cards];
    const row = { id: Date.now(), taskName: "", position: newCards[cardIndex].rows.length + 1 };

    newCards[cardIndex].columns.forEach((col) => {
      row[col.name] = col.type === "checkbox" ? false : "";
    });

    newCards[cardIndex].rows.push(row);
    setCards(newCards);
  };

  const deleteColumn = (cardIndex, colIndex) => {
    const newCards = [...cards];
    const colName = newCards[cardIndex].columns[colIndex].name;
    newCards[cardIndex].columns.splice(colIndex, 1);

    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => {
      const newRow = { ...row };
      delete newRow[colName];
      return newRow;
    });

    setCards(newCards);
  };

  const deleteRow = (cardIndex, rowIndex) => {
    const newCards = [...cards];
    newCards[cardIndex].rows.splice(rowIndex, 1);
    setCards(newCards);
  };

  const handleColumnNameChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    const oldName = newCards[cardIndex].columns[colIndex].name;

    newCards[cardIndex].columns[colIndex].name = value;

    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => {
      const updated = { ...row };
      updated[value] = updated[oldName];
      delete updated[oldName];
      return updated;
    });

    setCards(newCards);
  };

  const handleColumnTypeChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    const col = newCards[cardIndex].columns[colIndex];

    col.type = value;

    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => {
      row[col.name] = value === "checkbox" ? false : "";
      return row;
    });

    setCards(newCards);
  };

  const handleColumnOptionsChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].optionsRaw = value;
    newCards[cardIndex].columns[colIndex].options = value.split(",").map((s) => s.trim());
    setCards(newCards);
  };

  const handleResponderChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].owner =
      value === "teacher" ? "TEACHER" : "STUDENT";
    setCards(newCards);
  };

  const handleCellChange = (cardIndex, rowIndex, colName, value) => {
    const newCards = [...cards];
    const column = newCards[cardIndex].columns.find((c) => c.name === colName);
    if (column.owner === "STUDENT") return;
    newCards[cardIndex].rows[rowIndex][colName] = value;
    setCards(newCards);
  };

  // --------------------------------
  // TALLENNUS + LATAA KORTIT UUDELLEEN
  // --------------------------------
  const saveCard = async (cardIndex) => {
    const card = cards[cardIndex];

    const dto = {
      title: card.name,
      columns: card.columns.map((col) => ({
        label: col.name,
        type: col.type.toUpperCase(),
        role: col.owner.toUpperCase(),
        options: col.options || [],
      })),
      rows: card.rows.map((row, idx) => ({
        rowId: row.id || idx + 1,
        cells: card.columns.reduce((acc, col) => {
          acc[col.name] = row[col.name] !== undefined ? row[col.name] : null;
          return acc;
        }, {}),
      })),
    };

    try {
      await axios.post(
        `http://localhost:8080/api/taskCardTemplates/createForCourseInstance/${courseInstanceId}`,
        dto
      );

      // 🔥 hae päivitetyt kortit
      await fetchSavedCards();

      // poista local card
      const newCards = [...cards];
      newCards.splice(cardIndex, 1);
      setCards(newCards);
    } catch (err) {
      console.error("Kortin tallennus epäonnistui:", err);
    }
  };

  return (
    <div style={styles.app}>
      <LayoutCard
        header={<img src={logo} alt="Logo" style={styles.logo} />}
        footer={<p style={styles.alatunniste}>@Helsingin Yliopisto</p>}
      >
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Takaisin
        </button>

        <h1 style={styles.appNameMini}>DigiDens</h1>
        <p style={styles.subtitle}>Tervetuloa opettajan suoritekorttinäkymään!</p>

        <h2 style={styles.pageTitle}>Suoritekortit</h2>
        {courseName && <div style={styles.courseNameHeader}>{courseName}</div>}
        <p style={styles.subtitle2}>Luo ja hallinnoi tehtäväkortteja.</p>

        {/* Uuden kortin luonti */}
        <div style={styles.taskContainer}>
          <input
            type="text"
            placeholder="Uuden kortin nimi"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={addCard}>
            Luo uusi suoritekortti
          </button>
        </div>

        <div style={styles.cardsContainer}>
          {cards.map((card, ci) => (
            <div key={ci} style={styles.cardItem}>
              <div style={styles.cardHeader}>
                <h3>{card.name}</h3>
                <button style={styles.deleteButton} onClick={() => deleteCard(ci)}>
                  Poista kortti
                </button>
              </div>

              <div style={styles.columnRow}>
                <input
                  type="text"
                  placeholder="Uuden sarakkeen nimi"
                  value={card.newColumnName || ""}
                  onChange={(e) => {
                    const newCards = [...cards];
                    newCards[ci].newColumnName = e.target.value;
                    setCards(newCards);
                  }}
                  style={styles.input}
                />
                <button style={styles.smallButton} onClick={() => addColumn(ci)}>
                  Lisää sarake
                </button>
                <button style={styles.smallButton} onClick={() => addRow(ci)}>
                  Lisää rivi
                </button>
              </div>

              {/* Taulukko - scrollattava */}
              {card.columns.length > 0 && (
                <div style={{ overflowX: "auto", paddingBottom: "10px" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {card.columns.map((col, colIndex) => (
                          <th key={colIndex} style={{ ...styles.tableHeader, width: "200px" }}>
                            <div>Sarakkeen nimi</div>
                            <input
                              type="text"
                              value={col.name}
                              onChange={(e) =>
                                handleColumnNameChange(ci, colIndex, e.target.value)
                              }
                              style={styles.columnInput}
                            />
                            <div>Kysymyksen tyyppi</div>
                            <select
                              value={col.type}
                              onChange={(e) =>
                                handleColumnTypeChange(ci, colIndex, e.target.value)
                              }
                              style={styles.selectInput}
                            >
                              <option value="text">Teksti</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="radio">Radio</option>
                            </select>
                            {col.type === "radio" && (
                              <>
                                <div>Vastausvaihtoehdot</div>
                                <input
                                  type="text"
                                  placeholder="Pilkuilla erotettuna"
                                  value={col.optionsRaw ?? ""}
                                  onChange={(e) =>
                                    handleColumnOptionsChange(ci, colIndex, e.target.value)
                                  }
                                  style={styles.columnInput}
                                />
                              </>
                            )}
                            <div>Vastaaja</div>
                            <select
                              value={col.owner === "TEACHER" ? "teacher" : "student"}
                              onChange={(e) =>
                                handleResponderChange(ci, colIndex, e.target.value)
                              }
                              style={styles.selectInput}
                            >
                              <option value="teacher">Opettaja</option>
                              <option value="student">Oppilas</option>
                            </select>
                          </th>
                        ))}
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {card.rows.map((row, ri) => (
                        <tr key={ri}>
                          {card.columns.map((col, colIndex) => (
                            <td key={colIndex} style={{ ...styles.cellTd, width: "200px" }}>
                              {col.type === "checkbox" ? (
                                <input
                                  type="checkbox"
                                  checked={row[col.name]}
                                  onChange={(e) =>
                                    handleCellChange(ci, ri, col.name, e.target.checked)
                                  }
                                  style={styles.cellInputCheckbox}
                                />
                              ) : col.type === "radio" ? (
                                <div>
                                  {col.options?.map((opt, idx) => (
                                    <label key={idx} style={{ display: "block" }}>
                                      <input
                                        type="radio"
                                        name={`${ci}-${ri}-${colIndex}`}
                                        value={opt}
                                        checked={row[col.name] === opt}
                                        onChange={(e) =>
                                          handleCellChange(ci, ri, col.name, e.target.value)
                                        }
                                      />
                                      {opt}
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={row[col.name]}
                                  onChange={(e) =>
                                    handleCellChange(ci, ri, col.name, e.target.value)
                                  }
                                  style={styles.cellInput}
                                />
                              )}
                            </td>
                          ))}
                          <td>
                            <button
                              style={styles.deleteButtonSmall}
                              onClick={() => deleteRow(ci, ri)}
                            >
                              Poista
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button style={styles.button} onClick={() => saveCard(ci)}>
                Tallenna suoritekortti
              </button>
            </div>
          ))}



        {/* ------------------------ */}
{/* TALLENNETUT KORTIT */}
{/* ------------------------ */}
<h2 style={{ marginTop: "40px" }}>Tallennetut suoritekortit</h2>

{savedCards.map((card, ci) => (
  <div key={ci} style={styles.cardItem}>
    <h3>{card.title}</h3>

    {card.columns.length > 0 && (
      <div style={{ overflowX: "auto", paddingBottom: "10px" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {card.columns.map((col, colIndex) => (
                <th key={colIndex} style={{ ...styles.tableHeader, width: "200px" }}>
                  {col.label} ({col.type})
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {card.rows.map((row, ri) => (
              <tr key={ri}>
                {card.columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ ...styles.cellTd, width: "200px" }}>
                    {/* Näytä soluarvo */}
                    {row.cells[col.label]}
                    
                    {/* Jos radio/monivalinta, näytä vaihtoehdot listana */}
                    {(col.type === "RADIO" || col.type === "MULTIPLE_CHOICE") && col.options?.length > 0 && (
                      <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                        {col.options.map((opt, idx) => (
                          <li key={idx}>{opt}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
))}

        </div>
      </LayoutCard>
    </div>
  );
}

export default TeacherAddCard;
