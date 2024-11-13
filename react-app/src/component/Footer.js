import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link, useLocation, and useNavigate from react-router-dom
import { Link as ScrollLink, scroller } from 'react-scroll'; // Import ScrollLink and scroller from react-scroll
import '../css/Footer.css';

const Footer = () => {
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // For programmatic navigation

  const handleScrollLink = (target) => {
    if (location.pathname !== '/') {
      navigate('/'); // Navigate to home page if not on home
      setTimeout(() => {
        // Wait until navigation completes and then scroll
        scroller.scrollTo(target, {
          smooth: true,
          duration: 1000,
          offset: -70, // Optional offset to adjust the scroll position
        });
      }, 100); // Small delay to ensure navigation has completed
    } else {
      // Scroll directly if already on the home page
      scroller.scrollTo(target, {
        smooth: true,
        duration: 1000,
        offset: -70,
      });
    }
  };

  return (
    <div id="footer" className="footer_section">
      <div className="container">
        <div className="footer_section_2">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <h2 className="useful_text">Quick Link</h2>
              <div className="footer_menu">
                <ul>
                  <li className="active">
                    <span onClick={() => handleScrollLink('banner')} className="footer-link" style={{ cursor: 'pointer' }}>
                      Home
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleScrollLink('about')} className="footer-link" style={{ cursor: 'pointer' }}>
                      About Us
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleScrollLink('services')} className="footer-link" style={{ cursor: 'pointer' }}>
                      Services
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleScrollLink('footer')} className="footer-link" style={{ cursor: 'pointer' }}>
                      Contact Us
                    </span>
                  </li>
                  <li>
                    <a href="#">Login</a> {/* If Login is not a section, keep it as a normal link */}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <h2 className="useful_text">Contact Us</h2>
              <div className="footer_menu">
                <ul>
                  <li><a href="#">Hong Tae</a></li>
                  <li><a href="#">Sunny</a></li>
                  <li><a href="mailto:wangboon_b@cmu.ac.th">wangboon_b@cmu.ac.th</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
