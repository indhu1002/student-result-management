// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import Notifications from "./components/Notifications";
import PerformanceChart from "./components/PerformanceChart";
import EditStudent from "./components/EditStudent";
import DeleteStudent from "./components/DeleteStudent";
import GradeReport from "./components/GradeReport";
import Attendance from "./components/Attendance";
import Settings from "./components/Settings";
// import ProgressTracker from "./components/ProgressTracker";
import Leaderboard from "./components/Leaderboard";
import CertificateGenerator from "./components/CertificateGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chart" element={<PerformanceChart />} />
        <Route path="/edit-student" element={<EditStudent />} />
        <Route path="/delete-student" element={<DeleteStudent />} />
        <Route path="/grade-report" element={<GradeReport />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/progress" element={<ProgressTracker />} /> */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/certificate" element={<CertificateGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;



// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import AddStudent from "./components/AddStudent";
// import StudentList from "./components/StudentList";
// import StudentDetails from "./components/StudentDetails";
// import Notifications from "./components/Notifications";
// import PerformanceChart from "./components/PerformanceChart";
// import EditStudent from "./components/EditStudent";
// import DeleteStudent from "./components/DeleteStudent";
// import GradeReport from "./components/GradeReport";
// import Attendance from "./components/Attendance";
// import Settings from "./components/Settings";
// import Login from "./components/Login";
// import CertificateTemplate from "./components/CertificateTemplate"; // ✅ New elegant design

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/add-student" element={<AddStudent />} />
//         <Route path="/student-list" element={<StudentList />} />
//         <Route path="/student-details" element={<StudentDetails />} />
//         <Route path="/notifications" element={<Notifications />} />
//         <Route path="/chart" element={<PerformanceChart />} />
//         <Route path="/edit-student" element={<EditStudent />} />
//         <Route path="/delete-student" element={<DeleteStudent />} />
//         <Route path="/grade-report" element={<GradeReport />} />
//         <Route path="/attendance" element={<Attendance />} />
//         <Route path="/settings" element={<Settings />} />
//         <Route path="/certificate" element={<CertificateTemplate />} /> {/* ✅ New route */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

