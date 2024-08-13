import React, { useState, useEffect } from 'react';
import './CheckinScreen.css';

const CheckinScreen = ({ setScreen, onCheckIn }) => {
    const [alecUsers, setAlecUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [visitReason, setVisitReason] = useState('');
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [guestNames, setGuestNames] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        fetch('/lookup.json')
            .then(response => response.json())
            .then(data => setAlecUsers(data.users));
    }, []);

    const handleCheckIn = () => {
        const checkInData = {
            visitorName: selectedUser,
            alecUserHost: selectedUser,
            visitReason,
            noOfGuests,
            guestNames: guestNames.split(',').map(name => name.trim()),
            locationId: 1,
            checkInDate: new Date().toISOString()
        };

        fetch('/save-checkin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkInData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Check-in successful:', data);
                onCheckIn(); // Notify App component that check-in is complete
                setScreen('welcome');
            })
            .catch(error => {
                console.error('Error during check-in:', error);
            });
    };

    return (
        <div className="checkin-container">
            <h1>Welcome to ALEC</h1>
            <div className="form-group">
                <label>Who are you visiting?</label>
                <input 
                    list="alec-users" 
                    value={selectedUser} 
                    onChange={(e) => setSelectedUser(e.target.value)} 
                    placeholder="Select ALEC user" 
                />
                <datalist id="alec-users">
                    {alecUsers.map((user, index) => (
                        <option key={index} value={user.name} />
                    ))}
                </datalist>
            </div>
            <div className="form-group">
                <label>Reason for Visit *</label>
                <input
                    type="text"
                    value={visitReason}
                    onChange={(e) => setVisitReason(e.target.value)}
                    placeholder="Meeting"
                />
            </div>
            <div className="form-group">
                <label>No. of Guests</label>
                <input
                    type="number"
                    value={noOfGuests}
                    onChange={(e) => setNoOfGuests(e.target.value)}
                    min="1"
                />
            </div>
            <div className="form-group">
                <label>Guest Names *</label>
                <textarea
                    value={guestNames}
                    onChange={(e) => setGuestNames(e.target.value)}
                    placeholder="Please enter guest names separated by commas"
                />
            </div>
            <button className="checkin-button" onClick={handleCheckIn}>Check In</button>
        </div>
    );
};

export default CheckinScreen;
