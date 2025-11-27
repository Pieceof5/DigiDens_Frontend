import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import LayoutCard from "./LayoutCard";
import { teacherAddCardStyles as styles } from "../styles/commonStyles";

function TeacherAddCard({ courseName }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState("");
  const [savedCards, setSavedCards] = useState([]);

  // Lisää uusi kortti
  const addCard = () => {
    if (!newCardName.trim()) return;
    setCards(prev => [
      { name: newCardName, columns: [], newColumnName: "", rows: [] },
      ...prev
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

    newCards[cardIndex].columns.push({
      name: colName,
      type: "text",
      options: [],
      optionsRaw: "",
      responder: "student"
    });

    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => ({
      ...row,
      [colName]: newCards[cardIndex].columns.find(c => c.name === colName)?.type === "checkbox" ? false : ""
    }));

    newCards[cardIndex].newColumnName = "";
    setCards(newCards);
  };

  const addRow = (cardIndex) => {
    const newCards = [...cards];
    const row = {};
    newCards[cardIndex].columns.forEach(col => {
      if (col.type === "checkbox") row[col.name] = false;
      else if (col.type === "radio") row[col.name] = "";
      else row[col.name] = "";
    });
    newCards[cardIndex].rows.push(row);
    setCards(newCards);
  };

  const deleteColumn = (cardIndex, colIndex) => {
    const newCards = [...cards];
    const colName = newCards[cardIndex].columns[colIndex].name;
    newCards[cardIndex].columns.splice(colIndex, 1);
    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => {
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
    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => {
      const newRow = { ...row };
      newRow[value] = newRow[oldName];
      delete newRow[oldName];
      return newRow;
    });
    setCards(newCards);
  };

  const handleColumnTypeChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].type = value;

    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => {
      const colName = newCards[cardIndex].columns[colIndex].name;
      if (value === "checkbox") row[colName] = false;
      else if (value === "radio") row[colName] = "";
      else row[colName] = "";
      return row;
    });

    setCards(newCards);
  };

  const handleColumnOptionsChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].optionsRaw = value;
    newCards[cardIndex].columns[colIndex].options = value.split(", ");
    setCards(newCards);
  };

  const handleResponderChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].responder = value;
    setCards(newCards);
  };

  const handleCellChange = (cardIndex, rowIndex, colName, value) => {
    const newCards = [...cards];
    const column = newCards[cardIndex].columns.find(c => c.name === colName);

    // Estetään muokkaus jos responder on student
    if (column.responder === "student") return;

    newCards[cardIndex].rows[rowIndex][colName] = value;
    setCards(newCards);
  };

 const saveCard = (cardIndex) => {
  const cardToSave = JSON.parse(JSON.stringify(cards[cardIndex])); // syväkopio tallennettavaksi
  setSavedCards(prev => [...prev, cardToSave]);

  // Poistetaan kortti cards-listasta, jotta muokkauslomake katoaa
  const newCards = [...cards];
  newCards.splice(cardIndex, 1);
  setCards(newCards);
};

  return (
    <div style={styles.app}>
      <LayoutCard
        header={<img src={logo} alt="Logo" style={styles.logo} />}
        footer={<p style={styles.alatunniste}>@Helsingin Yliopisto</p>}
      >
        <button style={styles.backButton} onClick={() => navigate(-1)}>← Takaisin</button>
        <h1 style={styles.appNameMini}>DigiDens</h1>
        <p style={styles.subtitle}>
          Tervetuloa opettajan suoritekorttinäkymään! <br />
        </p>

        <h2 style={styles.pageTitle}>Suoritekortit</h2>
        {courseName && <div style={styles.courseNameHeader}>{courseName}</div>}
        <p style={styles.subtitle2}>Luo ja hallinnoi tehtäväkortteja.</p>

        <div style={styles.taskContainer}>
          <input
            type="text"
            placeholder="Uuden kortin nimi"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={addCard}>Luo uusi suoritekortti</button>
        </div>

        <div style={styles.cardsContainer}>
          {cards.map((card, ci) => (
            <div key={ci} style={styles.cardItem}>
              <div style={styles.cardHeader}>
                <h3>{card.name}</h3>
                <button style={styles.deleteButton} onClick={() => deleteCard(ci)}>Poista kortti</button>
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
                <button style={styles.smallButton} onClick={() => addColumn(ci)}>Lisää sarake</button>
                <button style={styles.smallButton} onClick={() => addRow(ci)}>Lisää rivi</button>
                <button style={styles.button} onClick={() => saveCard(ci)}>Tallenna suoritekortti</button>
              </div>

              {card.columns.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {card.columns.map((col, colIndex) => (
                          <th key={colIndex} style={{ ...styles.tableHeader, width: "200px" }}>
                            <div>Sarakkeen nimi</div>
                            <input
                              type="text"
                              value={col.name}
                              onChange={(e) => handleColumnNameChange(ci, colIndex, e.target.value)}
                              style={styles.columnInput}
                            />
                            <div>Kysymyksen tyyppi</div>
                            <select
                              value={col.type}
                              onChange={(e) => handleColumnTypeChange(ci, colIndex, e.target.value)}
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
                                  onChange={(e) => handleColumnOptionsChange(ci, colIndex, e.target.value)}
                                  style={styles.columnInput}
                                />
                              </>
                            )}
                            <div>Vastaaja</div>
                            <select
                              value={col.responder}
                              onChange={(e) => handleResponderChange(ci, colIndex, e.target.value)}
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
                                  onChange={(e) => handleCellChange(ci, ri, col.name, e.target.checked)}
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
                                        onChange={(e) => handleCellChange(ci, ri, col.name, e.target.value)}
                                      />
                                      {opt}
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={row[col.name]}
                                  onChange={(e) => handleCellChange(ci, ri, col.name, e.target.value)}
                                  style={styles.cellInput}
                                />
                              )}
                            </td>
                          ))}
                          <td>
                            <button style={styles.deleteButtonSmall} onClick={() => deleteRow(ci, ri)}>Poista</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tallennetut kortit sivun alaosassa */}
        <div style={styles.savedCardsContainer}>
          {savedCards.map((card, ci) => (
            <div key={ci} style={styles.savedCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ marginTop: "50px", marginBottom:"2px" }}>{card.name}</h3>
                <button
                  style={styles.deleteButton}
                  onClick={() => {
                    const newSaved = [...savedCards];
                    newSaved.splice(ci, 1);
                    setSavedCards(newSaved);
                  }}
                >
                  Poista <br /> kortti
                </button>
              </div>
              {card.columns.length > 0 && (
                <table style={{ ...styles.table, borderCollapse: "collapse", width: "100%" }}>
                  <thead>
                    <tr>
                      {card.columns.map((col, colIndex) => (
                        <th
                          key={colIndex}
                          style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}
                        >
                          {col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {card.rows.map((row, ri) => (
                      <tr key={ri}>
                        {card.columns.map((col, colIndex) => (
                          <td
                            key={colIndex}
                            style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}
                          >
                            {col.type === "checkbox" ? (
                              <input type="checkbox" checked={row[col.name]} disabled />
                            ) : col.type === "radio" ? (
                              col.options.map((opt, idx) => (
                                <label key={idx} style={{ display: "block" }}>
                                  <input
                                    type="radio"
                                    name={`${ci}-${ri}-${colIndex}`}
                                    value={opt}
                                    checked={row[col.name] === opt}
                                    disabled
                                  />
                                  {opt}
                                </label>
                              ))
                            ) : (
                              row[col.name]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>

      </LayoutCard>
    </div>
  );
}

export default TeacherAddCard;
