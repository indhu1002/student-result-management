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
