import React , { useEffect,useState  } from 'react';
import styled from 'styled-components';

import { useNavigate,useLocation,useParams } from 'react-router-dom';
import axios from 'axios';

// if(sessionStorage.getItem("user") == '' || sessionStorage.getItem("user") === null){
//   window.location.replace("http://www.w3schools.com");
// }

let mood = '';
let title = '';
let text = '';
let emotion = '';
let zone = '';
let userId = sessionStorage.getItem("user");



// Main container to make the app fit the screen
const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 70vh; /* Full height */
  width: 100%; /* Full width */
  background-color: #e3f2fd;
  margin: 0;
`;






// QuoteCard section
const QuoteBox = styled.div`
  background-color: #d5f5e7;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 600px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Add some shadow for better aesthetics */
`;

const QuoteText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Author = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
`;

// Button styles
const StyledButton = styled.button`
  background-color: #b2f5ea;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #81e6d9;
  }
`;

// Like/Dislike button styles
const LikeDislikeButton = styled.button`
  background-color: ${(props) => (props.liked ? '#43a047' : '#e57373')};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    opacity: 0.8;
  }
`;


function QuoteCard() {
  const [EID, setEID] = useState(null);
  const [ENAME, setENAME] = useState('Loading...');
  const [ED, setED] = useState('Loading...');
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
 
  useEffect(() => {
    const handleSubmit = async () => {
  
      try {
          const zone = location.state?.zone;
          const response = await axios.get(`http://localhost:8080/encourageMessages`);
          const data = response.data;
          console.log(data);  
          const select = data.filter((item) => item.moodZone === zone);
          console.log(select);  
          const random = select[Math.floor(Math.random() * select.length)]
          console.log(random);
          // Check if response contains the expected data
          if (response.data) {
             console.log(random.id + " " + random.author + " " + random.message);
             setEID(random.id);
             setENAME(random.author);
             setED(random.message);
             console.log(EID + " " + ENAME + " " + ED);
          } else {
              console.error('Mood analysis data not found');
          }
      } catch (error) {
          console.error('Error fetching mood analysis', error);
      }
  };
  handleSubmit();
}, []);

  
  
  const location = useLocation();
  console.log(mood);
  const navigate = useNavigate(); // Hook to programmatically navigate
  const handleNext = () => {
    navigate('/diaryMain'); // Navigate to the next page
  };
  console.log(emotion);

  const setdata = () => {
    mood = location.state?.mood || ''; // Access passed state or set default value
    title = location.state?.title || '';
    text = location.state?.text || '';
    emotion = location.state?.emotion || '';
    zone = location.state?.zone || '';

    console.log(mood + " Title: " + title + " Text: " + text + " emotion: " + emotion + " zone: " + zone);
  };

 

  setdata();

  const handleLike = () => {
    setLiked(true);
    setDisliked(false); // Prevent simultaneous dislike
    console.log('Liked:', EID, ENAME);
  };

  const handleDislike = () => {
    setLiked(false); // Prevent simultaneous like
    setDisliked(true);
    console.log('Disliked:', EID, ENAME);
  };
  
  return (
    <FullScreenContainer>
      <QuoteBox>
        <h2>ขอบคุณสำหรับการเขียนไดอารี่</h2>
        <QuoteText>{ED}</QuoteText>
        <Author>{ENAME}</Author>

        {/* Like and Dislike buttons */}
        <div>
          <LikeDislikeButton liked={liked} onClick={handleLike}>
            👍 Like
          </LikeDislikeButton>
          <LikeDislikeButton liked={disliked} onClick={handleDislike}>
            👎 Dislike
          </LikeDislikeButton>
        </div>

        {/* Back button */}
        <StyledButton onClick={handleNext}>Back</StyledButton>
      </QuoteBox>
    </FullScreenContainer>
  );
}

export default QuoteCard;
