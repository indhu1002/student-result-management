// src/components/Notifications.js
import React, { useState } from "react";
import "./Notifications.css";

function Notifications() {
  const [notices, setNotices] = useState([
    "Final exams start from July 15th.",
    "Last date to submit assignments is July 10th.",
    "Result declaration expected by August 1st.",
  ]);

  const [newNotice, setNewNotice] = useState("");

  const handleAdd = () => {
    if (newNotice.trim() !== "") {
      setNotices([newNotice, ...notices]);
      setNewNotice("");
    }
  };

  return (
    <div className="notifications">
      <h2>Notice Board</h2>
      <div className="notice-form">
        <input
          type="text"
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
          placeholder="Add new notice"
        />
        <button onClick={handleAdd}>Post</button>
      </div>
      <ul>
        {notices.map((notice, index) => (
          <li key={index}>📢 {notice}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
