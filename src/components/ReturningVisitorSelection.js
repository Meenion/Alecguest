import React, { useState, useEffect } from 'react';
import '../index.css';
import './ReturningVisitorSelection.css';

const ReturningVisitorSelection = ({ setScreen }) => {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/visitor.json`)
      .then(response => response.json())
      .then(data => setVisitors(data))
      .catch(error => console.error('Error fetching visitors:', error));
  }, []);

  const handleVisitorChange = (e) => {
    const visitorName = e.target.value;
    const visitor = visitors.find(v => v.name === visitorName);
    setSelectedVisitor(visitor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setScreen('checkin');
  };

  return (
    <div className="returning-visitor-page">
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/ALEC-logo-white-header.png`} className="logo" alt="ALEC Logo" />
      </header>

      <div className="content">
        <h3>Select Returning Visitor</h3>
        {!selectedVisitor ? (
          <div className="visitor-selector">
            <label className="label">
              Returning Visitor
              <select onChange={handleVisitorChange} value={selectedVisitor ? selectedVisitor.name : ''}>
                <option value="" disabled>Select a returning visitor</option>
                {visitors.map((visitor, index) => (
                  <option key={index} value={visitor.name}>
                    {visitor.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="returning-visitor-form">
          <div className="form-row">
            <label>
              Name *
              <input 
                type="text" 
                value={selectedVisitor.name} 
                onChange={(e) => setSelectedVisitor({ ...selectedVisitor, name: e.target.value })} 
              />
            </label>
            <label>
              Phone *
              <input 
                type="text" 
                value={selectedVisitor.phone} 
                readOnly 
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Company
              <input 
                type="text" 
                value={selectedVisitor.company} 
                onChange={(e) => setSelectedVisitor({ ...selectedVisitor, company: e.target.value })} 
              />
            </label>
            <label>
              Email
              <input 
                type="email" 
                value={selectedVisitor.email} 
                onChange={(e) => setSelectedVisitor({ ...selectedVisitor, email: e.target.value })} 
              />
            </label>
          </div>
          <button type="submit">Check In</button>
        </form>
      )}
    </div>
  </div>
);
};

export default ReturningVisitorSelection;