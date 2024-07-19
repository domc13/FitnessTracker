import React from 'react';
import "../styles/WorkoutDashboard.css";

function WorkoutDashboard({ totalCalories, totalTime }) {
  return (
    <div className="workout-dashboard">
      <div className="dashboard-item">
        <h3>Total Calories Burned</h3>
        <p>{totalCalories}</p>
      </div>
      <div className="dashboard-item">
        <h3>Total Workout Duration (minutes)</h3>
        <p>{totalTime}</p>
      </div>
    </div>
  );
}

export default WorkoutDashboard;