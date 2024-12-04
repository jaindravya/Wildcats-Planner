import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

function Login({ setShowLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Submitted", { email, password });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            placeholder="Password"
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
                    <button type="submit" className="login-button">Login</button>
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
