// src/components/Attendance.js
import React, { useState } from "react";
import "./Attendance.css";

function Attendance() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const markPresent = () => {
    if (name.trim()) {
      setList([...list, { name, status: "Present" }]);
      setName("");
    }
  };

  return (
    <div className="attendance">
      <h2>Attendance</h2>
      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={markPresent}>Mark Present</button>
      <ul>
        {list.map((s, i) => (
          <li key={i}>{s.name} - ✅ {s.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;

