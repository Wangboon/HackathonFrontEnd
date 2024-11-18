// EncourageList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/EncourageList.css';

const EncourageList = () => {
    const [encourages, setEncourages] = useState([]);
    const [randomEncourage, setRandomEncourage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const savedEncourage = localStorage.getItem('randomEncourage');
        if (savedEncourage) {
            setRandomEncourage(JSON.parse(savedEncourage));
        } else {
            fetchEncourages();
        }
    }, []);

    const fetchEncourages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/encorage/all');
            setEncourages(response.data);
            getRandomEncourage(response.data);
        } catch (error) {
            console.error('Error fetching encourages:', error);
        }
    };

    const getRandomEncourage = (encourageList) => {
        if (encourageList.length > 0) {
            const randomIndex = Math.floor(Math.random() * encourageList.length);
            const selectedEncourage = encourageList[randomIndex];
            setRandomEncourage(selectedEncourage);
            localStorage.setItem('randomEncourage', JSON.stringify(selectedEncourage));
        }
    };

    return (
        <div className="encourage-container">
            <h1>Encouragement for You!</h1>
            {randomEncourage ? (
                <div>
                    <h3>{randomEncourage.name}</h3>
                    <p>{randomEncourage.description}</p>
                </div>
            ) : (
                <p>No encouragements found.</p>
            )}
            <button onClick={() => navigate('/finish')}>Back to Challenges</button>
            <button onClick={() => navigate('/history')}>Challenge History</button>
        </div>
    );
};

export default EncourageList;