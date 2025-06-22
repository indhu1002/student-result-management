// // src/components/StudentList.js
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { ref, onValue, remove } from "firebase/database";

// function StudentList() {
//   const [students, setStudents] = useState({});

//   useEffect(() => {
//     const dbRef = ref(db, "students/");
//     onValue(dbRef, (snapshot) => {
//       setStudents(snapshot.val() || {});
//     });
//   }, []);

//   const deleteStudent = (roll) => {
//     remove(ref(db, "students/" + roll));
//   };

//   return (
//     <div>
//       <h3>Student Records</h3>
//       {Object.entries(students).map(([roll, stu]) => (
//         <div key={roll}>
//           <p>Roll: {roll} | Name: {stu.name} | Subject: {stu.subject} | Marks: {stu.marks}</p>
//           <button onClick={() => deleteStudent(roll)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default StudentList;


// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import "./StudentList.css";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentRef = ref(db, "students/");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      const loadedStudents = [];
      for (let id in data) {
        loadedStudents.push(data[id]);
      }
      setStudents(loadedStudents);
    });
  }, []);

  return (
    <div className="student-list">
      <h2>All Students</h2>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, index) => (
            <tr key={index}>
              <td>{stu.rollNo}</td>
              <td>{stu.name}</td>
              <td>{stu.subject}</td>
              <td>{stu.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
