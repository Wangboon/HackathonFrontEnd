import React from "react";
import "../css/Dairymain.css";
import { useNavigate } from 'react-router-dom';

const MainContent = () => {

    sessionStorage.setItem("user", 1001);


    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleNext = () => {
        navigate('/dairy'); // Navigate to the next page
    };
    return (

        <main className="main-content">
            <div className="tiles-container">
                <div className="tile plus" onClick={handleNext}>
                    <span>+</span>
                </div>
                <div className="tile">
                    <span className="line"></span>
                </div>
                <div className="title">Title</div>
            </div>
            
        </main>
    );
};



export default MainContent;