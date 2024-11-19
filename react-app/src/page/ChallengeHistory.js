import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ChallengeHistory.css';

const ChallengeHistory = () => {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail"); // ดึง email จาก Local Storage
            if (!userEmail) {
                console.error("User email not found in local storage.");
                return;
            }
    
            const response = await axios.get(`http://localhost:8080/api/history?email=${userEmail}`);
            
            setHistoryData(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };    

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="history-container">
            <h1 className="history-title">Challenge History</h1>
            {historyData.length > 0 ? (
                <div className="history-list">
                    {historyData.map((item) => (
                        <div className="history-card" key={item.id}>
                            <div className="history-header">
                                <div className="check-icon">✔</div>
                                <div className="history-date">{formatDate(item.createdDate)}</div>
                            </div>
                            <div className="history-body">
                                <div className="history-row">
                                    <div className="history-description-container">
                                        <p className="history-description">{item.description}</p>
                                        <p className="history-completed">Completed!</p>
                                    </div>
                                    <div className="history-image">
                                        {item.image && (
                                            <img
                                                src={`data:image/jpeg;base64,${item.image}`}
                                                alt="Challenge"
                                                className="history-img"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading....</p>
            )}
        </div>
    );    
};

export default ChallengeHistory;