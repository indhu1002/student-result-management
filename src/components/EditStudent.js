// src/components/EditStudent.js
import React, { useState } from "react";
import "./EditStudent.css";
import { db } from "../firebase";
import { ref, update, get } from "firebase/database";

function EditStudent() {
  const [rollNo, setRollNo] = useState("");
  const [studentData, setStudentData] = useState({
    name: "",
    subject: "",
    marks: "",
  });

  const fetchData = () => {
    const studentRef = ref(db, "students/" + rollNo);
    get(studentRef).then((snapshot) => {
      if (snapshot.exists()) {
        setStudentData(snapshot.val());
      } else {
        alert("Student not found");
        setStudentData({ name: "", subject: "", marks: "" });
      }
    });
  };

  const handleUpdate = () => {
    update(ref(db, "students/" + rollNo), studentData)
      .then(() => {
        alert("Data updated successfully");
        setRollNo("");
        setStudentData({ name: "", subject: "", marks: "" });
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <div className="edit-student">
      <h2>Edit Student Result</h2>
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        onBlur={fetchData}
      />
      <input
        type="text"
        placeholder="Name"
        value={studentData.name}
        onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Subject"
        value={studentData.subject}
        onChange={(e) => setStudentData({ ...studentData, subject: e.target.value })}
      />
      <input
        type="number"
        placeholder="Marks"
        value={studentData.marks}
        onChange={(e) => setStudentData({ ...studentData, marks: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditStudent;
