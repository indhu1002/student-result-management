import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ProgressTracker.css';

const data = [
  { subject: 'Math', marks: 85 },
  { subject: 'Science', marks: 92 },
  { subject: 'English', marks: 78 },
  { subject: 'Social', marks: 88 },
  { subject: 'Computers', marks: 94 },
];

function ProgressTracker() {
  return (
    <div className="progress-container">
      <h2>Student Progress Tracker</h2>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="marks" stroke="#007bff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressTracker;
