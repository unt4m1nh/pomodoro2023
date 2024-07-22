import React, { useRef, useState, useEffect } from 'react';
import './Setting.css';

//Global import Font Awesoem Icons 5
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AlarmSounds, SettingTypes, ThemeImages } from '../../global/const.ts';

import Button from '../Button/Button.tsx';
import { useAppState } from '../../context/GeneralSettings.tsx';

const Setting = ({ posX, posY }) => {
  const { updateSettings } = useAppState();
  const [settingMode, setSettingMode] = useState('Theme');
  const [theme, setTheme] = useState(0);
  const [alarm, setAlarm] = useState(0);
  const [volume, setVolume] = useState(50);
  // const [checked, setChecked] = useState(false);

  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);

  const playSelectedAlarm = () => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.play();
    }
  };

  useEffect(() => {
    if (alarmSoundRef.current !== null) {
      alarmSoundRef.current.volume = volume / 100;
      console.log(alarm);
      playSelectedAlarm();
    }
  }, [alarm, volume]);

  const handleChangeVolume = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div
      className='setting-container'
      style={{ position: 'fixed', top: posX, left: posY }}
    >
      <div className='setting-header'>
        <h2>Settings</h2>
      </div>
      <div className='body'>
        <div className='setting-mode'>
          <div
            className={settingMode === 'Theme' ? 'item-active' : 'item'}
            onClick={() => {
              setSettingMode('Theme');
            }}
          >
            <FontAwesomeIcon icon={faImage} />
            Theme
          </div>
          <div
            className={settingMode === 'Sound' ? 'item-active' : 'item'}
            onClick={() => {
              setSettingMode('Sound');
            }}
          >
            <FontAwesomeIcon icon={faMusic} />
            Sound
          </div>
          <div
            className={settingMode === 'Focus Level' ? 'item-active' : 'item'}
            onClick={() => {
              setSettingMode('Focus Level');
            }}
          >
            <FontAwesomeIcon icon={faClock} />
            Focus Level
          </div>
          <div
            className={settingMode === 'Account' ? 'item-active' : 'item'}
            onClick={() => {
              setSettingMode('Account');
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            Account
          </div>
        </div>
        <div className='setting-content'>
          {settingMode === 'Theme' && (
            <div className='setting-content'>
              <h3>Chose theme</h3>
              <div className='theme-list'>
                {ThemeImages.map((element, index) => (
                  <div
                    key={element.id}
                    className='image-container'
                    style={{
                      border:
                        theme === index ? '2px solid var(--neon-blue)' : 'none',
                    }}
                    onClick={() => {
                      setTheme(element.id);
                      updateSettings(SettingTypes.THEME, element.link);
                    }}
                  >
                    <img src={element.link}></img>
                  </div>
                ))}
              </div>
              <Button children={<p>Apply</p>} color='var(--neon-blue)' textColor='#FFF' onClick={() => {}} />
            </div>
          )}
          {settingMode === 'Sound' && (
            <div className='setting-content'>
              <h3>Select alarm sound</h3>
              <div className='sound-list'>
                {AlarmSounds.map((element, index) => (
                  <div className='sound-list-selection' key={element.id}>
                    <div
                      className={alarm === index ? 'radio-active' : 'radio'}
                      onClick={() => {
                        setAlarm(element.id);
                      }}
                    ></div>
                    <p>{element.name}</p>
                  </div>
                ))}
              </div>
              <h3>Volume</h3>
              <div className='volume-container'>
                <input
                  type='range'
                  min='1'
                  max='100'
                  value={volume}
                  className='slider'
                  id='myRange'
                  onChange={handleChangeVolume}
                />
              </div>
              <audio
                ref={alarmSoundRef}
                src={require(`../../assets/sounds/${AlarmSounds[alarm].path}`)}
              ></audio>
              <Button children={<p>Apply</p>} size='small' color='var(--neon-blue)' textColor='#FFF' onClick={() => {}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
