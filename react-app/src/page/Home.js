import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll
import '../css/Home.css'; // Import your CSS file
import BannerImage from '../images/BannerHomeDiary.jpg'; // Directly import the banner image
import GoalIcon from '../images/goal.png';
import DiaryIcon from '../images/diary.png';
import DashboardIcon from '../images/dashboard.png';
import AboutImage from '../images/DiaryBlue.jpg';

const Home = () => {
    return (
        <div>
            {/* Banner Section */}
            <div className="banner_section" style={{ backgroundImage: `url(${BannerImage})` }}>
                <div className="container">
                    <div id="main_slider" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h1 className="banner_taital">Upgrade to Membership</h1>
                                            <p className="banner_text">For more diary tools.</p>
                                            <div className="read_bt"><a href="#">Membership</a></div>
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
                            <div className="readmore_bt"><a href="#">CHALLENGE</a></div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="service_box">
                                <div className="building_icon"><img src={DiaryIcon} alt="Diary Icon" /></div>
                                <h4 className="residential_text">Diary Mood</h4>
                                <p className="service_text">
                                    มาทำไดอารี่เพื่อระบายอารมร์ของคุณ และเป็นการได้ทราบความรู้สึกในใจลึกๆว่าคุณนั้นรู้สึกอย่างไร
                                </p>

                            </div>
                            <div className="readmore_bt"><a href="#">DIARY MOOD</a></div>
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
        </div>
    );
};

export default Home;
