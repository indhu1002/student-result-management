// src/components/GradeReport.js
import React, { useEffect, useState } from "react";
import "./GradeReport.css";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

function GradeReport() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const studentRef = ref(db, "students/");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      const gradeList = [];

      for (let id in data) {
        const marks = parseInt(data[id].marks);
        let grade = "F";

        if (marks >= 90) grade = "A+";
        else if (marks >= 80) grade = "A";
        else if (marks >= 70) grade = "B";
        else if (marks >= 60) grade = "C";
        else if (marks >= 50) grade = "D";

        gradeList.push({
          name: data[id].name,
          subject: data[id].subject,
          marks: data[id].marks,
          grade: grade,
        });
      }
      setGrades(gradeList);
    });
  }, []);

  return (
    <div className="grade-report">
      <h2>Grade Report</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.subject}</td>
              <td>{item.marks}</td>
              <td>{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradeReport;
