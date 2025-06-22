// import React from "react";
// import jsPDF from "jspdf";
// import "./CertificateGenerator.css";

// function CertificateGenerator() {
//   const handleDownload = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Certificate of Achievement", 50, 30);

//     doc.setFontSize(14);
//     doc.text("This is to certify that", 20, 50);
//     doc.text("INDHU D", 90, 50);

//     doc.text("has successfully scored 92% in the final examination.", 20, 60);

//     doc.text("Date: 20 June 2025", 20, 80);
//     doc.text("Signature: ________________", 20, 90);

//     doc.save("Student-Certificate.pdf");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>Generate Certificate</h2>
//       <button onClick={handleDownload}>Download PDF</button>
//     </div>
//   );
// }

// export default CertificateGenerator;



// // src/components/CertificateGenerator.js
// import React from "react";
// import jsPDF from "jspdf";
// import "./CertificateGenerator.css";

// function CertificateGenerator() {
//   const handleDownload = () => {
//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [600, 400],
//     });

//     // Blue border
//     doc.setDrawColor(0, 102, 204);
//     doc.setLineWidth(6);
//     doc.rect(20, 20, 560, 360);

//     // Title
//     doc.setFont("times", "bold");
//     doc.setFontSize(28);
//     doc.text("Certificate of Achievement", 300, 100, null, null, "center");

//     // Subtitle
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.text("This is to proudly certify that", 300, 140, null, null, "center");

//     // Recipient
//     doc.setFont("times", "bold");
//     doc.setFontSize(22);
//     doc.text("INDHU D", 300, 175, null, null, "center");

//     // Description lines
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.text("has successfully completed the final examination", 300, 205, null, null, "center");
//     doc.text("in the Student Result Management System with distinction.", 300, 225, null, null, "center");

//     // Date (italic)
//     doc.setFont("times", "italic");
//     doc.setFontSize(14);
//     doc.setTextColor(0, 0, 0);
//     doc.text("Date: 20 June 2025", 80, 330);

//     // Signature label (black, normal)
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text("Signature:", 420, 330);

//     // Signature name (green, italic)
//     doc.setFont("times", "italic");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 128, 0);
//     doc.text("D. Indhu", 495, 330); // slightly to the right of "Signature:"

//     // Save PDF
//     doc.save("Student-Certificate.pdf");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>🎓 Generate Certificate</h2>
//       <button onClick={handleDownload}>Download Certificate</button>
//     </div>
//   );
// }

// export default CertificateGenerator;


// // src/components/CertificateGenerator.js
// import React from "react";
// import jsPDF from "jspdf";
// import "./CertificateGenerator.css";

// function CertificateGenerator() {
//   const handleDownload = () => {
//     const doc = new jsPDF({ orientation:"landscape", unit:"px", format:[600,400] });

//     // Blue border
//     doc.setDrawColor(0,102,204);
//     doc.setLineWidth(6);
//     doc.rect(20,20,560,360);

//     // Title
//     doc.setFont("times","bold"); doc.setFontSize(28);
//     doc.text("Certificate of Achievement",300,100,null,null,"center");

//     // Subtitle
//     doc.setFont("times","normal"); doc.setFontSize(16);
//     doc.text("This is to proudly certify that",300,140,null,null,"center");

//     // Recipient
//     doc.setFont("times","bold"); doc.setFontSize(22);
//     doc.text("INDHU D",300,175,null,null,"center");

//     // Description
//     doc.setFont("times","normal"); doc.setFontSize(16);
//     doc.text("has successfully completed the final examination",300,205,null,null,"center");
//     doc.text("in the Student Result Management System with distinction.",300,225,null,null,"center");

//     // Date
//     doc.setFont("times","italic"); doc.setFontSize(14);
//     doc.setTextColor(0,0,0);
//     doc.text("Date: 20 June 2025",80,330);

//     // Signature label
//     doc.setFont("times","normal"); doc.setFontSize(16);
//     doc.setTextColor(0,0,0);
//     doc.text("Signature:",420,330);

//     // Signature name
//     doc.setFont("times","italic"); doc.setFontSize(16);
//     doc.setTextColor(0,128,0);
//     doc.text("D. Indhu",495,330);

//     doc.save("Student-Certificate.pdf");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>🎓 Generate Certificate</h2>
//       <button onClick={handleDownload}>Download Certificate</button>
//     </div>
//   );
// }

// export default CertificateGenerator;



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
