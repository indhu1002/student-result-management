// src/components/StudentDetails.js
import React, { useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import "./StudentDetails.css";

export default function StudentDetails() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setStudent(null);

    if (!rollNo.trim()) {
      setError("Please enter a roll number.");
      return;
    }

    try {
      const snapshot = await get(ref(db, `students/${rollNo}`));
      if (snapshot.exists()) {
        setStudent(snapshot.val());
      } else {
        setError(`No student found with roll no. ${rollNo}`);
      }
    } catch (err) {
      setError("Error fetching data: " + err.message);
    }
  };

  return (
    <div className="student-details">
      <h2>🔍 Student Details</h2>

      <div className="search-row">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {student && (
        <div className="details-card">
          <p><strong>Roll No:</strong> {rollNo}</p>
          <p><strong>Name:</strong> {student.name}</p>
          {student.subject && (
            <p><strong>Subject:</strong> {student.subject}</p>
          )}
          {/* If marks stored as object of subjects */}
          {student.marks && typeof student.marks === "object" ? (
            <div className="marks-list">
              <strong>Marks:</strong>
              <ul>
                {Object.entries(student.marks).map(([subj, m]) => (
                  <li key={subj}>
                    {subj}: {m}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            student.marks != null && (
              <p><strong>Marks:</strong> {student.marks}</p>
            )
          )}
        </div>
      )}
    </div>
  );
}
