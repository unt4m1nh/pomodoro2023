import { useEffect, useState } from "react";
import "./Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//Global import Font Awesoem Icons 5
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


import Button from "../../components/Button/Button";

//Global variables
const circleWidth = 400;
const strokeWidth = 10;
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
    const [showTask, setShowTask] = useState(false)

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [perTimeLeft, setPerTimeLeft] = useState(100);

    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [viewHeight, setViewHeight] = useState(window.innerHeight);

    const bgLink = 'https://images.alphacoders.com/132/1327498.png'

    const dashOffset = circumference - (circumference * perTimeLeft) / 100;
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
                        setIsRunning(false);
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

    useEffect(() => {
        const handleResize = () => {
            setViewWidth(window.innerWidth);
            setViewHeight(window.innerHeight);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


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
            <div className="bg-image" style={{
                backgroundImage: `url(${bgLink})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                width: viewWidth, height: viewHeight, opacity: 0.8
            }}></div>
            <div className={!isFullScreen ? "header" : "hide"}>
                <h1>Focusly</h1>
                <div className="btn-setting">
                    <p>Settings</p>
                    <FontAwesomeIcon icon={faGear} size="xl" />
                </div>
                <div className="btn-task" onClick={() => { setShowTask(true) }}>
                    <p>Task List</p>
                    <FontAwesomeIcon icon={faListCheck} size="xl" />
                </div>
            </div>
            <div className="content">
                <div className="content-mode-selection">
                    <div className={mode === 'Pomodoro' ? "modeActive" : "mode"} onClick={() => { handleChangeMode('Pomodoro') }}>Pomodoro</div>
                    <div className={mode === 'Short Break' ? "modeActive" : "mode"} onClick={() => { handleChangeMode('Short Break') }}>Short Break</div>
                    <div className={mode === 'Long Break' ? "modeActive" : "mode"} onClick={() => { handleChangeMode('Long Break') }}>Long Break</div>
                </div>
                <h1 style={{ margin: 20 }}>{tasks.length !== 0 ? tasks[0].name : 'You are not on any tasks !'}</h1>
                <h1 className="time">{minutes}:{seconds}</h1>
                <svg
                    width={circleWidth}
                    height={circleWidth}
                    viewBox={`0 0 ${circleWidth} ${circleWidth}`}
                    className="progess-container"
                    style={{ display: 'none' }}
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
                    <text className="time" x="7%" y="55%">{`${minutes} : ${seconds}`}</text>
                </svg>
                <div className="content-clock-buttons">
                    {
                        !isRunning ?
                            <Button size="large" onClick={handleStartClock} color="#fff">Start</Button> :
                            <Button size="large" onClick={handleStopClock} color="#fff">Pause</Button>
                    }
                    <FontAwesomeIcon className="icon" icon={faRotateRight} size="2xl" onClick={() => {
                        handleResetClock(mode);
                    }}
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </div>
                <div className={showTask ? 'task-container-active' : 'task-container'}>
                    <div className="task-content">
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
                    </div>
                    <div className="control-btn">
                        <button onClick={clearTask}>Clear Task</button>
                        <FontAwesomeIcon icon={faXmark} size="2xl" onClick={() => {setShowTask(false)}} className="icon" />
                    </div>
                </div>
            </div>
            <FontAwesomeIcon onClick={toggleFullScreen} className="btn-fullscreen icon" icon={faExpand} size="3x" />
            <div className="footer">
            </div>
        </div>
    );
}

export default Home;