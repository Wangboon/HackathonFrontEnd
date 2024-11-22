import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';


let mood = '';
let title = '';
let text = '';
let emotion = '';
let zone = '';
let email = localStorage.getItem("userEmail") ? localStorage.getItem("userEmail") : 'not email';
console.log(email);
let userId = 1;

// Import images dynamically


const importAllImages = (r) => {
  let images = {};
  r.keys().map((item) => { images[item.replace("./", "")] = r(item); });
  return images;
};

const moodZoneColors = {
  Red: "#ffe5e5",
  Blue: "#e3f8ff",
  Yellow: "#fffede",
  Green: "#f9ffe0",
};

// Import images for each mood zone
const redImages = importAllImages(require.context("../images/Red Zone", false, /\.(png|jpe?g)$/));
const yellowImages = importAllImages(require.context("../images/Yellow Zone", false, /\.(png|jpe?g)$/));
const blueImages = importAllImages(require.context("../images/Blue Zone", false, /\.(png|jpe?g)$/));
const greenImages = importAllImages(require.context("../images/Green Zone", false, /\.(png|jpe?g)$/));

const getImageSource = (mood, moodZone) => {
  const moodFileName = `${mood}.png`;

  switch (moodZone) {
    case "Red":
      return redImages[moodFileName] || "#";
    case "Yellow":
      return yellowImages[moodFileName] || "#";
    case "Blue":
      return blueImages[moodFileName] || "#";
    case "Green":
      return greenImages[moodFileName] || "#";
    default:
      return "#";
  }
};

const Theam = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  .h2{
    margin-top:2%;
  }
`;

const SelectButton = styled.button`
  width: 70%;
  padding: 10px 15px;
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  color: #333;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f7f7f7;
    border-color: #888;
  }
`;

// Styled dropdown menu
const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #ffffff;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

// Styled dropdown item
const DropdownItem = styled.li`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  


  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Pass selected option to parent
  };

  // Styled container for the select button
  const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  margin: 20px;
`;

  
  return (
    <SelectContainer>
      <SelectButton onClick={() => setIsOpen(!isOpen)} backgroundColor="#ffffff">
        {selectedOption || "Select Zone"}
      </SelectButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </SelectContainer>
  );
};

const GridContainer = styled.div`
  text-align: center;

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 3rem;
    margin: 20px;
  }

  .diary {
    width: 200px;
    height: 215px;
    background-color: ${(props) => props.cardColor || "#a8e8d0"};
    border-radius: 15px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .diary:hover {
    transform: translateY(-10px);
  }

  .diary img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const textDes = {
  Red: ['โซนสีแดงแสดงถึงอารมณ์ที่รุนแรง ต้องการการระบายและวิธีการจัดการที่เหมาะสม'],
  Blue:['โซนสีฟ้าแสดงถึงช่วงเวลาที่อารมณ์อาจอ่อนโยน หรือกำลังสะท้อนถึงความคิดลึก ๆ ภายในใจ เป็นช่วงเวลาที่บอกว่าเราต้องการดูแลตัวเองให้มากขึ้น'],
  Yellow:['โซนสีเหลืองแสดงถึงอารมณ์ที่มีพลังและกระตือรือร้น ผลักดันให้เรามีแรงบันดาลใจและสามารถทำกิจกรรมต่าง ๆ ได้อย่างเต็มที่'],
  Green:['โซนสีเขียวแสดงถึงอารมณ์ที่สงบและเป็นสุข เป็นอารมณ์ที่ช่วยเติมพลังชีวิตในเชิงบวก']
}

const zoneEmotions = {
  Red: [
    'โกรธ',
    'คับข้องใจ',
    'เครียด',
    'เครียดแค้น',
    'เดือดดาล',
    'รังเกียจ',
    'ร่าเริงเกินไป',
    'ลนลาน',
    'หงุดหงิด',
    'หวาดหลัว'
  ],
  Blue: [
    'เฉื่อยฉา',
    'ซึมเศร้า',
    'น้อยใจ',
    'เบื่อ',
    'รู้สึกผิด',
    'สิ้นหวัง',
    'เสียใจ',
    'หดหู่',
    'เหงา',
    'อ่อนล้า'
  ],
  Yellow: [
    'กระตือรือร้น',
    'กระวนกระวาย',
    'ตะลึง',
    'ตื่นตกใจ',
    'ตื่นเต้น',
    'ประหม่า',
    'ประหลาดใจ',
    'ปิติยินดี',
    'เปี่ยมพลัง',
    'สับสน'
  ],
  Green: [
    'เชื่อใจ',
    'ถูกยอมรับ',
    'ผ่อนคลาย',
    'พอใจ',
    'ภูมิใจ',
    'มั่นใจ',
    'มีความสุข',
    'สงบ',
    'สนใจ',
    'สนุกสนาน'],
};

const getCardColor = (mood) => {
  console.log("231 mood: " + mood);
  switch (mood) {
    case 'Red':
      return '#f3b0b0'; // Light blue for sadness
    case 'Blue':
      return '#A8E1FA'; // Light yellow for joy
    case 'Yellow':
      return '#EEEA8B'; // Light red for anger
    case 'Green':
      return '#ABD7A0'; // Light green for neutral
    default:
      return '#f0f0f0'; // Default gray
    // }switch (mood) {
    //   case 'sadness':
    //     return '#A8E1FA'; // Light blue for sadness
    //   case 'joy':
    //     return '#EEEA8B'; // Light yellow for joy
    //   case 'anger':
    //     return '#f3b0b0'; // Light red for anger
    //   case 'neutral':
    //     return '#ABD7A0'; // Light green for neutral
    //   case 'fear':
    //     return '#A8E1FA'; // Pale blue for fear
    //   case 'surprise':
    //     return '#EEEA8B'; // Light cream for surprise
    //   default:
    //     return '#f0f0f0'; // Default gray
    // }
  }
}
const EmotionGrid = () => {


  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();
  const [zone, setZone] = useState("");
  const [zoneD, setZoneD] = useState("");
  const emotions = zoneEmotions[zone] || [];
  const [isM, setIsM] = useState(false);
  useEffect(() => {
    const setZoneBasedOnMood = () => {
      switch (mood) {
        case 'sadness':
          setZone('Blue');
          setZoneD(textDes['Blue']);
          break;
        case 'joy':
          setZone('Green');
          setZoneD(textDes['Green']);
          break;
        case 'anger':
          setZone('Red');
          setZoneD(textDes['Red']);
          break;
        case 'neutral':
          setZone('Green');
          setZoneD(textDes['Green']);
          break;
        case 'fear':
          setZone('Yellow');
          setZoneD(textDes['Yellow']);
          break;
        case 'surprise':
          setZone('Yellow');
          setZoneD(textDes['Yellow']);
          break;
        default:
          break;
      }
    };

    setZoneBasedOnMood();
  }, [mood]);

  useEffect(() => {
    const setdata = async () => {

      try {
        mood = location.state?.mood || ''; // Access passed state or set default value
        title = location.state?.title || '';
        text = location.state?.text || '';
        console.log(mood + " Title: " + title + " Text: " + text);
      } catch (error) {
        console.error('Error fetching mood analysis', error);
      }
    };
    setdata();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('userEmail');
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/email/${email}`
        );
        
       
      } catch (error) {
        console.error(error);
      }
    };
    
    const getdata = async()=>{
      const response = await axios.get(
        `http://localhost:8080/api/user/email/${email}`
      );
      console.log(response);
      const membershipStatus = response.data[0]?.membership === 1;
      console.log(membershipStatus);
      setIsM(membershipStatus); // Update the state
      localStorage.setItem('isM', membershipStatus); // Persist in localStorage
    }
getdata();
    // Check localStorage first
    const savedIsM = localStorage.getItem('isM');
    if (savedIsM !== null) {
      setIsM(savedIsM === 'true'); // Retrieve persisted state
    } else {
      fetchData(); // Fetch data if not found in localStorage
    }
  }, []);

  const handleEmotionClick = (emotion) => {

    const handleSubmit = async () => {
      try {
        await axios.post("http://localhost:8080/addDiary", {
          title: title,
          text: text,
          mood: emotion,
          moodZone: zone,
          userId: 1,
          userEmail: localStorage.getItem("userEmail") || "not email",
        });
        console.log(isM);
        if(isM){
          console.log('U');
          await axios.patch(`http://localhost:8080/api/user/update/email/${localStorage.getItem("userEmail") || "not email"}`,{
            canWrite: 1
          }).then((response) =>{
            console.log(response);
          });
        }else{
          console.log(localStorage.getItem('isM'));
          await axios.patch(`http://localhost:8080/api/user/update/email/${localStorage.getItem("userEmail") || "not email"}`,{
            can_write: 0
          });
        }
        
      } catch (error) {
        console.error("Error posting mood data", error);
      }
    };
    const editSubmit = async () => {
      try {
        await axios.patch(`http://localhost:8080/Diary/${id}`, {
          title: title,
          text: text,
          mood: emotion,
          moodZone: zone,
          userId: 1,
          userEmail: localStorage.getItem("userEmail") || "not email",
        });
      } catch (error) {
        console.error("Error posting mood data", error);
      }
    };
    console.log("ID: " + id);
    if(id){
      console.log(id);
      editSubmit();
    }else{
      console.log("no id");
      handleSubmit();
    }
    
    
    navigate(`/encourageDiray`, { state: { zone, emotion } });
  };
  const handleOptionSelect = (option) => {
    setZone(option);
    setZoneD(textDes[option]);
  };
  console.log(mood);
  getCardColor(mood);

  return (
    <Theam backgroundColor={moodZoneColors[zone]}>
      <h2 className='h2'>คุณอยู่ใน {zone} Zone</h2>
      <p style={{padding: '25px'}}> {zoneD} </p>
      <div>
        <label htmlFor="zoneSelect">เปลี่ยนโซนหากไม่พอใจกับผลลัพท์: </label>
        <CustomSelect
          options={["Red", "Blue", "Yellow", "Green"]}
          onSelect={handleOptionSelect}
        />

        {/* <select
          id="zoneSelect"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        >
          {Object.keys(zoneEmotions).map((zoneKey) => (
            <option key={zoneKey} value={zoneKey}>
              {zoneKey}
            </option>
          ))}
        </select> */}
      </div>
      <GridContainer>
        <div className="grid">
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className="diary"
              style={{
                backgroundColor: getCardColor(zone) || "#a8e8d0", // Set background color based on moodZone
              }}

              onClick={() => handleEmotionClick(emotion)}
              cardColor={moodZoneColors[zone]}
            >
              <img src={getImageSource(emotion, zone)} alt={emotion} />
            </div>
          ))}
        </div>
      </GridContainer>
    </Theam>
  );
};

export default EmotionGrid;
