import React, { useState } from 'react';
import "./Button.css"

const Button = ({size, onClick, color, children}) => {

    const [className, setClassName] = useState("btn-custom " + size)
    console.log(className);

    return (
        <div className={className} onClick={onClick} style={{backgroundColor: `${color}`}}>
            {children}
        </div>
    );
}

export default Button;
