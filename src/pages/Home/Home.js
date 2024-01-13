import { useEffect, useState } from "react";
import "./Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//Global import Font Awesoem Icons 5
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";


import Button from "../../components/Button/Button";

//Global variables
const circleWidth = 600;
const strokeWidth = 50;
const radius = (circleWidth - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

function Home() {
    const [time, setTime] = useState(1200);
    const [fixedTime, setFixedTime] = useState(1200);
    const [minutes, setMinutes] = useState(parseInt(time / 60));
    const [seconds, setSeconds] = useState('00');
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Pomodoro');
    const [tasks, setTasks] = useState([]);
    const [taskValue, setTaskValue] = useState('');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [perTimeLeft, setPerTimeLeft] = useState(100);

    const dashOffset = circumference - (circumference * perTimeLeft ) / 100;
    console.log(perTimeLeft)

    useEffect(() => {
        let timerId
        if (isRunning) {
            let titleClock = time;
            let titleMinutes = parseInt(time / 60);
            let titleSeconds = time % 60;
            let percent = 100;
            timerId = setInterval(
                () => {
                    percent = parseInt(titleClock / fixedTime * 100);
                    setTime(prevState => prevState - 1);
                    setPerTimeLeft(percent)
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
                    console.log(titleMinutes, titleSeconds);
                    if (titleMinutes === '00' && titleSeconds === '00') {
                        console.log('Time out');
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
            setFixedTime(1200);
            setMinutes(20);
            setSeconds('00');
            setPerTimeLeft(100);
        } else if (currentMode === 'Short Break') {
            setTime(10);
            setFixedTime(10);
            setMinutes('00');
            setSeconds('10');
            setPerTimeLeft(100);
        } else {
            setTime(600);
            setFixedTime(600);
            setMinutes(10);
            setSeconds('00');
            setPerTimeLeft(100);
        }
    }

    const handleChangeMode = (modeSelected) => {
        if (modeSelected === 'Pomodoro') {
            setMode('Pomodoro');
            document.title = modeSelected
            handleStopClock();
            setTime(1200);
            setFixedTime(1200);
            setMinutes(20);
            setSeconds('00');
            setPerTimeLeft(100);
        } else if (modeSelected === 'Short Break') {
            setMode('Short Break');
            document.title = modeSelected
            handleStopClock();
            setTime(10);
            setFixedTime(10);
            setMinutes('00');
            setSeconds('10');
            setPerTimeLeft(100);
        } else {
            setMode('Long Break');
            document.title = modeSelected
            handleStopClock();
            setTime(600);
            setFixedTime(600);
            setMinutes(10);
            setSeconds('00');
            setPerTimeLeft(100);
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
            const newTask = {
                id: "Task" + tasks.length,
                name: taskName
            }
            setTasks(prevState => [...prevState, newTask])
            setTaskValue('');
        }
    }

    const deleteTask = (index) => {
        const deletedTask = [...tasks];
        if (index === tasks.length - 1) {
            deletedTask.pop();
        } else {
            for (let i = index; i < deletedTask.length - 1; i++) {
                deletedTask[i] = deletedTask[i + 1];
            }
            deletedTask.pop();
        }
        return setTasks(deletedTask)
    }

    const clearTask = () => {
        setTasks([]);
    }

    const handleDragAndDrop = (results) => {
        const { source, destination, type } = results;

        if (!destination) return;

        if (source.droppableId === destination.draggableId &&
            source.index === destination.index)
            return;

        if (type === 'group') {
            const reorederTasks = [...tasks];

            const sourceIndex = source.index;
            const destinationIndex = destination.index;

            //remove one task from start draggable position
            const [removedTask] = reorederTasks.splice(sourceIndex, 1);
            reorederTasks.splice(destinationIndex, 0, removedTask)

            return setTasks(reorederTasks);
        }


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
                <h1>{tasks.length !== 0 ? tasks[0].name : 'You are not on any tasks !'}</h1>
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
                <svg
                    width={circleWidth}
                    height={circleWidth}
                    viewBox={`0 0 ${circleWidth} ${circleWidth}`}
                >
                    <circle cx={circleWidth / 2} cy={circleWidth / 2} strokeWidth={strokeWidth}
                        r={radius}
                        className="background-circle"
                    ></circle>
                    <circle cx={circleWidth / 2} cy={circleWidth / 2} strokeWidth={strokeWidth}
                        r={radius}
                        className="progress-circle"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: dashOffset
                        }}
                        transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                    ></circle>
                    <text className="time" x="32%" y="50%">{`${minutes} : ${seconds}`}</text>
                </svg>
                <h2>Task list</h2>
                <div className="input-row">
                    <input type="text" placeholder="Add task here" value={taskValue} onChange={(e) => setTaskValue(e.target.value)}></input>
                    <FontAwesomeIcon className="btn-add" icon={faPlusCircle} size="3x" onClick={() => { addTask(taskValue) }} ></FontAwesomeIcon>
                </div>
                <DragDropContext onDragEnd={handleDragAndDrop}>
                    <div className="task-list">
                        <Droppable droppableId="ROOT" type="group">
                            {(provided) => (
                                <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        tasks.map((task, index) => (
                                            <Draggable draggableId={task.id} key={task.id} index={index}>
                                                {(provided) => (
                                                    <div className="task-item"
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                        ref={provided.innerRef}>
                                                        <h3 className="task-title">{task.name}</h3>
                                                        <FontAwesomeIcon
                                                            onClick={() => {
                                                                deleteTask(index)
                                                            }}
                                                            icon={faTrashCan}
                                                            className="icon-delete"
                                                        ></FontAwesomeIcon>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
                <Button size="large" onClick={clearTask} color="var(--hazel-light)">Clear task list</Button>
            </div>
            <FontAwesomeIcon onClick={toggleFullScreen} className="btn-fullscreen" icon={faExpand} size="3x" />
            <div className="footer">

            </div>
        </div>
    );
}

export default Home;