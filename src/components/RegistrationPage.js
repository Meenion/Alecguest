import React, { useState, useEffect } from 'react';
import '../index.css';
import './RegistrationPage.css';

const RegistrationPage = ({ setScreen }) => {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/visitor.json`)
      .then(response => response.json())
      .then(data => setVisitors(data.visitors || []))
      .catch(error => console.error('Error fetching visitors:', error));
  }, []);

  const handleVisitorChange = (e) => {
    const visitorName = e.target.value;
    const selected = visitors.find(visitor => visitor.name === visitorName);
    setSelectedVisitor(selected);
    if (selected) {
      setScreen('returningVisitorForm', { visitor: selected });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const registrationData = {
      name,
      phone,
      company,
      email
    };

    fetch('http://localhost:5001/save-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setScreen('checkin'); // Navigate to CheckinScreen after saving
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="registration-page">
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/ALEC-logo-white-header.png`} className="logo" alt="ALEC Logo" />
      </header>

      <div className="content">
        <h3>Welcome to ALEC</h3>
     
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <label>
              Name *
              <input 
                type="text" 
                placeholder="Please enter your full name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </label>
            <label>
              Phone *
              <input 
                type="text" 
                placeholder="Please enter your phone number"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Company
              <input 
                type="text" 
                placeholder="Please enter your company name"
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
              />
            </label>
            <label>
              Email
              <input 
                type="email" 
                placeholder="Please enter your email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </label>
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
