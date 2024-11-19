import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/ChallengeList.css';
import refreshIcon from '../images/refresh.png';
import uploadIcon from '../images/img.png';
import mountainIcon from '../images/mountain.png';


const ChallengeList = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkChallengeStatus = async () => {
            const email = localStorage.getItem("userEmail");
            if (!email) {
                console.error("User email not found!");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/history/status/${email}`);
                if (response.data) {
                    navigate('/finish');
                }
            } catch (error) {
                console.error("Error checking challenge status:", error);
            }
        };

        checkChallengeStatus();
    }, [navigate]);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        // ดึง Email จาก Local Storage
        const email = localStorage.getItem("userEmail");
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const [challenges, setChallenges] = useState([]);
    const [randomChallenges, setRandomChallenges] = useState(
        JSON.parse(localStorage.getItem('randomChallenges')) || []
    );
    const [selectedIndex, setSelectedIndex] = useState(
        parseInt(localStorage.getItem('selectedIndex')) || 0
    );
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState('');

    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        fetchChallenges();
    }, []);

    useEffect(() => {
        if (challenges.length > 0 && randomChallenges.length === 0) {
            getRandomChallenges();
        }
    }, [challenges]);

    useEffect(() => {
        if (randomChallenges.length > 0) {
            setDescription(randomChallenges[selectedIndex]?.challenge);
        }
    }, [selectedIndex, randomChallenges]);

    const fetchChallenges = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/challenge/all');
            setChallenges(response.data);
        } catch (error) {
            console.error('Error fetching challenges:', error);
        }
    };

    const getRandomChallenges = () => {
        if (refreshCount >= 3) {
            alert("You can refresh only 3 times!");
            return;
        }

        if (challenges.length < 3) {
            console.error("Not enough challenges to choose from.");
            return;
        }

        const randomIndexes = new Set();
        while (randomIndexes.size < 3) {
            const randomIndex = Math.floor(Math.random() * challenges.length);
            randomIndexes.add(randomIndex);
        }

        const uniqueChallenges = Array.from(randomIndexes).map(index => challenges[index]);
        setRandomChallenges(uniqueChallenges);
        setDescription(uniqueChallenges[0].challenge);

        setRefreshCount(refreshCount + 1); // เพิ่มจำนวนการ Refresh
    };


    const handleSelectChallenge = (index) => {
        setSelectedIndex(index);
        setDescription(randomChallenges[index]?.challenge);
        localStorage.setItem('selectedIndex', index);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const [showPopup, setShowPopup] = useState(false);
    const [encourage, setEncourage] = useState(null);

    const fetchEncourage = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/encorage/all');
            const encourages = response.data;
            if (encourages.length > 0) {
                const randomIndex = Math.floor(Math.random() * encourages.length);
                setEncourage(encourages[randomIndex]);
            }
        } catch (error) {
            console.error("Error fetching encourages:", error);
        }
    };

    const handleSubmit = async (event) => {
        setRefreshCount(0);
        event.preventDefault();

        const userEmail = localStorage.getItem("userEmail");
        if (!description || !imageFile || !userEmail) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
            return;
        }

        const formData = new FormData();
        formData.append("description", description);
        formData.append("image", imageFile);
        formData.append("email", userEmail);

        try {
            await axios.post('http://localhost:8080/api/history/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImageFile(null);
            setImagePreview(null);
            fetchChallenges();
            await fetchEncourage(); // ดึง encouragement ใหม่
            setShowPopup(true); // แสดง popup
        } catch (error) {
            console.error("Error adding history:", error);
        }
    };

    const EncouragePopup = ({ onClose, encourage }) => {
        const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนหน้า
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2 className='popup-h2'>Encouragement for You!</h2>
                    {encourage ? (
                        <>
                            <p>{encourage.description}</p>
                            <h3>{encourage.name}</h3>
                        </>
                    ) : (
                        <p>No encouragement found.</p>
                    )}
                </div>
                <div className="popup-buttons-outside">
                    <button
                        onClick={() => navigate('/finish')}
                        className="popup-back-button"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    };


    return (
        <>
            <h1 className="daily-challenge-title">Daily Challenge</h1>
            <div className="challenge-container">
                <div className="challenge-header">
                    {randomChallenges.map((_, index) => (
                        <button
                            key={index}
                            className={`challenge-number ${selectedIndex === index ? 'active' : ''}`}
                            onClick={() => handleSelectChallenge(index)}
                        >
                            #{index + 1}
                        </button>
                    ))}
                </div>
                <form className="challenge-upload">
                    <label htmlFor="file-upload" className="challenge-upload-label">
                        อัปโหลดรูป <img src={uploadIcon} alt="Upload Icon" style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleImageChange}
                        className="upload-input"
                        style={{ display: 'none' }}
                    />
                </form>
                <div className="challenge-main-content">
                    <div className="challenge-text-and-image">
                        <div className="challenge-description">
                            <h2 className='challenge-h2'>ชาเลนจ์ของคุณคือ!!</h2>
                            {randomChallenges.length > 0 ? (
                                <p className="challenge-text">{randomChallenges[selectedIndex]?.challenge}</p>
                            ) : (
                                <p>ไม่พบชาเลนจ์</p>
                            )}
                            <img src={mountainIcon} />
                        </div>
                        <div className="challenge-image">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Uploaded Preview" className="preview-img" />
                            ) : (
                                <img src="" />
                            )}
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="challenge-submit">
                    <button type="button" className="challenge-button" onClick={() => navigate('/history')}>Challenge History</button>
                    <button type="submit" className="challenge-button">Submit Challenge</button>
                </form>
                {showPopup && encourage && (
                    <EncouragePopup
                        onClose={() => setShowPopup(false)}
                        encourage={encourage}
                    />
                )}
            </div></>
    );
};

export default ChallengeList;