import React, { useState } from 'react';
import "./Setting.css"

const Setting = ({ posX, posY }) => {

    return (
        <div className='setting-container'
            style={{ position: 'fixed', top: `${posX}`, left: `${posY}` }}>
            <h1>Settings Tab</h1>
        </div>
    )
}

export default Setting;
