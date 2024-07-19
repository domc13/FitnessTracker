import { useState, useEffect } from "react";
import "../styles/Workout.css"

function Workout({workout, onDelete}) {

  const formattedDate = new Date(workout.date).toLocaleDateString("en-us");

  return <div className="workout-container">
    <p className="workout-name">{workout.exercise_name}</p>
    <p className="workout-calories">{workout.calories}</p>
    <p className="workout-duration">{workout.time_worked_out}</p>
    <p className="workout-date">{formattedDate}</p>
    <button className="delete-button" onClick={() => onDelete(workout.id)}>
      Delete
    </button>
  </div>
}

export default Workout;