import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

function Login({ setShowLogin, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                onLoginSuccess(data.token);
            } else {
                alert(data.error || "Login failed!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <div className="login-container">
            <img
                src="/cat-peek.png"
                alt="Planner-themed cat"
                className="cat-image-login"
            />
            <img
                src="/paw-planner.png"
                alt="PawPlanner logo"
                className="paw-planner-image"
            />
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="extra-options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <p>
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setShowLogin(false)}
                        className="switch-button"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
