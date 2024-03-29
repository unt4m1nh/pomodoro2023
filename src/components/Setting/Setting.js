import React, { useRef, useState, useEffect } from 'react';
import "./Setting.css"

//Global import Font Awesoem Icons 5
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button/Button';

import { useAppState } from "../../GeneralSettings";

const Setting = ({ posX, posY }) => {

    const { currentSetting, updateSettings } = useAppState();
    const [settingMode, setSettingMode] = useState('Theme');
    const [theme, setTheme] = useState(0);
    const [alarm, setAlarm] = useState(0);
    const [volume, setVolume] = useState(50);
    const [checked, setChecked] = useState(false);

    const alarmSoundRef = useRef(null);

    const themes = [
        {
            id: 0,
            link: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 1,
            link: 'https://images.alphacoders.com/132/1327498.png',
        },
        {
            id: 2,
            link: 'https://images.pexels.com/photos/2187456/pexels-photo-2187456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 3,
            link: 'https://images.pexels.com/photos/2070047/pexels-photo-2070047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        }
    ]
    const alarms = [
        {
            id: 0,
            name: 'Alarm 1',
            path: 'alarm-clock-short-6402.mp3'
        }, {
            id: 1,
            name: 'Alarm 2',
            path: 'clock-alarm-8761.mp3'
        }, {
            id: 2,
            name: 'Alarm 3',
            path: 'simple-notification-152054.mp3'
        }, {
            id: 3,
            name: 'Alarm 4',
            path: 'smartphone_vibrating_alarm_silent-7040.mp3'
        }
    ]

    const playSelectedAlarm = () => {
        console.log(alarm);
        alarmSoundRef.current.play();
    }

    useEffect(() => {
        if (alarmSoundRef.current !== null) {
            alarmSoundRef.current.volume = volume / 100;
            console.log(alarm);
            playSelectedAlarm();
        }
    }, [alarm, volume]);

    const handleStopPlayingAlarm = () => {
        alarmSoundRef.current.pause();
    }

    const handleChangeVolume = (e) => {
        setVolume(e.target.value);
    }

    return (
        <div className='setting-container'
            style={{ position: 'fixed', top: posX, left: posY }}>
            <div className='setting-header'>
                <h2>Settings</h2>
            </div>
            <div className='body'>
                <div className='setting-mode'>
                    <div className={settingMode === 'Theme' ? 'item-active' : 'item'}
                        onClick={() => { setSettingMode('Theme') }}><FontAwesomeIcon icon={faImage} />Theme</div>
                    <div className={settingMode === 'Sound' ? 'item-active' : 'item'}
                        onClick={() => { setSettingMode('Sound') }}><FontAwesomeIcon icon={faMusic} />Sound</div>
                    <div className={settingMode === 'Focus Level' ? 'item-active' : 'item'}
                        onClick={() => { setSettingMode('Focus Level') }}><FontAwesomeIcon icon={faClock} />Focus Level</div>
                    <div className={settingMode === 'Account' ? 'item-active' : 'item'}
                        onClick={() => { setSettingMode('Account') }}><FontAwesomeIcon icon={faUser} />Account</div>
                </div>
                <div className='setting-content'>
                    {
                        settingMode === 'Theme' && (
                            <div className='setting-content'>
                                <h3>Chose theme</h3>
                                <div className='theme-list'>
                                    {
                                        themes.map((element, index) => (
                                            <div key={element.id} className='image-container'
                                                style={{ border: theme === index ? '2px solid var(--neon-blue)' : 'none' }}
                                                onClick={() => {
                                                    setTheme(element.id);
                                                    updateSettings('Theme', element.link);
                                                }}>
                                                <img src={element.link}></img>
                                            </div>
                                        ))
                                    }
                                </div>
                                <Button size="small" color="var(--neon-blue)" textColor="#FFF">Apply</Button>
                            </div>

                        )
                    }
                    {
                        settingMode === 'Sound' && (
                            <div className='setting-content'>
                                <h3>Select alarm sound</h3>
                                <div className='sound-list'>
                                    {
                                        alarms.map((element, index) => (
                                            <div className='sound-list-selection' key={element.id}>
                                                <div className={alarm === index ? 'radio-active' : 'radio'}
                                                    onClick={() => {
                                                        setAlarm(element.id);
                                                    }}
                                                >

                                                </div>
                                                <p>{element.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <h3>Volume</h3>
                                <div className='volume-container'>
                                    <input type="range" min="1" max="100" value={volume} className="slider" id="myRange"
                                        onChange={handleChangeVolume} />
                                </div>
                                <audio ref={alarmSoundRef}
                                    src={require(`../../assets/sounds/${alarms[alarm].path}`)}
                                    volume={volume/100} ></audio>
                                <Button size="small" color="var(--neon-blue)" textColor="#FFF">Apply</Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Setting;
