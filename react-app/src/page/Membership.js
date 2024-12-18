import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Membership.css";

const Membership = () => {
    const [message, setMessage] = useState("");
    const [hasMembership, setHasMembership] = useState(false); // Add state for membership status

    const handleUpgrade = async () => {
        const userEmail = localStorage.getItem("userEmail"); // Get email from localStorage

        if (!userEmail) {
            setMessage("กรุณาเข้าสู่ระบบก่อน!");
            return;
        }

        // Check if user already has a membership
        try {
            const response = await axios.get(`http://localhost:8080/api/user/membership?email=${userEmail}`);
            if (response.data > 0) {
                setHasMembership(true);
                setMessage("คุณได้สมัครสมาชิกไปก่อนหน้านี้แล้ว");
                return;
            }
        } catch (error) {
            console.error("Error checking membership status:", error);
            setMessage("ไม่สามารถตรวจสอบสถานะสมาชิกได้!");
            return;
        }
        try{
            const response = await axios.patch(`http://localhost:8080/api/user/update/email/${localStorage.getItem("userEmail") || "not email"}`,{
                canWrite: 1
              });
              console.log(response)
        } catch( error ){
            console.error(error)
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

    useEffect(() => {
        // Check for membership when the component mounts
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            axios
                .get(`http://localhost:8080/api/user/membership?email=${userEmail}`)
                .then((response) => {
                    if (response.data > 0) {
                        setHasMembership(true); // User already has a membership
                        setMessage("คุณได้สมัครสมาชิกไปก่อนหน้านี้แล้ว");
                    }
                })
                .catch((error) => {
                    console.error("Error checking membership status:", error);
                    setMessage("ไม่สามารถตรวจสอบสถานะสมาชิกได้!");
                });
        }
    }, []);

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
            {!hasMembership ? (
                <button className="membership-button" onClick={handleUpgrade}>
                    Upgrade Now
                </button>
            ) : null}
            {message && <p className="membership-message">{message}</p>}
        </div>
    );
};

export default Membership;
