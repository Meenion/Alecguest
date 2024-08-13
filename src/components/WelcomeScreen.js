import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import ReturningVisitorSelection from './ReturningVisitorSelection';

const WelcomeScreen = ({ setScreen }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [isLocationSaved, setIsLocationSaved] = useState(false);
  const [screenMode, setScreenMode] = useState('initial'); // 'initial', 'visitorSelection', 'welcome'

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      setLocation(savedLocation);
      setIsLocationSaved(true);
      setScreenMode('visitorSelection'); // Default to visitor selection mode if location is saved
    }
  }, []);

  const handleSettingsClick = () => {
    setScreen('settings');
  };

  const handleNewVisitorClick = () => {
    setScreen('registration');
  };

  const handleReturningVisitorClick = () => {
    setScreen('returningVisitorSelection');
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: 'numeric', minute: 'numeric',
      second: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="home-page">
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/ALEC-logo-white-header.png`} className="logo" alt="ALEC Logo" />
        <div className="header-right">
          {isLocationSaved && <div className="location-display">{location}</div>}
          <FontAwesomeIcon icon={faCog} className="settings-icon" onClick={handleSettingsClick} />
        </div>
      </header>

      <div className="content">
        {screenMode === 'initial' && (
          <p>Please click on the settings icon to configure device location.</p>
        )}

        {screenMode === 'visitorSelection' && (
          <>
            <h2 className="welcome-text">Welcome to ALEC</h2>
            <div className="visitor-buttons">
              <button className="image-button" onClick={handleNewVisitorClick}>
                <img src={`${process.env.PUBLIC_URL}/new-visitor-icon.png`} alt="New Visitor" />
              </button>
              <button className="image-button" onClick={handleReturningVisitorClick}>
                <img src={`${process.env.PUBLIC_URL}/returning-visitor-icon.png`} alt="Returning Visitor" />
              </button>
            </div>
          </>
        )}

        {screenMode === 'welcome' && (
          <>
            <h2 className="welcome-text">Welcome to ALEC</h2>
            <p>Thank you for checking in!</p>
          </>
        )}
      </div>

      <footer className="footer">
        <div className="left">
          <p>{formatDate(currentDate)}</p>
        </div>
        <div className="right">
          <a href="#" className="privacy-link">Privacy statement</a>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
