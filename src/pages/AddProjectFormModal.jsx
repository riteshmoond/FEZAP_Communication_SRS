import React, { useState } from "react";

function AddProjectFormModal({  onClose }) {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-1000 p-2 sm:p-0">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl relative flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-4 sm:p-8"
        >
          {/* Close */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-xl text-gray-700"
          >
            &times;
          </button>
          <div className="font-semibold text-xl mb-2">Add</div>
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              name="projectName"
              placeholder="Project Name*"
              value={form.projectName}
              onChange={handleChange}
              required
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
            <input
              name="senderName"
              placeholder="Sender Name"
              value={form.senderName}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
          </div>
          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              name="senderEmail"
              placeholder="Sender Email"
              value={form.senderEmail}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
            <input
              name="replyTo"
              placeholder="Reply To"
              value={form.replyTo}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
          </div>
          {/* Radio Groups */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* SMTP */}
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">Is Client Smtp</div>
              <div className="flex gap-4 text-sm flex-col sm:flex-row">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={form.isClientSmtp === "Default"}
                    onChange={() => handleRadio("isClientSmtp", "Default")}
                  />
                  Default
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={form.isClientSmtp === "Custom"}
                    onChange={() => handleRadio("isClientSmtp", "Custom")}
                  />
                  Custom
                </label>
              </div>
            </div>
            {/* Vendor */}
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">Vendor</div>
              <div className="flex gap-3 text-sm flex-col sm:flex-row">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={form.vendor === "Aws"}
                    onChange={() => handleRadio("vendor", "Aws")}
                  />
                  Aws
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={form.vendor === "Sendgrid"}
                    onChange={() => handleRadio("vendor", "Sendgrid")}
                  />
                  Sendgrid
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={form.vendor === "Mailgun"}
                    onChange={() => handleRadio("vendor", "Mailgun")}
                  />
                  smtp
                </label>
              </div>
            </div>
          </div>
          {/* AWS Custom */}
          {form.isClientSmtp === "Custom" && form.vendor === "Aws" && (
            <>
              <div className="flex flex-col sm:flex-row gap-3">
                <input name="host" placeholder="Host" value={form.host || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
                <input name="port" placeholder="Port" value={form.port || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input name="username" placeholder="User Name" value={form.username || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
                <input name="password" type="password" placeholder="Password" value={form.password || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
              </div>
              <input name="customSenderEmail" placeholder="Enter Sender Email" value={form.customSenderEmail || ''} onChange={handleChange} className="px-3 py-2 border rounded-md text-sm" />
              <input name="customReplyTo" placeholder="Reply To" value={form.customReplyTo || ''} onChange={handleChange} className="px-3 py-2 border rounded-md text-sm" />
            </>
          )}
          {/* Sendgrid */}
          {form.isClientSmtp === "Custom" && form.vendor === "Sendgrid" && (
            <input
              name="sendgridApiKey"
              placeholder="Sendgrid API Key"
              value={form.sendgridApiKey || ''}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            />
          )}
          {/* Mailgun */}
          {form.isClientSmtp === "Custom" && form.vendor === "Mailgun" && (
            <>
              <div className="flex flex-col sm:flex-row gap-3">
                <input name="host" placeholder="Host" value={form.host || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
                <input name="port" placeholder="Port" value={form.port || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input name="username" placeholder="User Name" value={form.username || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
                <input name="password" type="password" placeholder="Password" value={form.password || ''} onChange={handleChange} className="flex-1 px-3 py-2 border rounded-md text-sm" />
              </div>
              <input name="customSenderEmail" placeholder="Enter Sender Email" value={form.customSenderEmail || ''} onChange={handleChange} className="px-3 py-2 border rounded-md text-sm" />
            </>
          )}
          {/* Username */}
          <input
            name="senderEmailUsername"
            placeholder="Sender Email Username"
            value={form.senderEmailUsername}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm"
          />
          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#232946] text-white rounded-md font-semibold mt-2"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectFormModal;