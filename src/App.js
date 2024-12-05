// frontend/src/components/App.js
import React, { useState } from "react";
import Calendar from "./calendar";
import Planner from "./planner";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

const App = () => {
    const [showCalendar, setShowCalendar] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [showLogin, setShowLogin] = useState(true);

    const toggleView = () => {
        setShowCalendar(!showCalendar);
    };

    const handleLoginSuccess = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

   if (!isLoggedIn) {
        return (
            <div className="App">
                {showLogin ? (
                    <Login setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <Register
                        setShowLogin={setShowLogin}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}
            </div>
        );
    } 

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>PAW PLANNER</h1>
                <button onClick={toggleView}>
                    {showCalendar ? "Switch to Planner" : "Switch to Calendar"}
                </button>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <main>{showCalendar ? <Calendar /> : <Planner />}</main>
        </div>
    );
};

export default App;
