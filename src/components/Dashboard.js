// // src/components/Dashboard.js
// import React from "react";
// import StudentForm from "./StudentForm";
// import StudentList from "./StudentList";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";

// function Dashboard() {
//   const handleLogout = () => {
//     signOut(auth);
//   };

//   return (
//     <div className="dashboard">
//       <h2>Student Result Dashboard</h2>
//       <button onClick={handleLogout}>Logout</button>
//       <StudentForm />
//       <StudentList />
//     </div>
//   );
// }

// export default Dashboard;


// src/components/Dashboard.js
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";

// function Dashboard() {
//   return (
//     <div className="dashboard">
//       <h1>🎓 Student Result Management Dashboard</h1>
//       <div className="dashboard-grid">
//         <Link to="/add-student" className="card">➕ Add Student</Link>
//         <Link to="/student-list" className="card">📄 Student List</Link>
//         <Link to="/student-details" className="card">📋 Student Details</Link>
//         <Link to="/notifications" className="card">📢 Notifications</Link>
//         <Link to="/chart" className="card">📊 Performance Chart</Link>
//         <Link to="/edit-student" className="card">✏️ Edit Result</Link>
//         <Link to="/delete-student" className="card">🗑️ Delete Result</Link>
//         <Link to="/grade-report" className="card">📘 Grade Report</Link>
//         <Link to="/attendance" className="card">🕒 Attendance</Link>
//         <Link to="/settings" className="card">⚙️ Settings</Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>🎓 Student Result Management Dashboard</h1>
      <div className="dashboard-grid">
        <Link to="/add-student" className="card">➕ Add Student</Link>
        <Link to="/student-list" className="card">📄 Student List</Link>
        <Link to="/student-details" className="card">📋 Student Details</Link>
        <Link to="/notifications" className="card">📢 Notifications</Link>
        <Link to="/chart" className="card">📊 Performance Chart</Link>
        <Link to="/edit-student" className="card">✏️ Edit Result</Link>
        <Link to="/delete-student" className="card">🗑️ Delete Result</Link>
        <Link to="/grade-report" className="card">📘 Grade Report</Link>
        <Link to="/attendance" className="card">🕒 Attendance</Link>
        <Link to="/settings" className="card">⚙️ Settings</Link>

        {/* ✅ Newly Added Features */}
        {/* <Link to="/progress" className="card">📈 Progress Tracker</Link> */}
        <Link to="/leaderboard" className="card">🏅 Top Performers</Link>

        <Link to="/certificate" className="card">🧾 Certificate Generator</Link>
      </div>
    </div>
  );
}

export default Dashboard;


