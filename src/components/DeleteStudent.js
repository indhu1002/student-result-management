// src/components/DeleteStudent.js
import React, { useState } from "react";
import "./DeleteStudent.css";
import { db } from "../firebase";
import { ref, remove } from "firebase/database";

function DeleteStudent() {
  const [rollNo, setRollNo] = useState("");

  const handleDelete = () => {
    if (!rollNo.trim()) {
      alert("Please enter a Roll Number");
      return;
    }

    const studentRef = ref(db, "students/" + rollNo);
    remove(studentRef)
      .then(() => {
        alert("Student data deleted successfully");
        setRollNo("");
      })
      .catch((err) => {
        alert("Error deleting data: " + err.message);
      });
  };

  return (
    <div className="delete-student">
      <h2>Delete Student Result</h2>
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteStudent;
