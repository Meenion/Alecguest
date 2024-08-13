import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SettingsPage from './components/SettingsPage';
import RegistrationPage from './components/RegistrationPage';
import CheckinScreen from './components/CheckinScreen';
import ReturningVisitorSelection from './components/ReturningVisitorSelection';

const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [screenMode, setScreenMode] = useState('welcome'); // Default to 'welcome'

  return (
    <div>
      {screen === 'welcome' && <WelcomeScreen setScreen={setScreen} screenMode={screenMode} />}
      {screen === 'settings' && <SettingsPage setScreen={setScreen} />}
      {screen === 'visitorSelection' && <WelcomeScreen setScreen={setScreen} screenMode="visitorSelection" />}
      {screen === 'registration' && <RegistrationPage setScreen={setScreen} />}
      {screen === 'checkin' && <CheckinScreen setScreen={setScreen} />}
      {screen === 'returningVisitorSelection' && <ReturningVisitorSelection setScreen={setScreen} />}
    </div>
  );
};

export default App;
