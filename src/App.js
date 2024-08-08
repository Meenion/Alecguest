import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SettingsPage from './components/SettingsPage';
import RegistrationPage from './components/RegistrationPage';
import CheckinScreen from './components/CheckinScreen';
import ReturningVisitorSelection from './components/ReturningVisitorSelection'; // Import the new component

const App = () => {
  const [screen, setScreen] = useState('welcome');

  return (
    <div>
      {screen === 'welcome' && <WelcomeScreen setScreen={setScreen} isVisitorSelectionMode={screen === 'visitorSelection'} />}
      {screen === 'settings' && <SettingsPage setScreen={setScreen} />}
      {screen === 'visitorSelection' && <WelcomeScreen setScreen={setScreen} isVisitorSelectionMode={true} />}
      {screen === 'registration' && <RegistrationPage setScreen={setScreen} />}
      {screen === 'checkin' && <CheckinScreen />}
      {screen === 'returningVisitorSelection' && <ReturningVisitorSelection setScreen={setScreen} />} {/* Add ReturningVisitorSelection */}
    </div>
  );
};

export default App;
