import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import "./Leaderboard.css";
import Certificate from "./CertificateGenerator";

const Leaderboard = () => {
  const [topStudents, setTopStudents] = useState([]);
  const [topper, setTopper] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await get(ref(db, "students"));
      if (!snapshot.exists()) return;

      const studentsData = snapshot.val();
      const ranked = Object.values(studentsData)
        .map((student) => {
          let total = 0;
          const marksField = student.marks;

          if (marksField && typeof marksField === "object") {
            total = Object.values(marksField)
              .map((m) => parseFloat(m) || 0)
              .reduce((sum, n) => sum + n, 0);
          } else {
            total = parseFloat(marksField) || 0;
          }

          return {
            name: student.name,
            rollNo: student.rollNo,
            totalMarks: total,
          };
        })
        .sort((a, b) => b.totalMarks - a.totalMarks);

      setTopStudents(ranked.slice(0, 5));
      setTopper(ranked[0]); // First student is the top performer
    };

    fetchStudents();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Top Performers Leaderboard</h2>

      {topStudents.length ? (
        <>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((s, i) => (
                <tr key={s.rollNo}>
                  <td>#{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.rollNo}</td>
                  <td>{s.totalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {topper && (
            <div className="certificate-display">
              <h3>🎖️ Certificate Awarded to Top Performer</h3>
              <Certificate studentName={topper.name} />
            </div>
          )}
        </>
      ) : (
        <p>No student data available.</p>
      )}
    </div>
  );
};

export default Leaderboard;
