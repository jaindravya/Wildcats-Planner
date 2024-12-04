// frontend/src/components/Register.js
import React, { useState } from "react";
import "./Register.css";

function Register({ setShowLogin, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Registration successful!");
                // Optionally, log in the user automatically
                // onLoginSuccess(data.token);
                // Or redirect to login page
                setShowLogin(true);
            } else {
                alert(data.error || "Registration failed!");
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setShowLogin(true)}
                        className="switch-button"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;
