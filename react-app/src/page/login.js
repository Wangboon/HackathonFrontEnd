import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import Logo from "../images/logo.png";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate(); // For programmatic navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
    
                // Save the user email and user ID to Local Storage
                localStorage.setItem("userEmail", formData.email);  // Save email
                localStorage.setItem("userId", data.id);  // Save userId
    
                // Redirect to the home page after successful login
                navigate("/");  // This will redirect to the home page or wherever you want
            } else {
                console.error("Login failed:", await response.text());
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    };
    

    return (
        <div className="login-container">
            <h1 className="login-h1">Login</h1>
            <img src={Logo} alt="Company Logo" className="login-logo" />
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <p className="login-p">
                    Don’t have an account? <Link to="/register">Sign Up</Link>
                </p>
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
