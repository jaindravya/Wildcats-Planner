import React, { useState } from "react";

const ForgotPassword = ({ setShowForgotPassword, setShowLogin }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send email to backend for password reset
        alert("Password reset instructions sent to your email!");
        setShowForgotPassword(false);
        setShowLogin(true); // Navigate back to login after submission
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Instructions</button>
            </form>
            <button onClick={() => setShowForgotPassword(false)}>
                Back to Login
            </button>
        </div>
    );
};

export default ForgotPassword;
