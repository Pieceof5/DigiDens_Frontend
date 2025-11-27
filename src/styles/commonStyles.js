export const styles = {
  app: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "620px",
    maxWidth: "90vw",
    minHeight: "820px",
    backgroundColor: "#fff",
    borderRadius: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    padding: "30px 40px 20px 30px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#000000ff",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: "15px 40px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  footer: {
    padding: "2px 40px",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  appName: {
    fontSize: "clamp(34px, 4vw, 36px)",
    fontWeight: "700",
    margin: "10px 0",
    marginTop: "180px"
  },
  appNameMini: {
    fontSize: "clamp(16px, 2vw, 18px)",
    fontWeight: "700",
    margin: "1px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#5C5C5C",
    lineHeight: "1.2",
  },
  subtitle2: {
    fontSize: "16px",
    color: "#000",
    marginTop: "10px",
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "5px",
    marginTop: "40px",
    lineHeight: "1"
  },
  listContainer: {
    marginTop: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flexGrow: 1,
  },
  listItems: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  // Safe default for list items if referenced
  listItem: {},
  primaryButton: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "0px",
    border: "1px solid #005A94",
    backgroundColor: "#005A94",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
  backButton: {
    padding: "5px 5px",
    fontSize: "14px",
    borderRadius: "0px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    marginBottom:"15px"
  },
  button: {
    padding: "15px 20px",
    width: "100%",
    backgroundColor: "#005A94",
    color: "white",
    border: "none",
    borderRadius: "0px",
    cursor: "pointer",
    fontSize: "clamp(14px, 2.5vw, 18px)",
    fontWeight:"600"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    alignItems: "center",
    marginTop: "160px"
  },
  alatunniste: {
    fontSize: "16px",
    color: "#5C5C5C",
  },
};

// Page-specific style sets composed from base styles
export const studentFrontStyles = {
  ...styles,
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "14px",
    color: "#333",
  },
  studentInfo: {
    fontWeight: "600",
    display: "flex",
  },
  filter: {},
  hamburger: { cursor: "pointer", fontSize: "18px" },
  backButton: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "0px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    marginBottom: "10px",
  },
  navBar: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  navButton: {
    padding: "6px 12px",
    fontSize: "13px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f7f7f7",
    cursor: "pointer",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  itemButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#f0f4ff",
    border: "1px solid #d0d7ff",
    borderRadius: "8px",
    padding: "12px",
    cursor: "pointer",
  },
  courseInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseTexts:{
  display: "flex",
  flexDirection: "column",    // asettaa allekkain
  alignItems: "flex-start",   // vasen reuna
  textAlign: "left",          // varmistaa että teksti ei keskity
  gap: "4px",    
  },
  courseTextsCode:{
    marginBottom: "1px", 
    marginTop: "1px"
  },
  
  courseTextsName:{
    marginBottom: "1px", 
    marginTop: "1px"
  },
   courseTextsProgress:{
   color: "#5C5C5C"
  },
  arrow: { 
    fontSize: "20px", 
    fontWeight: "700" },

  progressBar: {
    height: "8px",
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    marginTop: "8px",
  },
  progress: { height: "8px", backgroundColor: "#005A94", borderRadius: "4px" },
  footerText: { fontSize: "16px", color: "#5C5C5C" },
};

export const teacherAddCardStyles = {
  ...styles,
  backButton: {
    padding: "5px 5px",
    fontSize: "14px",
    borderRadius: "0px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    marginBottom:"15px"
  },
  appNameMini: { fontSize: "clamp(14px, 2vw, 18px)", fontWeight: "700", margin: "1px 0" },
  subtitle: { fontSize: "14px", color: "#5C5C5C", lineHeight: "1.2" },
  subtitle2: { fontSize: "16px", color: "#000", marginTop: "10px" },
  pageTitle: { fontSize: "20px", fontWeight: "500", marginBottom: "5px", marginTop: "40px", lineHeight: "1" },
  courseNameHeader: { fontSize: "16px", fontWeight: "500", marginTop: "5px", marginBottom:"15px" },
  taskContainer: { display: "flex", flexDirection: "column", gap: "15px", flexGrow: 0, flexShrink: 0 },
  cardsContainer: { marginTop: "20px", overflowY: "auto", maxHeight: "520px", display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", boxSizing: "border-box" },
  button: { padding: "12px 20px", backgroundColor: "#005A94", color: "#fff", border: "none", borderRadius: "0px", cursor: "pointer", fontSize: "16px", fontWeight: "500", width: "100%" },
  smallButton: { padding: "8px 15px", backgroundColor: "#005A94", color: "#fff", border: "none", borderRadius: "15px", cursor: "pointer", fontSize: "14px" },
  deleteButton: { marginTop: "60px", padding: "5px 10px", backgroundColor: "#ffffffff", color: "#000", border: "1px solid #000", borderRadius: "10px", cursor: "pointer", fontSize: "14px" },
  deleteButtonSmall: { padding: "3px 6px", backgroundColor: "#fff", color: "#000", border: "1px solid #000", borderRadius: "5px", cursor: "pointer", fontSize: "12px" },
  cardItem: { border: "1px solid #ccc", padding: "15px", borderRadius: "10px", backgroundColor: "#f9f9f9", marginBottom: "20px" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  columnRow: { display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap", alignItems: "center" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  tableHeader: { border: "1px solid #ccc", padding: "5px", verticalAlign: "top", minWidth: "150px" },
  columnInput: { width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid " + "#ccc", marginBottom: "5px", boxSizing: "border-box" },
  selectInput: { padding: "4px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "5px", width: "100%", boxSizing: "border-box" },
  cellTd: { border: "1px solid #ccc", padding: "3px" },
  cellInput: { width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" },
  cellInputCheckbox: { display: "block", margin: "0 auto", width: "20px", height: "20px" },
  alatunniste: { fontSize: "16px", color: "#5C5C5C" },
};
