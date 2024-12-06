import React from "react";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container as React.CSSProperties}>
      <h1 style={styles.heading}>403 - No Access</h1>
      <p style={styles.message}>You do not have permission to view this page.</p>
      <button style={styles.button} onClick={() => navigate('/home')}>
        Go Back to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    color: "#333",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.25rem",
    marginBottom: "1.5rem",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default NoAccess;
