// src/components/PerformanceChart.js
import React, { useEffect, useState } from "react";
import "./PerformanceChart.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

function PerformanceChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const studentRef = ref(db, "students/");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      const chartArray = [];
      for (let id in data) {
        chartArray.push({
          name: data[id].name,
          marks: parseInt(data[id].marks),
        });
      }
      setChartData(chartArray);
    });
  }, []);

  return (
    <div className="performance-chart">
      <h2>Student Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="marks" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;
