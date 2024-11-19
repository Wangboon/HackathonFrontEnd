import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../css/Register.css';
import Logo from "../images/logo.png";
const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

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
            const response = await fetch("http://localhost:8080/api/user/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ename: formData.username,
                    email: formData.email,
                    password: formData.password,
                    membership: 0,
                }),
            });

            if (response.ok) {
                setMessage("Registration successful!");
                setFormData({ username: "", email: "", password: "" });

                navigate("/login");
            } else {
                const error = await response.json();
                setMessage(`Registration failed: ${error.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-h1">Sign Up</h1>
            <img src={Logo} alt="Mood Compass" className="register-logo" />
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    className="register-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    className="register-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="register-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <p className="register-p">
                    You have an account? <Link to="/login">Login</Link>
                </p>
                <button className="register-button" type="submit">Sign up</button>
            </form>
            {message && <p className="register-message">{message}</p>}
        </div>
    );
};

export default RegisterForm;