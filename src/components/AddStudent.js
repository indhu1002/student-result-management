// src/components/AddStudent.js
import React, { useState } from "react";
import "./AddStudent.css";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

function AddStudent() {
  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    subject: "",
    marks: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.rollNo || !student.name || !student.subject || !student.marks) {
      alert("Please fill all fields");
      return;
    }

    set(ref(db, "students/" + student.rollNo), student)
      .then(() => {
        alert("Student data saved successfully!");
        setStudent({ rollNo: "", name: "", subject: "", marks: "" });
      })
      .catch((error) => {
        alert("Error saving data: " + error.message);
      });
  };

  return (
    <div className="add-student">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="Roll Number" />
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="subject" value={student.subject} onChange={handleChange} placeholder="Subject" />
        <input type="number" name="marks" value={student.marks} onChange={handleChange} placeholder="Marks" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddStudent;
