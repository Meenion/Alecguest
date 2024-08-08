import React, { useState, useEffect } from 'react';
import '../index.css';
import './SettingsPage.css';

const SettingsPage = ({ setScreen }) => {
  const [pin, setPin] = useState('');
  const [isPinEntered, setIsPinEntered] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/lookup.json')
      .then(response => response.json())
      .then(data => {
        setLocations(data.locations);
      })
      .catch(error => console.error('Error fetching locations:', error))
      .finally(() => setIsLoading(false));
  }, []);
  
  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePinSubmit();
    }
  };

  const handlePinSubmit = () => {
    if (pin === '1234') { // Adjust your validation logic as needed
      setIsPinEntered(true);
    } else {
      alert('Incorrect PIN');
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('selectedLocation', selectedLocation);
    setScreen('visitorSelection'); // This updates the screen to the visitor selection mode
  };

  if (isLoading) {
    return <div className="settings-page">Loading...</div>;
  }

  return (
    <div className="settings-page">
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/ALEC-logo-white-header.png`} className="logo" alt="ALEC Logo" />
      </header>

      <div className="content">
        {!isPinEntered ? (
          <>
            <h2 className="centered-text">Enter PIN*</h2>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your PIN"
              className="pin-input"
            />
          </>
        ) : (
          <div className="location-selection">
            <h2 className="centered-text">Please select device location *</h2>
            <div className="custom-combobox">
              <select value={selectedLocation} onChange={handleLocationChange} className="location-dropdown">
                <option value="">Select a location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleSave} className="save-button">Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
