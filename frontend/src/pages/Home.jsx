import { useState, useEffect } from "react"
import api from "../api"
import Workout from "../components/Workout"

function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [calories, setCalories] = useState(0);
  const [timeWorkedOut, setTimeWorkedOut] = useState(0);

  useEffect(() => {
    getWorkouts();
  }, [])

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

  return <div>
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
      <h2>Workout Log</h2>
      <div className="workout-log-container">
        {workouts.map((workout) => (
          <Workout workout={workout} onDelete={deleteWorkout} key={workout.id} />
        ))}
      </div>
    </div>
  </div>
}

export default Home