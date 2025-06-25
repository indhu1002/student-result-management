// src/components/Settings.js
// import React, { useState } from "react";
// import "./Settings.css";

// function Settings() {
//   const [subjects, setSubjects] = useState(["Math", "Science", "English"]);
//   const [newSubject, setNewSubject] = useState("");

//   const addSubject = () => {
//     if (newSubject.trim()) {
//       setSubjects([...subjects, newSubject]);
//       setNewSubject("");
//     }
//   };

//   return (
//     <div className="settings">
//       <h2>Subject Manager</h2>
//       <div className="add-subject">
//         <input
//           type="text"
//           value={newSubject}
//           placeholder="Add new subject"
//           onChange={(e) => setNewSubject(e.target.value)}
//         />
//         <button onClick={addSubject}>Add</button>
//       </div>
//       <ul>
//         {subjects.map((subj, i) => (
//           <li key={i}>📘 {subj}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Settings;



// src/components/Settings.js
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./Settings.css";

function Settings() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Settings</h2>

      <section className="section">
        <h3>Account</h3>
        <p><strong>Logged in as:</strong> {user?.email}</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </section>
    </div>
  );
}

export default Settings;
