// src/components/Settings.js
import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [subjects, setSubjects] = useState(["Math", "Science", "English"]);
  const [newSubject, setNewSubject] = useState("");

  const addSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  return (
    <div className="settings">
      <h2>Subject Manager</h2>
      <div className="add-subject">
        <input
          type="text"
          value={newSubject}
          placeholder="Add new subject"
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={addSubject}>Add</button>
      </div>
      <ul>
        {subjects.map((subj, i) => (
          <li key={i}>📘 {subj}</li>
        ))}
      </ul>
    </div>
  );
}

export default Settings;
