import React, { useState } from "react";
import axios from "axios";
import "../css/Membership.css";

const Membership = () => {
    const [message, setMessage] = useState("");

    const handleUpgrade = async () => {
        const userEmail = localStorage.getItem("userEmail"); // Get email from localStorage
    
        if (!userEmail) {
            setMessage("User not logged in!");
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8080/api/user/updateMembership?email=${userEmail}`);
            if (response.status === 200) {
                setMessage("Membership upgraded successfully!");
            }
        } catch (error) {
            console.error("Error upgrading membership:", error);
            setMessage("Failed to upgrade membership.");
        }
    };
    

    return (
        <div className="membership-container">
            <h1 className="membership-title">membership</h1>
            <div className="membership-card">
                <h2 className="membership-price">79<span>/month</span></h2>
                <ul className="membership-features">
                    <li>▶ เพิ่มจำนวนไดอารี่</li>
                    <li>▶ มีเครื่องมือการเขียนไดอารี่</li>
                    <li>▶ ปรับขนาดตัวอักษร</li>
                    <li>▶ ปรับฟรอนต์ตัวอักษร</li>
                    <li>▶ ปรับตัวอักษรหนา บาง เอียง</li>
                    <li>▶ ปรับสี</li>
                    <li>▶ ใส่รูป</li>
                    <li>▶ รีเฟรชชาเลนจ์ใหม่ได้ เพื่อหาอันที่ถูกใจ</li>
                </ul>
            </div>
            <button className="membership-button" onClick={handleUpgrade}>
                Click here
            </button>
            {message && <p className="membership-message">{message}</p>}
        </div>
    );
};

export default Membership;