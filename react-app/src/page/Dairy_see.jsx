import React, { useRef, useState, useEffect } from 'react';
import '../css/Dairy.css';
import axios from 'axios';
import styled from 'styled-components';

import "../css/Toolbar.css";
import { useNavigate, useParams } from 'react-router-dom';







function App() {

    const [lastInsertedImage, setLastInsertedImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');

    const [title, setTitle] = useState('');
    const [moodData, setMoodData] = useState('');
    const [plainText, setPlainText] = useState('');
    const editorRef = useRef(null);
    const TitleRef = useRef(null);
    const [isToolbarEnabled, setIsToolbarEnabled] = useState(false);

    const { id } = useParams();


    const setEditorContentProgrammatically = (newContent) => {
        if (editorRef.current) {
            editorRef.current.innerHTML = newContent; // Set the new content
            setEditorContent(newContent);
            setPlainText(newContent);
            // Update React state if needed
            console.log("change " + editorContent);
        }
    };

    const setTitleContentProgrammatically = (newContent) => {
        if (TitleRef.current) {
            TitleRef.current.innerHTML = newContent; // Set the new content
            setTitle(newContent);
            setPlainText(newContent);
            // Update React state if needed
            console.log("change " + editorContent);
        }
    };




    // Execute text formatting commands
    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    // Handle font size change
    const handleFontSizeChange = (e) => {
        formatText("fontSize", e.target.value);
    };

    // Handle font name change
    const handleFontNameChange = (e) => {
        formatText("fontName", e.target.value);
    };

    // Handle font color change
    const handleFontColorChange = (e) => {
        formatText("foreColor", e.target.value);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement("img");
                img.src = event.target.result;
                img.style.width = "100%";
                img.style.position = "absolute";
                img.style.cursor = "move";

                // Add drag events
                img.draggable = true;
                img.addEventListener("dragstart", startDrag);
                img.addEventListener("dragend", endDrag);

                editorRef.current.appendChild(img);
                setLastInsertedImage(img);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle image size change
    const handleImageSizeChange = (e) => {
        if (lastInsertedImage) {
            lastInsertedImage.style.width = e.target.value;
        }
    };

    // Drag start handler
    const startDrag = (e) => {
        const img = e.target;
        img.style.opacity = "0.5";
        img.dataset.startX = e.clientX - img.offsetLeft;
        img.dataset.startY = e.clientY - img.offsetTop;
    };

    // Drag end handler
    const endDrag = (e) => {
        const img = e.target;
        img.style.opacity = "1";
        img.style.left = `${e.clientX - img.dataset.startX}px`;
        img.style.top = `${e.clientY - img.dataset.startY}px`;
    };

    // Handle changes in the contentEditable
    const handleEditorInput = (event) => {
        setEditorContent(event.target.innerHTML);
    };



    // Submit handler

    const handleSubmit = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/Diary/${id}`);

            // Check if response contains the expected data
            if (response.data) {
                console.log(response.data);
                setEditorContentProgrammatically(response.data.text);
                setTitleContentProgrammatically(response.data.title);
            } else {
                console.error('Mood analysis data not found');
            }
        } catch (error) {
            console.error('Error fetching mood analysis', error);
        }
    };
    useEffect(() => {
        handleSubmit();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('userEmail');
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/user/email/${email}`
                );

                if (response.data[0].membership == 1) {
                    setIsToolbarEnabled(true); // Enable the toolbar
                } else {
                    setIsToolbarEnabled(false); // Disable the toolbar
                }
            } catch (error) {
                console.error(error);
                setIsToolbarEnabled(false); // Disable the toolbar on error
            }
        };
        fetchData();
    }, []);


    const handleTitleChange = (e) => setTitle(e.target.value);

    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleNext = () => {
        navigate('/diaryMain'); // Navigate to the next page
    }; 
    const handleNextEdit = () => {
        if(!isToolbarEnabled){
            navigate(`/dairy_no_M/${id}`); // Navigate to the next page
        }else{
            navigate(`/dairy/${id}`); // Navigate to the next page
        }
        
        
    };
    const ButtonContainer = styled.div`
        .button-container {
        display: flex;
        justify-content: flex-end; /* Align buttons to the right */
        margin-top: 20px; /* Add some space from the content above */
        }

        .next-btn1 {
        background-color: #007bff; /* Button color */
        color: white; /* Text color */
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
        margin-left: 10px; /* Space between buttons */
        transition: background-color 0.3s ease;
        }.next-btn2 {
        background-color: #db0049; /* Button color */
        color: white; /* Text color */
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
        margin-left: 10px; /* Space between buttons */
        transition: background-color 0.3s ease;
        }

        .next-btn1:hover {
        background-color: #0056b3; /* Hover color */
        }.next-btn2:hover {
        background-color: #be003f; /* Hover color */
        }
    `;

    return (
        <div className="App">
            {/* Main Content */}
            <div className="content">
                <div className="form">
                    <div
                        contentEditable="false"
                        className="title-input"
                        ref={TitleRef}
                        style={{
                            width: "100%",
                            height: "50px",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            outline: "none",
                            marginTop: "10px",
                            position: "relative",
                            overflow: "auto"
                        }}
                    />

                    <div
                        className="editor"
                        contentEditable="false"
                        ref={editorRef}
                        style={{
                            width: "100%",
                            height: "400px",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            outline: "none",
                            marginTop: "10px",
                            position: "relative",
                            overflow: "auto"
                        }}
                    >
                    </div>

                    {/* <div className="char-count">{plainText.length}/1800</div> */}
                    <ButtonContainer>
                        <div className="button-container">
                            <button className="next-btn1" onClick={handleNext}>Back</button>
                            <button className="next-btn2" onClick={handleNextEdit}>Edit</button>
                        </div>
                    </ButtonContainer>

                </div>
                {moodData && (
                    <div className="result">
                        {/* <h2>Mood Analysis Result</h2>
                        <p>
                            <strong>Label:</strong> {moodData.mood_analysis[0].label}
                        </p> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
