import React, { useEffect, useState } from "react";
import "../css/Dairymain.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainContent = () => {
    const [diaries, setDiaries] = useState([]); // State to store diaries
    const navigate = useNavigate();

    // Get the email from localStorage
    const userEmail = localStorage.getItem("userEmail");

    // Define the colors for each Mood Zone
    const moodZoneColors = {
        Red: "#F0A3A3",    // Light Red - Soft Red
        Blue: "#A8E1FA",   // Light Blue - Soft Blue
        Yellow: "#EEEA8B", // Light Yellow - Light Lemon
        Green: "#ABD7A0",  // Light Green - Pale Green
    };

    useEffect(() => {
        // If user email exists, fetch diaries by email, else redirect to login
        if (userEmail) {
            axios
                .get(`http://localhost:8080/diary/user/email/${userEmail}`) // Use the email-based endpoint
                .then((response) => {
                    setDiaries(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching diary data:", error);
                });
        } else {
            navigate("/login"); // If no email found, redirect to login
        }
    }, [userEmail, navigate]);

    const handleNext = () => {
        navigate("/dairy"); // Navigate to add a new diary
    };

    return (
        <main className="main-content">
            <div className="tiles-container">
                {/* Add Diary Button */}
                <div className="addDiary plus" onClick={handleNext}>
                    <span>+</span>
                </div>

                {/* Render Diaries Dynamically */}
                {diaries.length > 0 ? (
                    diaries.map((diary, index) => (
                        <div key={index} className="diary-wrapper">
                            <div
                                className="diary"
                                style={{
                                    backgroundColor: moodZoneColors[diary.moodZone] || "#a8e8d0", // Set background color based on moodZone
                                }}
                            >
                                <p>{diary.mood}</p> {/* Example: Show mood inside diary */}
                            </div>
                            <div className="title">{diary.title}</div>
                            <div className="time">
                                {new Date(diary.time).toLocaleString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No diaries found</p>
                )}
            </div>
        </main>
    );
};

export default MainContent;
