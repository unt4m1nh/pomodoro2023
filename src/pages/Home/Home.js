import { useEffect, useState } from "react";
import "./Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";

function Home() {
    const [time, setTime] = useState(1200);
    const [minutes, setMinutes] = useState(parseInt(time / 60));
    const [seconds, setSeconds] = useState('00');
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Pomodoro');
    const [task, setTask] = useState([]);
    const [taskValue, setTaskValue] = useState('');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [rotation, setRotation] = useState(0);


    useEffect(() => {
        let timerId
        if (isRunning) {
            let titleClock = time;
            let titleMinutes = parseInt(time / 60);
            let titleSeconds = time % 60;
            timerId = setInterval(
                () => {
                    setTime(prevState => prevState - 1);
                    if (parseInt(titleClock / 60) < 10) {
                        titleMinutes = '0' + parseInt(titleClock / 60);
                        setMinutes(titleMinutes);
                    } else {
                        titleMinutes = parseInt(titleClock / 60);
                        setMinutes(titleMinutes);
                    }
                    if (titleClock % 60 < 10) {
                        titleSeconds = '0' + titleClock % 60;
                        setSeconds(titleSeconds);
                    } else {
                        titleSeconds = titleClock % 60;
                        setSeconds(titleSeconds);
                    }
                    if (titleMinutes === 0 && titleSeconds === 0) {
                        clearInterval(timerId);
                    }
                    document.title = mode + ' ' + titleMinutes + ':' + titleSeconds;
                    titleClock = titleClock - 1;

                }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId)
    }, [isRunning]);

    console.log(time);



    const handleStartClock = () => {
        setIsRunning(true);
    }

    const handleStopClock = () => {
        setIsRunning(false);
    }

    const handleResetClock = (currentMode) => {
        setIsRunning(false);
        setRotation(rotation + 360);
        if (currentMode === 'Pomodoro') {
            setTime(1200);
            setMinutes(20);
            setSeconds('00');
        } else if (currentMode === 'Short Break') {
            setTime(10);
            setMinutes('00');
            setSeconds('10');
        } else {
            setTime(600);
            setMinutes(10);
            setSeconds('00');
        }
    }

    const handleChangeMode = (modeSelected) => {
        if (modeSelected === 'Pomodoro') {
            setMode('Pomodoro');
            document.title = modeSelected
            handleStopClock();
            setTime(1200);
            setMinutes(20);
            setSeconds('00');
        } else if (modeSelected === 'Short Break') {
            setMode('Short Break');
            document.title = modeSelected
            handleStopClock();
            setTime(10);
            setMinutes('00');
            setSeconds('10');
        } else {
            setMode('Long Break');
            document.title = modeSelected
            handleStopClock();
            setTime(600);
            setMinutes(10);
            setSeconds('00');
        }
    }

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    }

    const addTask = (taskName) => {
        if (taskName !== '') {
            setTask(prevState => [...prevState, taskName])
            setTaskValue('');
        }
    }

    const clearTask = () => {
        setTask([]);
    }


    return (
        <div>
            <div className="header">
                <h1>Pomodoro Clock</h1>
            </div>
            <div className="content">
                <div className="content-mode-selection">
                    <div className={mode === 'Pomodoro' ? "modeActive" : "mode"} onClick={() => { handleChangeMode('Pomodoro') }}>Pomodoro</div>
                    <div className={mode === 'Short Break' ? "modeActive" : "mode"} onClick={() => { handleChangeMode('Short Break') }}>Short Break</div>
                    <div className={mode === 'Long Break' ? "modeActive" : "mode"} onClick={() => { handleChangeMode('Long Break') }}>Long Break</div>
                </div>
                <h1>{task.length !== 0 ? task[0] : 'You are not on any tasks !'}</h1>
                <h1 className="time">{`${minutes} : ${seconds}`}</h1>
                <div className="content-clock-buttons">
                    {
                        !isRunning ?
                            <Button size="large" onClick={handleStartClock} color="var(--hazel-light)">Start</Button> :
                            <Button size="large" onClick={handleStopClock} color="var(--hazel-light)">Pause</Button>
                    }
                    <FontAwesomeIcon className="icon" icon={faRotateRight} size="2xl" onClick={() => {
                        handleResetClock(mode);
                    }}
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </div>
                <h2>Task list</h2>
                <div className="input-row">
                    <input type="text" placeholder="Add task here" value={taskValue} onChange={(e) => setTaskValue(e.target.value)}></input>
                    <FontAwesomeIcon className="btn-add" icon={faPlusCircle} size="3x" onClick={() => {addTask(taskValue)}} ></FontAwesomeIcon>
                </div>
                <ul>
                    {
                        task.map((index) => (
                            <li key={index}>{index}</li>
                        ))
                    }
                </ul>
                <Button size="large" onClick={clearTask} color="var(--hazel-light)">Clear task list</Button>
            </div>
            <button onClick={toggleFullScreen} className="btn-fullscreen">Full Screen</button>
        </div>
    );
}

export default Home;