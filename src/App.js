// src/App.js
import React, { useState } from "react";
import Calendar from "./calendar";
import Planner from "./planner";
import "./App.css";

const App = () => {
  const [showCalendar, setShowCalendar] = useState(true);

  const toggleView = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Event Management</h1>
        <button onClick={toggleView}>
          {showCalendar ? "Switch to Planner" : "Switch to Calendar"}
        </button>
      </header>

      <main>{showCalendar ? <Calendar /> : <Planner />}</main>
    </div>
  );
};

export default App;
