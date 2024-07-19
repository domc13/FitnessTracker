import { useState, useEffect } from "react"
import api from "../api"
import Workout from "../components/Workout"
import "../styles/Home.css"
import WorkoutDashboard from "../components/WorkoutDashboard"

function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [calories, setCalories] = useState(0);
  const [timeWorkedOut, setTimeWorkedOut] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    getWorkouts();
  }, [])

  useEffect(() => {
    calculateTotals();
  }, [workouts]);

  const getWorkouts = () => {
    api
      .get("/api/workouts/")
      .then((res) => res.data)
      .then((data) => {setWorkouts(data);  console.log(data) })
      .catch((err) => alert(err));
  }

  const deleteWorkout = (id) => {
    api
      .delete(`/api/workouts/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Workout entry was deleted!")
        else alert("Failed to delete workout entry.")
        getWorkouts();
      })
      .catch((error) => alert(error))
  }

  const createWorkout = (e) => {
    e.preventDefault();
    console.log(typeof calories, typeof timeWorkedOut)
    api
      .post("/api/workouts/", { exercise_name: exerciseName, calories, time_worked_out: timeWorkedOut })
      .then((res) => {
        if (res.status === 201) alert("Workout entry was created!")
        else alert("Failed to create workout entry.")
        getWorkouts();
      })
      .catch((err) => alert(err))
  }

  const calculateTotals = () => {
    const totalCals = workouts.reduce((acc, workout) => acc + workout.calories, 0);
    const totalTime = workouts.reduce((acc, workout) => acc + workout.time_worked_out, 0);
    setTotalCalories(totalCals);
    setTotalTime(totalTime);
  };

  return <div>
    <WorkoutDashboard totalCalories={totalCalories} totalTime={totalTime} />
    <form onSubmit={createWorkout}>
      <label htmlFor="exerciseName">Exercise Name:</label>
      <br />
      <input 
        type="text"
        id="exerciseName"
        name="exerciseName"
        required
        onChange={(e) => setExerciseName(e.target.value)}
        value={exerciseName}
      />
      <label htmlFor="calories">Calories Burned:</label>
      <br />
      <input
        type="number"
        id="calories"
        name="calories"
        required
        min="0"
        onChange={(e) => setCalories(parseInt(e.target.value, 10))}
        value={calories}
      />
      <label htmlFor="timeWorkedOut">Workout Duration:</label>
      <br />
      <input
        type="number"
        id="timeWorkedOut"
        name="timeWorkedOut"
        required
        min="0"
        onChange={(e) => setTimeWorkedOut(parseInt(e.target.value, 10))}
        value={timeWorkedOut}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
    <div>
      {/* <h2 >Workout Log</h2> */}
      <div className="workout-log-container">
        <div className="workout-log-container-header">
          <h3>Exercise Name</h3>
          <h3>Calories Burned</h3>
          <h3>Workout Duration</h3>
          <h3>Date</h3>
        </div>
        {workouts.map((workout) => (
          <Workout workout={workout} onDelete={deleteWorkout} key={workout.id} />
        ))}
      </div>
    </div>
  </div>
}

export default Home