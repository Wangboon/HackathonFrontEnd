import React, { useState } from "react";
import axios from "axios";
import "../css/Membership.css";

const Membership = () => {
    const [message, setMessage] = useState("");

    const handleUpgrade = async () => {
        const userEmail = localStorage.getItem("userEmail"); // Get email from localStorage

        if (!userEmail) {
            setMessage("กรุณาเข้าสู่ระบบก่อน!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/user/updateMembership?email=${userEmail}`);
            if (response.status === 200) {
                setMessage("อัปเกรดสมาชิกเรียบร้อย!");
            }
        } catch (error) {
            console.error("Error upgrading membership:", error);
            setMessage("ไม่สามารถอัปเกรดสมาชิกได้!");
        }
    };

    return (
        <div className="membership-container">
            <h1 className="membership-title">Membership</h1>
            <div className="membership-card">
                <h2 className="membership-price">
                    79<span>/Month</span>
                </h2>
                <ul className="membership-features">
                    <li>เขียนไดอารี่ได้ไม่จำกัด</li>
                    <li>เขียนข้อความในไดอารี่ได้ไม่จำกัด</li>
                    <li>มีแถบเครื่องมือของไดอารี่</li>
                    <li>ปรับขนาดตัวอักษร</li>
                    <li>เปลี่ยนฟอนต์และสีของตัวอักษร</li>
                    <li>ปรับตัวอักษรเป็นหนา, เอียง, บาง</li>
                    <li>สามารถรีเฟรชชาเลนจ์ได้</li>
                </ul>
            </div>
            <button className="membership-button" onClick={handleUpgrade}>
                Upgrade Now
            </button>
            {message && <p className="membership-message">{message}</p>}
        </div>
    );
};

export default Membership;
