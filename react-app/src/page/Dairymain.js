import React, { useEffect, useState } from "react";
import "../css/Dairymain.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import all images dynamically from all Zones
const importAllImages = (r) => {
    let images = {};
    r.keys().map((item) => { images[item.replace("./", "")] = r(item); });
    return images;
};


// Import images from all Mood Zones
const redImages = importAllImages(require.context("../images/Red Zone", false, /\.(png|jpe?g)$/));
const yellowImages = importAllImages(require.context("../images/Yellow Zone", false, /\.(png|jpe?g)$/));
const blueImages = importAllImages(require.context("../images/Blue Zone", false, /\.(png|jpe?g)$/));
const greenImages = importAllImages(require.context("../images/Green Zone", false, /\.(png|jpe?g)$/));

const MainContent = () => {
    const [diaries, setDiaries] = useState([]); // State to store diaries
    const [canWrite, setCanWrite] = useState(0);
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

    useEffect(() => {
        // If user email exists, fetch diaries by email, else redirect to login
        if (userEmail) {
            axios
                .get(`http://localhost:8080/api/user/email/${userEmail}`) // Use the email-based endpoint
                .then((response) => {
                    console.log(response.data[0].canWrite);
                    if (response.data) {
                        setCanWrite(response.data[0].canWrite);
                    }
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
    const seedairy = (id) => {
        navigate(`/dairysee/${id}`); // Navigate to add a new diary
    };

    // Function to determine the image source based on the mood and its corresponding zone
    const getImageSource = (mood, moodZone) => {
        const moodFileName = `${mood}.png`;

        switch (moodZone) {
            case "Red":
                return redImages[moodFileName] || "#";  // Return Red Zone image or default
            case "Yellow":
                return yellowImages[moodFileName] || "#";  // Return Yellow Zone image or default
            case "Blue":
                return blueImages[moodFileName] || "#";  // Return Blue Zone image or default
            case "Green":
                return greenImages[moodFileName] || "#";  // Return Green Zone image or default
            default:
                return "#";  // Default fallback
        }
    };

    console.log(canWrite);
    let style
    if (canWrite === 1) {
        style = 'pointerEvents: "none"';
    }

    return (
        <main className="main-content">
            <div className="tiles-container">
                {/* Add Diary Button */}
                <div className="addDiary plus" onClick={handleNext} style={{
                    pointerEvents: canWrite === 1 ? "auto" : "none",
                    opacity: canWrite === 1 ? 1 : 0.4,
                }}>
                    <span>+</span>
                </div>

                {/* Render Diaries Dynamically */}
                {diaries.length > 0 ? (
                    diaries.map((diary, index) => (
                        <div key={index} className="diary-wrapper" onClick={() => seedairy(diary.id)}>
                            <div
                                className="diary"
                                style={{
                                    backgroundColor: moodZoneColors[diary.moodZone] || "#a8e8d0", // Set background color based on moodZone
                                }}
                            >
                                {/* Display the image corresponding to the mood */}
                                <img
                                    src={getImageSource(diary.mood, diary.moodZone)}
                                    alt={diary.mood}
                                    className="diary-image"
                                />
                                <p>{diary.mood}</p> {/* Show mood inside diary */}
                            </div>
                            <div className="title">{diary.title}</div>
                            <div className="time">
                                {new Date(diary.time).toLocaleString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-diaries-message">เขียนไดอารี่กันเถอะ</p>
                )}
            </div>
        </main>
    );
};

export default MainContent;
