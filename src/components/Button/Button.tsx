import React, { useState } from 'react';
import "./Button.css"

interface IButtonProps {
    size?: String,
    onClick: () => void;
    color?: string;
    textColor?: string;
    children: React.ReactNode
}

const Button = ({size, onClick, color, textColor, children}: IButtonProps) => {
    const [className, setClassName] = useState("btn-custom " + `${size}`);
    
    return (
        <div className={className} onClick={onClick} style={{backgroundColor: `${color}`,
        color: `${textColor}`}}>
            {children}
        </div>
    );
}

export default Button;
