// src/components/StudentDetails.js
import React, { useState } from "react";
import "./StudentDetails.css";

function StudentDetails() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);

  const handleSearch = () => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    const found = data.find((s) => s.rollNo === rollNo);
    setStudent(found || null);
  };

  return (
    <div className="student-details">
      <h2>Student Details</h2>
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {student ? (
        <div className="result">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Subject:</strong> {student.subject}</p>
          <p><strong>Marks:</strong> {student.marks}</p>
        </div>
      ) : (
        <p>No student found</p>
      )}
    </div>
  );
}

export default StudentDetails;
