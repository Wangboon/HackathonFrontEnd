import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/FinishChallenge.css';

const FinishChallenge = () => {
    const [latestChallenge, setLatestChallenge] = useState(null);

    useEffect(() => {
        fetchLatestChallenge();
    }, []);

    const fetchLatestChallenge = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/history/submitted');
            const challenges = response.data;
            if (challenges.length > 0) {
                setLatestChallenge(challenges[challenges.length - 1]); // แสดง Challenge ล่าสุดในรายการ
            }
        } catch (error) {
            console.error('Error fetching latest challenge:', error);
        }
    };

    return (
        <div className="finish-container">
            <h1 className="finish-title">Daily Challenge</h1>
            <div className="challenge-box">
                <div className="challenge-inline">
                    <div className="checkmark-icon">✔</div>
                    <div>
                        <p className="challenge-description">
                            {latestChallenge ? latestChallenge.description : "No challenge found."}
                        </p>
                        <p className="completed-text">Completed!</p>
                    </div>
                </div>
                {/* ปุ่มในกรอบ */}
                <button
                    className="history-button"
                    onClick={() => window.location.href = "/history"}
                >
                    Go to Challenge History
                </button>
            </div>
        </div>
    );
};

export default FinishChallenge;