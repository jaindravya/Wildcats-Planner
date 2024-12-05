import React, { useState, useEffect } from "react";
import Calendar from "./calendar";
import Planner from "./planner";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

const App = () => {
    const isValidToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem("token");
        return token && isValidToken(token);
    });

    const [showCalendar, setShowCalendar] = useState(true);
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
        setShowLogin(true); // Reset to login
    };

    if (!isLoggedIn) {
        return (
            <div className="App">
                {showLogin ? (
                    <Login setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <Register setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />
                )}
                <button onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? "Go to Register" : "Go to Login"}
                </button>
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
