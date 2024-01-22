import React, { useState } from 'react';
import "./Button.css"

const Button = ({size, onClick, color, textColor, children}) => {
    const [className, setClassName] = useState("btn-custom " + `${size}`);
    
    return (
        <div className={className} onClick={onClick} style={{backgroundColor: `${color}`,
        color: `${textColor}`}}>
            {children}
        </div>
    );
}

export default Button;
