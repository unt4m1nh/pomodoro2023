import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function GeneralSettings({ children }) {
    const [currentSetting, setCurrentSetting] = useState({
        theme: 0,
        notificationSound: 0,
        volume: 50,
        pomodoroTime: 1200,
        shortBreakTime: 300,
        longBreakTime: 600,
    }
    );

    const updateSettings = (setting, newValue) => {
        if (setting === 'Theme') {
            setCurrentSetting({...currentSetting, theme: newValue})
        }
        if (setting === 'Notification Sound') {
            setCurrentSetting({...currentSetting, notificationSound: newValue})
        }
        if (setting === 'Volume') {
            setCurrentSetting({...currentSetting, volume: newValue})
        }
        if (setting === 'Pomodoro Time') {
            setCurrentSetting({...currentSetting, pomodoroTime: newValue})
        }
        if (setting === 'Short Break Time') {
            setCurrentSetting({...currentSetting, shortBreakTime: newValue})
        }
        if (setting === 'Long Break Time') {
            setCurrentSetting({...currentSetting, longBreakTime: newValue})
        }
        
    };

    return (
        <AppContext.Provider value={{ currentSetting, updateSettings }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppState() {
    return useContext(AppContext);
}