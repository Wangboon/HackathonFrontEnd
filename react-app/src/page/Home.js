import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll
import '../css/Home.css'; // Import your CSS file
import BannerImage from '../images/Diary-banner-17309_131119125150.jpg'; // Directly import the banner image
import GoalIcon from '../images/goal.png';
import DiaryIcon from '../images/diary.png';
import DashboardIcon from '../images/dashboard.png';
import AboutImage from '../images/DiaryBlue.jpg';
import GreenZone from '../images/GreenZone.png';
import BlueZone from '../images/BlueZone.png';
import YellowZone from '../images/YellowZone.png';
import RedZone from '../images/RedZone.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [membership, setMembership] = useState(null); // State สำหรับเก็บค่า membership
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        // ดึง email จาก LocalStorage
        const email = localStorage.getItem("userEmail");
        if (email) {
            setUserEmail(email);
            fetchMembership(email);
        }
    }, []);

    const fetchMembership = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/membership?email=${email}`);
            setMembership(response.data); // บันทึกค่า membership
        } catch (error) {
            console.error("Error fetching membership:", error);
        }
    };

    return (
        <div>
            {/* Banner Section */}
            <div className="banner_section" style={{ backgroundImage: `url(${BannerImage})`,opacity: 1 }}>
                <div className="container">
                    <div id="main_slider" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h1 className="banner_taital">Upgrade to Membership</h1>
                                            <p className="banner_text">For more diary tools.</p>
                                            <div className="read_bt"><Link to="/membership">membership</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h1 className="banner_taital">Do you want to know this website?</h1>
                                            <p className="banner_text">let go.</p>
                                            <div className="read_bt"><ScrollLink to="about" smooth={true} duration={1000} className="footer-link">
                                                About Us
                                            </ScrollLink></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="carousel-control-next" href="#main_slider" role="button" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Service Section */}
            <div id="services" className="service_section">
                <div className="container">
                    <h1 className="service_taital">Services</h1>
                    <div className="service_section_2 row">
                        <div className="col-lg-4 col-sm-4">
                            <div className="service_box">
                                <div className="building_icon"><img src={GoalIcon} alt="Goal Icon" /></div>
                                <h4 className="residential_text">Challenge</h4>
                                <p className="service_text">วันนี้มาทำชาแลนจ์ง่ายๆกันนะ</p>
                            </div>
                            {/* ตรวจสอบ membership */}
                            {membership === 1 ? (
                                <div className="readmore_bt">
                                    <Link to="/challenge">CHALLENGE</Link>
                                </div>
                            ) : membership === 0 ? (
                                <div className="readmore_bt">
                                    <Link to="/challengeNomember">CHALLENGE</Link>
                                </div>
                            ) : (
                                <div className="readmore_bt">
                                    <Link to="/challengeNomember">CHALLENGE</Link>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="service_box">
                                <div className="building_icon"><img src={DiaryIcon} alt="Diary Icon" /></div>
                                <h4 className="residential_text">Diary Mood</h4>
                                <p className="service_text">
                                    มาทำไดอารี่เพื่อระบายอารมร์ของคุณ และเป็นการได้ทราบความรู้สึกในใจลึกๆว่าคุณนั้นรู้สึกอย่างไร
                                </p>

                            </div>
                            <div className="readmore_bt"><Link to="/diaryMain">DIARY MOOD</Link></div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="service_box">
                                <div className="building_icon"><img src={DashboardIcon} alt="Dashboard Icon" /></div>
                                <h4 className="residential_text">Dashboard</h4>
                                <p className="service_text">ดูสถิติต่างๆของคุณได้ในนี้</p>

                            </div>
                            <div className="readmore_bt"><Link to="/dashboard">DASHBOARD</Link></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="about_section">
                <div className="container">
                    <h1 className="about_taital">About Us</h1>
                    <div className="about_section_2 row">
                        <div className="col-md-6">
                            <div className="about_taital_main">
                                <h1 className="slightly_text">MoodJourney?</h1>
                                <p className="lorem_text">
                                    เป้าหมายของเว็บไซต์นี้คือการช่วยเหลือวัยรุ่นที่เป็นซึมเศร้าหรือมีความเสี่ยงในการดูแลสุขภาพจิต ผ่านการเขียน diary ส่วนตัวและเป็นการให้กำลังใจ ผ่อนคลายจิตใจ
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="about_img"><img src={AboutImage} alt="Diary" /></div>
                        </div>
                    </div>
                </div>
            </div>

           {/* AI Section */}
           <div className="testimonial_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="testimonial_taital">AI Help?</h1>
                            <p className="testimonial_text">
                                เราใช้ AI เพื่อช่วยผู้ใช้ระบุอารมณ์ของตนเองได้ง่ายขึ้น
                            </p>
                        </div>
                    </div>

                    {/* Carousel for Testimonials */}
                    <div id="my_slider" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {/* Testimonial 1 */}
                            <div className="carousel-item active">
                                <div className="testimonial_section_2">
                                    <div className="testimonial_left">
                                        <div className="client_img">
                                            <img src={GreenZone} alt="Client" />
                                        </div>
                                    </div>
                                    <div className="testimonial_right">
                                        <h4 className="markro_text">Green Zone</h4>
                                        <p className="many_text">
                                            แสดงถึงอารมณ์ที่สมดุล ผ่อนคลาย และสงบในจิตใจ ช่วงเวลานี้เป็นโอกาสสำหรับการพักผ่อนทั้งกายและใจ
                                            เพื่อฟื้นฟูพลังงานและสร้างแรงบันดาลใจใหม่ การอยู่ในโซนนี้ช่วยให้เรามองเห็นความงามในสิ่งรอบตัว
                                            และสร้างความสัมพันธ์ที่ดีกับตัวเองและผู้อื่น
                                        </p>

                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="carousel-item">
                                <div className="testimonial_section_2">
                                    <div className="testimonial_left">
                                        <div className="client_img">
                                            <img src={BlueZone} alt="Client" />
                                        </div>
                                    </div>
                                    <div className="testimonial_right">
                                        <h4 className="markro_text">Blue Zone</h4>
                                        <p className="many_text">
                                            สะท้อนถึงอารมณ์ที่นิ่งลึกและต้องการการดูแล เช่น ความสงบในช่วงเวลาที่ทบทวนตัวเอง
                                            แม้จะเป็นพื้นที่ที่อาจรู้สึกอ่อนไหวหรือเศร้า แต่โซนนี้ช่วยให้เราเชื่อมต่อกับความรู้สึกภายใน
                                            และสร้างความเข้าใจที่ลึกซึ้งเกี่ยวกับตัวเองและสิ่งที่เรากำลังเผชิญ
                                        </p>

                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="carousel-item">
                                <div className="testimonial_section_2">
                                    <div className="testimonial_left">
                                        <div className="client_img">
                                            <img src={YellowZone} alt="Client" />
                                        </div>
                                    </div>
                                    <div className="testimonial_right">
                                        <h4 className="markro_text">Yellow Zone</h4>
                                        <p className="many_text">
                                            แสดงถึงอารมณ์ที่เปี่ยมไปด้วยพลังงานและความตื่นเต้น โซนนี้เป็นพื้นที่ของการกระตือรือร้น
                                            และการพร้อมที่จะก้าวข้ามขีดจำกัดของตัวเอง เป็นช่วงเวลาที่เราสามารถสร้างสรรค์สิ่งใหม่
                                            และใช้พลังงานเชิงบวกเพื่อผลักดันให้บรรลุเป้าหมายที่ตั้งไว้
                                        </p>

                                    </div>
                                </div>
                            </div>



                            {/* Testimonial 4 */}
                            <div className="carousel-item">
                                <div className="testimonial_section_2">
                                    <div className="testimonial_left">
                                        <div className="client_img">
                                            <img src={RedZone} alt="Client" />
                                        </div>
                                    </div>
                                    <div className="testimonial_right">
                                        <h4 className="markro_text">Red Zone</h4>
                                        <p className="many_text">
                                            เป็นอารมณ์ที่เข้มข้นและทรงพลัง ซึ่งอาจเกิดจากความรู้สึกที่ต้องการการตอบสนองอย่างเร่งด่วน
                                            ช่วงเวลานี้เป็นโอกาสในการเรียนรู้ที่จะควบคุมและเปลี่ยนแปลงอารมณ์อย่างเหมาะสม
                                            เพื่อสร้างสมดุลในจิตใจและความมั่นคงในชีวิต
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <a className="carousel-control-prev" href="#my_slider" role="button" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="carousel-control-next" href="#my_slider" role="button" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
