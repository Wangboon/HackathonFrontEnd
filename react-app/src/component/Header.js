import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll'; // Import ScrollLink and scroller from react-scroll
import '../css/Header.css';

const Header = () => {
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // For programmatic navigation

  const handleScrollLink = (target) => {
    if (location.pathname !== '/') {
      navigate('/'); // Navigate to home page if not on home
      setTimeout(() => {
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

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Remove user email from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  const userEmail = localStorage.getItem('userEmail'); // Get the user's email from localStorage

  return (
    <div className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">MoodJourney</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {location.pathname === '/' ? (
                  <ScrollLink to="banner" smooth={true} duration={1000} className="nav-link">
                    Home
                  </ScrollLink>
                ) : (
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => handleScrollLink('about')}
                  style={{ cursor: 'pointer' }}
                >
                  About
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => handleScrollLink('services')}
                  style={{ cursor: 'pointer' }}
                >
                  Services
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => handleScrollLink('footer')}
                  style={{ cursor: 'pointer' }}
                >
                  Contact
                </span>
              </li>
              {!userEmail ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item" style={{ marginRight: '20px' }}>
                    <span className="nav-link">{userEmail}</span> {/* Display the username */}
                  </li>
                  <li className="nav-item" style={{ marginRight: '20px' }}>
                    <span
                      className="nav-link"
                      onClick={handleLogout}
                      style={{ cursor: 'pointer' }}
                    >
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
