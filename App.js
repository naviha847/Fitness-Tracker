import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [steps, setSteps] = useState("");
  const [workout, setWorkout] = useState("");
  const [calories, setCalories] = useState("");
  const [logs, setLogs] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("fitnessLogs"));
    if (savedLogs) {
      setLogs(savedLogs);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("fitnessLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = () => {
    if (!steps && !workout && !calories) return;

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      steps: Number(steps),
      workout,
      calories: Number(calories),
    };

    setLogs([newLog, ...logs]);

    setSteps("");
    setWorkout("");
    setCalories("");
  };

  // Weekly total
  const totalSteps = logs.reduce((sum, log) => sum + log.steps, 0);
  const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);

  return (
    <div className="container">
      <h1>🏋️ Fitness Tracker</h1>

      {/* Input Section */}
      <div className="card">
        <h2>Add Daily Activity</h2>

        <input
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <input
          placeholder="Workout (e.g. Running, Gym)"
          value={workout}
          onChange={(e) => setWorkout(e.target.value)}
        />

        <input
          placeholder="Calories Burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />

        <button onClick={addLog}>Add Log</button>
      </div>

      {/* Summary Section */}
      <div className="card summary">
        <h2>📊 Weekly Summary</h2>

        <p>Total Steps: {totalSteps}</p>
        <div className="bar">
          <div className="fill" style={{ width: `${Math.min(totalSteps / 100, 100)}%` }}></div>
        </div>

        <p>Total Calories: {totalCalories}</p>
        <div className="bar">
          <div className="fill" style={{ width: `${Math.min(totalCalories / 50, 100)}%` }}></div>
        </div>
      </div>

      {/* Log List */}
      <div className="card">
        <h2>📅 Activity Logs</h2>

        {logs.length === 0 ? (
          <p>No logs yet</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="log">
              <p><b>Date:</b> {log.date}</p>
              <p><b>Steps:</b> {log.steps}</p>
              <p><b>Workout:</b> {log.workout}</p>
              <p><b>Calories:</b> {log.calories}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;