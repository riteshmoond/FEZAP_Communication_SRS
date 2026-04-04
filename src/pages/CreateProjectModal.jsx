import React, { useState } from "react";
import AddProjectFormModal from "./AddProjectFormModal";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.18)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalBoxStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 32px rgba(44,62,80,0.18)",
  minWidth: 340,
  maxWidth: 400,
  padding: "32px 32px 24px 32px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const closeBtnStyle = {
  position: "absolute",
  top: 16,
  right: 18,
  background: "none",
  border: "none",
  fontSize: 22,
  cursor: "pointer",
  color: "#232946",
};

const radioLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 18,
  marginBottom: 12,
  cursor: "pointer",
};

function CreateProjectModal({ onClose }) {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  // When a channel is selected, open the form modal and close this modal
  const handleSelect = (channel) => {
    setSelected(channel);
    setShowForm(true);
  };

  if (showForm && selected) {
    return <AddProjectFormModal channel={selected} onClose={onClose} />;
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalBoxStyle}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close">&times;</button>
        <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 18 }}>Create Project</div>
        <div>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="via"
              value="Mail"
              checked={selected === "Mail"}
              onChange={() => handleSelect("Mail")}
              style={{ width: 18, height: 18 }}
            />
            Mail
          </label>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="via"
              value="WhatsApp"
              checked={selected === "WhatsApp"}
              onChange={() => handleSelect("WhatsApp")}
              style={{ width: 18, height: 18 }}
            />
            WhatsApp
          </label>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;