import React, { useRef, useState, useEffect } from 'react';
import '../css/Dairy.css';
import axios from 'axios';
import "../css/Toolbar.css";
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

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
            }
            .next-btn2 {
            background-color: #81e6d9; /* Button color */
            color: white; /* Text color */
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            font-size: 16px;
            cursor: pointer;
            margin-left: 10px; /* Space between buttons */
            transition: background-color 0.3s ease;
            } .next-btn3 {
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
            .next-btnN {
            background-color: #81e6d9; /* Button color */
            color: #ffffff; /* Text color */
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
            background-color: #6cc0b5; /* Hover color */
            }.next-btn3:hover {
            background-color: #be003f; /* Hover color */
            }.next-btnN:hover {
            background-color: #6cc0b5; /* Hover color */
            }
        `;




function App() {


    


    const { id } = useParams();


    const [lastInsertedImage, setLastInsertedImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');

    const [title, setTitle] = useState('');
    const [moodData, setMoodData] = useState('');
    const [plainText, setPlainText] = useState('');
    const editorRef = useRef(null);
    const TitleRef = useRef(null);

    const [isToolbarEnabled, setIsToolbarEnabled] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate(); // Hook to programmatically navigate

    let data = false;

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('userEmail');
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/user/email/${email}`
                );

                if (response.data[0].membership == 1) {
                    data = true; // Enable the toolbar
                } else {
                    if(id){
                        navigate(`/dairy_no_M/${id}`);
                    }else{
                        navigate(`/dairy_no_M`);
                    }
                    
                }
            } catch (error) {
                console.error(error);
                data = false;; // Disable the toolbar on error
            }
        };
        fetchData();
    }, []);

    const setEditorContentProgrammatically = (newContent) => {
        if (editorRef.current) {
            editorRef.current.innerHTML = newContent; // Set the new content
            setEditorContent(newContent);
            setPlainText(newContent);
            // Update React state if needed
        }
    };

    const setTitleContentProgrammatically = (newContent) => {
        if (TitleRef.current) {
            TitleRef.current.innerHTML = newContent; // Set the new content
            setTitle(newContent);
            // Update React state if needed
            console.log("change " + editorContent);
        }
    };

    
    useEffect(() => {
        const getdata = async () => {
        if (id) {
            console.log("this: id " + id);
            try {
                const response = await axios.get(`http://localhost:8080/Diary/${id}`);

                // Check if response contains the expected data
                if (response.data) {
                    setEditorContentProgrammatically(response.data.text);
                    setTitleContentProgrammatically(response.data.title);
                } else {
                    console.error('Mood analysis data not found');
                }
            } catch (error) {
                console.error('Error fetching mood analysis', error);
            }
        }

    };
        getdata();
    }, []);

    function startRecording() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'th-TH';
        
        recognition.onresult = function (event) {
            console.log(event.results[0][0].transcript);
            setEditorContentProgrammatically(event.results[0][0].transcript);
        };

        recognition.start();
    }


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
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/getMoodText2', { text: plainText });

            // Check if response contains the expected data
            if (response.data && response.data.mood_analysis && response.data.mood_analysis.length > 0) {
                const moodLabel = response.data.mood_analysis[0].label;
                setMoodData(moodLabel);
                console.log(editorContent);
                console.log(plainText);
                console.log(response.data.mood_analysis[0].label); // Safely access label here
                console.log(moodData);
                const sendData = () => {
                    if (id) {
                        console.log('send id: ' + id);
                        navigate('/emotionGrid', { state: { mood: moodLabel, title: title, text: editorContent, id: id } });
                    } else {
                        console.log('no id: ');
                        navigate('/emotionGrid', { state: { mood: moodLabel, title: title, text: editorContent } });
                    }

                };
                sendData();
            } else {
                console.error('Mood analysis data not found');
            }
        } catch (error) {
            console.error('Error fetching mood analysis', error);
        }
    };

    const handleTitleChange = (e) => setTitle(e.target.value);


    const handleNext = (event) => {
        event.preventDefault();
        navigate('/emotionGrid'); // Navigate to the next page
    };
    const handleBack = (event) => {
        event.preventDefault();
        navigate('/diaryMain'); // Navigate to the next page
    };

    const deleteDiray = ()=> {
        const run = async() =>{
            const response = await axios.delete(`http://localhost:8080/Diary/${ id }`);
            console.log(response);
            
        }
        run();
        
    };

    const showConfirmDialog = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                ).then((result) => {
                    if(result){
                        window.location.replace("/diaryMain");
                    }
                });
                console.log('delete')
                deleteDiray();
            }
        });
    };
    const handleDelete = (event) => {
        event.preventDefault();
        showConfirmDialog();
    }


    


    

   

    const ButtonE = () => {
        if (id) {
            return (
                <div className="button-container">
                    <button className="next-btn1" onClick={handleBack}>Back</button>
                    <button className="next-btn2" onClick={handleSubmit}>Edit</button>
                    <button className="next-btn3" onClick={handleDelete}>Delete</button>
                </div>
            );
        }

        return (
            <div className="button-container">
                <button className="next-btn1" onClick={handleBack}>Back</button>
                <button className="next-btnN" onClick={handleSubmit}>Next</button>
            </div>
        );
    }

    return (
        <div className="App">


            {/* Main Content */}
                <div className="content">
                <div className="toolbar">
                    <select onChange={handleFontNameChange}>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                    </select>

                    <select onChange={handleFontSizeChange}>
                        <option value="3">14px</option>
                        <option value="4">18px</option>
                        <option value="5">24px</option>
                    </select>

                    <button onClick={() => formatText("bold")}>
                        <b>B</b>
                    </button>
                    <button onClick={() => formatText("italic")}>
                        <i>I</i>
                    </button>
                    <button onClick={() => formatText("underline")}>
                        <u>U</u>
                    </button>
                    <button onClick={() => formatText("justifyLeft")}>Left</button>
                    <button onClick={() => formatText("justifyCenter")}>Center</button>
                    <button onClick={() => formatText("justifyRight")}>Right</button>
                    <input type="color" onChange={handleFontColorChange} />
                    <button onClick={() => startRecording()}>Start Recording</button>
                </div>
                <form onSubmit={handleSubmit} data-aos="fade" className='textFrom'>
                    <div className="form">
                        <div
                            contentEditable="true"
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
                            onInput={(event) => {
                                setTitle(event.target.innerHTML)
                            }}
                        />

                        <div
                            className="editor"
                            contentEditable="true"
                            onInput={(event) => {
                                setEditorContent(event.target.innerHTML)
                                setPlainText(event.target.innerText);
                            }}
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

                        <div className="char-count">{plainText.length}/1800</div>
                        <ButtonContainer>
                            <div className="button-container">
                                <ButtonE></ButtonE>
                            </div>
                        </ButtonContainer>

                    </div>
                </form>
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
