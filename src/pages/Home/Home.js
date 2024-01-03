import { useEffect, useState } from "react";

function Home() {

    const [time, setTime] = useState(1200);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Pomodoro');


    useEffect(() => {
        let timerId
        if (isRunning) {
            timerId = setInterval(
            () => {
                setTime(prevState => prevState - 1);
                console.log(time);
            }, 1000);
        } else {
            clearInterval(timerId);
        }
    
        return () => clearInterval(timerId)
    }, [isRunning]);

    const handleStartClock = () => {
        setIsRunning(true);
    }

    const handleStopClock = () => {
        setIsRunning(false);
    }
    
    const handleResetClock = () => {
        setIsRunning(false);
        setTime(1200);
    }

    const handleChangeMode = (modeSelected) => {
        if (modeSelected === 'Pomodoro') {
            setMode('Pomodoro');
            setTime(1200);
        } else if (modeSelected === 'Short Break') {
            setMode('Short Break');
            handleStopClock();
            setTime(300)
        } else {
            setMode('Long Break');
            handleStopClock();
            setTime(600)
        }
    }



    return (
        <div>
            <div className="header">
                <h1>Pomodoro Clock</h1>
            </div>
            <div className="content">
                <div className="content-mode-selection">
                    <ul>
                        <li style={{color: mode === 'Pomodoro' ? "red" : "black"}} onClick={() => {handleChangeMode('Pomodoro')}}>Pomodoro</li>
                        <li style={{color: mode === 'Short Break' ? "red" : "black"}} onClick={() => {handleChangeMode('Short Break')}}>Short Break</li>
                        <li style={{color: mode === 'Long Break' ? "red" : "black"}} onClick={() => {handleChangeMode('Long Break')}}>Long Break</li>
                    </ul>
                </div>
                <h1>{time}</h1>
                <button onClick={handleStartClock}>Play</button>
                <button onClick={handleStopClock}>Stop</button>
                <button onClick={handleResetClock}>Reset</button>
            </div>
        </div>
    );
}

export default Home;