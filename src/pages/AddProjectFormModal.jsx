import React, { useState } from "react";

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
  minWidth: 420,
  maxWidth: 480,
  padding: "32px 32px 24px 32px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 12,
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

const rowStyle = {
  display: "flex",
  gap: 12,
  marginBottom: 0,
};

const inputStyle = {
  flex: 1,
  padding: "10px 10px",
  borderRadius: 7,
  border: "1px solid #ccc",
  fontSize: 13,
  marginBottom: 0,
};

const radioGroupStyle = {
  display: "flex",
  gap: 18,
  alignItems: "center",
  marginBottom: 0,
};

const radioLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  fontSize: 13,
  cursor: "pointer",
  text:"w"
};

const buttonStyle = {
  width: "100%",
  padding: "12px 0",
  borderRadius: 7,
  background: "#232946",
  color: "#fff",
  fontWeight: 600,
  fontSize: 18,
  border: "none",
  marginTop: 8,
  cursor: "pointer",
};

function AddProjectFormModal({ channel, onClose }) {
  const [form, setForm] = useState({
    projectName: "",
    senderName: "",
    senderEmail: "",
    replyTo: "",
    isClientSmtp: "Default",
    vendor: "Aws",
    senderEmailUsername: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submit logic here
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <form style={modalBoxStyle} onSubmit={handleSubmit}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close" type="button">&times;</button>
        <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Add</div>
        <div style={rowStyle}>
          <input
            style={inputStyle}
            name="projectName"
            placeholder="Project Name*"
            value={form.projectName}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            name="senderName"
            placeholder="Sender Name"
            value={form.senderName}
            onChange={handleChange}
          />
        </div>
        <div style={rowStyle}>
          <input
            style={inputStyle}
            name="senderEmail"
            placeholder="Sender Email"
            value={form.senderEmail}
            onChange={handleChange}
          />
          <input
            style={inputStyle}
            name="replyTo"
            placeholder="Reply To"
            value={form.replyTo}
            onChange={handleChange}
          />
        </div>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Is Client Smtp</div>
            <div style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="isClientSmtp"
                  value="Default"
                  checked={form.isClientSmtp === "Default"}
                  onChange={() => handleRadio("isClientSmtp", "Default")}
                />
                Default
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="isClientSmtp"
                  value="Custom"
                  checked={form.isClientSmtp === "Custom"}
                  onChange={() => handleRadio("isClientSmtp", "Custom")}
                />
                Custom
              </label>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Vendor</div>
            <div style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="vendor"
                  value="Aws"
                  checked={form.vendor === "Aws"}
                  onChange={() => handleRadio("vendor", "Aws")}
                />
                Aws
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="vendor"
                  value="Sendgrid"
                  checked={form.vendor === "Sendgrid"}
                  onChange={() => handleRadio("vendor", "Sendgrid")}
                />
                Sendgrid
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="vendor"
                  value="Mailgun"
                  checked={form.vendor === "Mailgun"}
                  onChange={() => handleRadio("vendor", "Mailgun")}
                />
                smtp
              </label>
            </div>
          </div>
        </div>

        {/* Show these fields only if Custom SMTP and AWS is selected */}
        {form.isClientSmtp === "Custom" && form.vendor === "Aws" && (
          <>
            <div style={rowStyle}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Host</div>
                <input
                  style={inputStyle}
                  name="host"
                  placeholder="Host"
                  value={form.host || ''}
                  onChange={handleChange}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Port</div>
                <input
                  style={inputStyle}
                  name="port"
                  placeholder="Port"
                  value={form.port || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={rowStyle}>
              <input
                style={inputStyle}
                name="username"
                placeholder="User Name"
                value={form.username || ''}
                onChange={handleChange}
              />
              <input
                style={inputStyle}
                name="password"
                placeholder="Password"
                type="password"
                value={form.password || ''}
                onChange={handleChange}
              />
            </div>
            <input
              style={inputStyle}
              name="customSenderEmail"
              placeholder="Enter Sender Email"
              value={form.customSenderEmail || ''}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              name="customReplyTo"
              placeholder="Reply To"
              value={form.customReplyTo || ''}
              onChange={handleChange}
            />
          </>
        )}
        {/* Show these fields only if Custom SMTP and Sendgrid is selected */}
        {form.isClientSmtp === "Custom" && form.vendor === "Sendgrid" && (
            <input
              style={inputStyle}
              name="sendgridApiKey"
              placeholder="Sendgrid API Key"
              value={form.sendgridApiKey || ''}
              onChange={handleChange}
            />
     
        )}

        {/* Show these fields only if Custom SMTP and smtp is selected */}
        {form.isClientSmtp === "Custom" && form.vendor === "Mailgun" && (
            <>
            <div style={rowStyle}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Host</div>
                <input
                  style={inputStyle}
                  name="host"
                  placeholder="Host"
                  value={form.host || ''}
                  onChange={handleChange}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Port</div>
                <input
                  style={inputStyle}
                  name="port"
                  placeholder="Port"
                  value={form.port || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={rowStyle}>
              <input
                style={inputStyle}
                name="username"
                placeholder="User Name"
                value={form.username || ''}
                onChange={handleChange}
              />
              <input
                style={inputStyle}
                name="password"
                placeholder="Password"
                type="password"
                value={form.password || ''}
                onChange={handleChange}
              />
            </div>
            <input
              style={inputStyle}
              name="customSenderEmail"
              placeholder="Enter Sender Email"
              value={form.customSenderEmail || ''}
              onChange={handleChange}
            />
            {/* <input
              style={inputStyle}
              name="customReplyTo"
              placeholder="Reply To"
              value={form.customReplyTo || ''}
              onChange={handleChange}
            /> */}
          </>
        )}

        {/* Always show this field for now */}
        <input
          style={{ ...inputStyle, marginBottom: 0 }}
          name="senderEmailUsername"
          placeholder="Sender Email Username"
          value={form.senderEmailUsername}
          onChange={handleChange}
        />
        <button style={buttonStyle} type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProjectFormModal;