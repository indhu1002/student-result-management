// src/components/StudentForm.js
import React, { useState } from "react";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

function StudentForm() {
  const [form, setForm] = useState({
    roll: "",
    name: "",
    marks: "",
    subject: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(db, "students/" + form.roll), form)
      .then(() => {
        alert("Student data saved.");
        setForm({ roll: "", name: "", marks: "", subject: "" });
      })
      .catch((err) => alert("Error: " + err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="roll" placeholder="Roll No" value={form.roll} onChange={handleChange} required />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
      <input name="marks" placeholder="Marks" value={form.marks} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;
