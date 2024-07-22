import './App.css';
import Home from './pages/Home/Home';
import { GeneralSettings } from './context/GeneralSettings.tsx';
import React from 'react';

function App() {
  return (
    <GeneralSettings>
      <div className='App'>
        <Home />
      </div>
    </GeneralSettings>
  );
}

export default App;
