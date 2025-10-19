import type { CSSProperties } from "react";

const container: CSSProperties = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 20,
  fontFamily: "Arial, Helvetica, sans-serif",
}

const title: CSSProperties = {
  textAlign: "center",
  marginBottom: 20,
}

const list: CSSProperties = {
  listStyle: "none",
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 16,
}

const card: CSSProperties = {
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  padding: 12,
  background: "white",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
}

const cardTitle: CSSProperties = {
  fontSize: 16,
  margin: "0 0 8px 0",
}

const cardBody: CSSProperties = {
  margin: 0,
  color: "#333",
  fontSize: 14,
}

const pagination: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  marginTop: 20,
  flexWrap: "wrap",
}

const button: CSSProperties = {
  padding: "8px 12px",
  borderRadius: 4,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
}

const pageButton: CSSProperties = {
  minWidth: 36,
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #ddd",
  cursor: "pointer",
}

export default {
  container,
  title,
  list,
  card,
  cardTitle,
  cardBody,
  pagination,
  button,
  pageButton,
};
