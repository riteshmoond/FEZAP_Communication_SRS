import React, { useState } from "react";
import AddProjectFormModal from "./AddProjectFormModal";

function CreateProjectModal({ onClose, onCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (channel) => {
    setSelected(channel);
    setShowForm(true);
  };

  if (showForm && selected) {
    return <AddProjectFormModal channel={selected} onClose={onClose} onCreate={onCreate} />;
  }

  return (
    <div className="fixed inset-0 bg-black/20 z-1000 flex items-center justify-center p-2 sm:p-0">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-4 sm:p-8 relative flex flex-col gap-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-xl text-gray-700 hover:text-black"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Title */}
        <div className="font-semibold text-xl mb-2">
          Create Project
        </div>
        {/* Options */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-lg cursor-pointer">
            <input
              type="radio"
              name="via"
              value="Mail"
              checked={selected === "Mail"}
              onChange={() => handleSelect("Mail")}
              className="w-5 h-5"
            />
            Mail
          </label>
          <label className="flex items-center gap-3 text-lg cursor-pointer">
            <input
              type="radio"
              name="via"
              value="WhatsApp"
              checked={selected === "WhatsApp"}
              onChange={() => handleSelect("WhatsApp")}
              className="w-5 h-5"
            />
            WhatsApp
          </label>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;
