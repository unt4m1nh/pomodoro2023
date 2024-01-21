import React, { useState } from 'react';
import "./Setting.css"

//Global import Font Awesoem Icons 5
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Setting = ({posX, posY }) => {

    const [settingMode, setSettingMode] = useState('Theme');
    return (
        <div className='setting-container'
            style={{ position: 'fixed', top: posX, left: posY}}>
            <h1>Settings</h1>
            <div className='body'>
                <div className='setting-mode'>
                    <div className={settingMode === 'Theme' ? 'item-active' : 'item'}
                    onClick={() => {setSettingMode('Theme')}}><FontAwesomeIcon icon={faImage} />Theme</div>
                    <div className={settingMode === 'Sound' ? 'item-active' : 'item'}
                    onClick={() => {setSettingMode('Sound')}}><FontAwesomeIcon icon={faMusic} />Sound</div>
                    <div className={settingMode === 'Focus Level' ? 'item-active' : 'item'}
                    onClick={() => {setSettingMode('Focus Level')}}><FontAwesomeIcon icon={faClock} />Focus Level</div>
                    <div className={settingMode === 'Account' ? 'item-active' : 'item'}
                    onClick={() => {setSettingMode('Account')}}><FontAwesomeIcon icon={faUser} />Account</div>
                </div>
                <div className='setting-content'>
                    <h1>Setting content</h1>
                </div>
            </div>
        </div>
    )
}

export default Setting;
