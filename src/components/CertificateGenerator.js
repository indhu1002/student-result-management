import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import "./CertificateGenerator.css";

export default function CertificateGenerator() {
  const [topStudent, setTopStudent] = useState(null);

  // 1. Load students and find top performer
  useEffect(() => {
    const studentsRef = ref(db, "students/");
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setTopStudent(null);
        return;
      }
      // Convert to array and find max
      const arr = Object.values(data);
      let best = arr[0];
      arr.forEach((s) => {
        if (parseInt(s.marks) > parseInt(best.marks)) best = s;
      });
      setTopStudent(best);
    });
  }, []);

  const handleDownload = () => {
    if (!topStudent) {
      alert("No student data available to generate certificate.");
      return;
    }

    const { name, marks, rollNo } = topStudent;
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [600, 400],
    });

    // Blue border
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(6);
    doc.rect(20, 20, 560, 360);

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("Certificate of Achievement", 300, 100, null, null, "center");

    // Subtitle
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text("This is to proudly certify that", 300, 140, null, null, "center");

    // Top student name
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text(name.toUpperCase(), 300, 175, null, null, "center");

    // Description
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(
      `Roll No: ${rollNo}, achieved the highest score of ${marks} marks.`,
      300,
      205,
      null,
      null,
      "center"
    );

    // Footer: Date and Signature label
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${today}`, 80, 330);

    // Signature label and name
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Signature:", 420, 330);

    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0);
    doc.text("D. Indhu", 495, 330);

    doc.save("Top-Student-Certificate.pdf");
  };

  return (
    <div className="certificate-container">
      <h2>🎓 Top Performer Certificate</h2>
      {topStudent ? (
        <p>
          Awarding certificate to <strong>{topStudent.name}</strong> ({topStudent.rollNo}) —{" "}
          <strong>{topStudent.marks} marks</strong>
        </p>
      ) : (
        <p>No student data available.</p>
      )}
      <button onClick={handleDownload} disabled={!topStudent}>
        Download Certificate
      </button>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import { db } from "../firebase";
// import { ref, onValue } from "firebase/database";
// import "./CertificateGenerator.css";

// export default function CertificateGenerator() {
//   const [topStudent, setTopStudent] = useState(null);

//   useEffect(() => {
//     const studentsRef = ref(db, "students/");
//     onValue(studentsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) {
//         setTopStudent(null);
//         return;
//       }

//       const arr = Object.values(data);
//       let best = arr[0];
//       arr.forEach((s) => {
//         const totalMarks = typeof s.marks === "object"
//           ? Object.values(s.marks).reduce((a, b) => a + parseFloat(b || 0), 0)
//           : parseFloat(s.marks || 0);
//         const bestMarks = typeof best.marks === "object"
//           ? Object.values(best.marks).reduce((a, b) => a + parseFloat(b || 0), 0)
//           : parseFloat(best.marks || 0);
//         if (totalMarks > bestMarks) best = s;
//       });
//       setTopStudent(best);
//     });
//   }, []);

//   const handleDownload = () => {
//     if (!topStudent) {
//       alert("No student data available.");
//       return;
//     }

//     const { name, marks, rollNo } = topStudent;
//     const totalMarks = typeof marks === "object"
//       ? Object.values(marks).reduce((a, b) => a + parseFloat(b || 0), 0)
//       : parseFloat(marks || 0);

//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [600, 400],
//     });

//     // Blue Side Border Design
//     doc.setFillColor(0, 102, 204); // blue
//     doc.rect(20, 20, 15, 360, "F"); // Left vertical border
//     doc.rect(565, 20, 15, 360, "F"); // Right vertical border

//     // Title
//     doc.setFont("times", "bold");
//     doc.setFontSize(28);
//     doc.setTextColor(0, 0, 0);
//     doc.text("🏅 Certificate of Excellence", 300, 90, null, null, "center");

//     // Subtitle
//     doc.setFont("times", "italic");
//     doc.setFontSize(16);
//     doc.text("This certificate is proudly presented to", 300, 130, null, null, "center");

//     // Student name
//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.text(name.toUpperCase(), 300, 165, null, null, "center");

//     // Description
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.text(
//       `For outstanding academic performance with a total score of ${totalMarks} marks (Roll No: ${rollNo}).`,
//       300,
//       200,
//       null,
//       null,
//       "center"
//     );

//     // Date
//     const today = new Date().toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });

//     doc.setFont("times", "italic");
//     doc.setFontSize(14);
//     doc.text(`Date: ${today}`, 80, 330);

//     // Signature Label
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text("Signature:", 420, 330);

//     // Signature Name - D. Indhu in green cursive
//     doc.setFont("courier", "italic");
//     doc.setFontSize(18);
//     doc.setTextColor(0, 128, 0); // green
//     doc.text("D. Indhu", 510, 330);

//     doc.save("Top-Performer-Certificate.pdf");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>🎓 Top Performer Certificate</h2>
//       {topStudent ? (
//         <p>
//           Certificate awarded to <strong>{topStudent.name}</strong> ({topStudent.rollNo}) with{" "}
//           <strong>
//             {typeof topStudent.marks === "object"
//               ? Object.values(topStudent.marks).reduce((a, b) => a + parseFloat(b || 0), 0)
//               : topStudent.marks}{" "}
//             marks
//           </strong>
//         </p>
//       ) : (
//         <p>No top performer found.</p>
//       )}
//       <button onClick={handleDownload} disabled={!topStudent}>
//         Download Certificate
//       </button>
//     </div>
//   );
// }



// src/components/CertificateGenerator.js
// import React, { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import { db } from "../firebase";
// import { ref, onValue } from "firebase/database";
// import "./CertificateGenerator.css";

// export default function CertificateGenerator() {
//   const [topStudent, setTopStudent] = useState(null);

//   useEffect(() => {
//     const studentsRef = ref(db, "students/");
//     onValue(studentsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) {
//         setTopStudent(null);
//         return;
//       }
//       const arr = Object.values(data);
//       let best = arr[0];
//       arr.forEach((s) => {
//         if (parseFloat(s.marks) > parseFloat(best.marks)) best = s;
//       });
//       setTopStudent(best);
//     });
//   }, []);

//   const handleDownload = () => {
//     if (!topStudent) {
//       alert("No student data available to generate certificate.");
//       return;
//     }

//     const { name, marks, rollNo } = topStudent;
//     const doc = new jsPDF({ orientation: "landscape", unit: "px", format: [600, 400] });

//     // Side border style (right)
//     doc.setFillColor(0, 51, 102); // Dark Blue
//     doc.rect(580, 0, 20, 400, "F");
//     doc.setFillColor(255, 204, 0); // Gold trim
//     doc.rect(570, 0, 10, 400, "F");

//     // Title
//     doc.setTextColor(0, 51, 102); // Navy Blue
//     doc.setFont("times", "bold");
//     doc.setFontSize(32);
//     doc.text("Certificate", 300, 80, null, null, "center");
//     doc.text("Of Achievement", 300, 115, null, null, "center");

//     // Subtitle
//     doc.setFont("times", "italic");
//     doc.setFontSize(16);
//     doc.setTextColor(0);
//     doc.text("This certificate is awarded to", 300, 150, null, null, "center");

//     // Student name
//     doc.setFont("times", "bolditalic");
//     doc.setFontSize(28);
//     doc.setTextColor(218, 165, 32); // Golden text
//     doc.text(name, 300, 185, null, null, "center");

//     // Achievement text
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.setTextColor(0);
//     doc.text(
//       `For outstanding academic performance with a total score of `,
//       60,
//       225
//     );
//     doc.setFont("times", "bold");
//     doc.text(`${marks} marks`, 385, 225);
//     doc.setFont("times", "normal");
//     doc.text(`(Roll No: ${rollNo}).`, 455, 225);

//     // Footer date
//     const today = new Date().toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//     doc.setFont("times", "italic");
//     doc.setTextColor(0);
//     doc.setFontSize(14);
//     doc.text(`Date: ${today}`, 50, 350);

//     // Signature
//     doc.setFont("times", "normal");
//     doc.text("Signature:", 430, 350);
//     doc.setFont("times", "italic");
//     doc.setTextColor(0, 128, 0); // Green color
//     doc.setFontSize(16);
//     doc.text("D. Indhu", 510, 350);

//     doc.save("Top-Student-Certificate.pdf");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>🎓 Top Performer Certificate</h2>
//       {topStudent ? (
//         <p>
//           Awarding certificate to <strong>{topStudent.name}</strong> ({topStudent.rollNo}) — {" "}
//           <strong>{topStudent.marks} marks</strong>
//         </p>
//       ) : (
//         <p>No student data available.</p>
//       )}
//       <button onClick={handleDownload} disabled={!topStudent}>
//         Download Certificate
//       </button>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import { db } from "../firebase";
// import { ref, onValue } from "firebase/database";
// import "./CertificateGenerator.css";

// export default function CertificateGenerator() {
//   const [topStudent, setTopStudent] = useState(null);

//   useEffect(() => {
//     const studentsRef = ref(db, "students/");
//     onValue(studentsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) {
//         setTopStudent(null);
//         return;
//       }
//       const arr = Object.values(data);
//       let best = arr[0];
//       arr.forEach((s) => {
//         if (parseInt(s.marks) > parseInt(best.marks)) best = s;
//       });
//       setTopStudent(best);
//     });
//   }, []);

//   const handleDownload = () => {
//     if (!topStudent) {
//       alert("No student data available to generate certificate.");
//       return;
//     }

//     const { name, marks, rollNo } = topStudent;
//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [600, 400],
//     });

//     // Left and right decorative borders
//     doc.setFillColor(0, 38, 84); // Dark blue
//     doc.rect(20, 20, 20, 360, "F");
//     doc.rect(560, 20, 20, 360, "F");

//     // Title
//     doc.setFont("times", "bold");
//     doc.setFontSize(28);
//     doc.setTextColor(10, 38, 84);
//     doc.text("Certificate", 300, 80, null, null, "center");
//     doc.text("Of Achievement", 300, 110, null, null, "center");

//     // Subtitle
//     doc.setFont("times", "italic");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text("This certificate is awarded to", 300, 145, null, null, "center");

//     // Top student name
//     doc.setFont("times", "bolditalic");
//     doc.setFontSize(26);
//     doc.setTextColor(218, 165, 32); // golden yellow
//     doc.text(name, 300, 180, null, null, "center");

//     // Achievement text
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text(
//       `For outstanding academic performance with a total score of `,
//       300,
//       215,
//       null,
//       null,
//       "center"
//     );
//     doc.setFont("times", "bold");
//     doc.text(`${marks} marks`, 300, 235, null, null, "center");

//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.text(`(Roll No: ${rollNo})`, 300, 255, null, null, "center");

//     // Footer
//     const today = new Date().toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });

//     doc.setFont("times", "italic");
//     doc.setFontSize(14);
//     doc.text(`Date: ${today}`, 60, 330);

//     doc.setFont("times", "normal");
//     doc.text("Signature:", 440, 330);
//     doc.setFont("times", "italic");
//     doc.setTextColor(0, 128, 0); // Green color
//     doc.text("D. Indhu", 510, 330);

//     doc.save("Top-Student-Certificate.pdf");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>🎓 Top Performer Certificate</h2>
//       {topStudent ? (
//         <p>
//           Awarding certificate to <strong>{topStudent.name}</strong> ({topStudent.rollNo}) —{" "}
//           <strong>{topStudent.marks} marks</strong>
//         </p>
//       ) : (
//         <p>No student data available.</p>
//       )}
//       <button onClick={handleDownload} disabled={!topStudent}>
//         Download Certificate
//       </button>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import { db } from "../firebase";
// import { ref, onValue } from "firebase/database";
// import "./CertificateGenerator.css";

// export default function CertificateGenerator() {
//   const [topStudent, setTopStudent] = useState(null);

//   useEffect(() => {
//     const studentsRef = ref(db, "students/");
//     onValue(studentsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) {
//         setTopStudent(null);
//         return;
//       }
//       const arr = Object.values(data);
//       let best = arr[0];
//       arr.forEach((s) => {
//         if (parseInt(s.marks) > parseInt(best.marks)) best = s;
//       });
//       setTopStudent(best);
//     });
//   }, []);

//   const handleDownload = () => {
//     if (!topStudent) {
//       alert("No student data available to generate certificate.");
//       return;
//     }

//     const { name, marks, rollNo } = topStudent;
//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [800, 600],
//     });

//     // Background & frame
//     doc.setFillColor(255, 255, 255);
//     doc.rect(0, 0, 800, 600, "F");

//     // Fancy border
//     doc.setDrawColor(44, 62, 80); // dark blue
//     doc.setLineWidth(6);
//     doc.rect(20, 20, 760, 560);

//     // Ribbon top
//     doc.setFillColor(0, 102, 204); // blue
//     doc.rect(0, 0, 800, 50, "F");

//     // Title
//     doc.setTextColor(0, 51, 102); // navy
//     doc.setFont("times", "bold");
//     doc.setFontSize(36);
//     doc.text("🏅 Certificate of Honor", 400, 120, null, null, "center");

//     // Subtitle
//     doc.setFont("times", "italic");
//     doc.setFontSize(18);
//     doc.setTextColor(0, 0, 0);
//     doc.text("This is proudly presented to", 400, 170, null, null, "center");

//     // Student Name
//     doc.setFont("courier", "bolditalic");
//     doc.setFontSize(30);
//     doc.setTextColor(218, 165, 32); // golden
//     doc.text(name.toUpperCase(), 400, 220, null, null, "center");

//     // Achievement Description
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text(
//       `For securing the highest score of ${marks} marks in the academic records`,
//       400,
//       260,
//       null,
//       null,
//       "center"
//     );
//     doc.text(`Roll Number: ${rollNo}`, 400, 285, null, null, "center");

//     // Signature
//     doc.setFont("times", "normal");
//     doc.setFontSize(14);
//     doc.setTextColor(0, 0, 0);
//     doc.text("Signature:", 600, 500);

//     doc.setFont("times", "italic");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 128, 0); // green
//     doc.text("D. Indhu", 680, 500);

//     // Date
//     const today = new Date().toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//     doc.setFont("times", "italic");
//     doc.setFontSize(14);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Date: ${today}`, 100, 500);

//     // Save
//     doc.save("Top-Student-Certificate.pdf");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>🏆 Generate Certificate for Top Student</h2>
//       {topStudent ? (
//         <p>
//           Awarding certificate to <strong>{topStudent.name}</strong> ({topStudent.rollNo}) —
//           <strong> {topStudent.marks} marks</strong>
//         </p>
//       ) : (
//         <p>No student data available.</p>
//       )}
//       <button onClick={handleDownload} disabled={!topStudent}>
//         Download Certificate
//       </button>
//     </div>
//   );
// }
