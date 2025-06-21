import { useState, useEffect } from 'react';

//Define props for the timer component
type TimerProps = {
    onTimerComplete: (taskName: string, hours: number) => void;
};

export default function Timer({ onTimerComplete }: TimerProps) {
    //State for tracking timer status and values 
    const [isRunning, setIsRunning] = useState(false);
   //const [setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [taskName, setTaskName] = useState('');

    //Effect hook to handle timer interval
    useEffect(() => {
        let interval: ReturnType<typeof setTimeout>;;

        //only run timer when active and not paused
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                //update elapsed time every 100ms for smooth display
                setElapsedTime(prev => prev + 100);
            }, 100);
        }

        //Cleanup interval on component unmount or state change
        return () => clearInterval(interval);
    }, [isRunning, isPaused]);

    /*
    * Starts the timer with current task name
    * validates input before starting
    */
    const startTimer = () => {
        if (!taskName.trim()) {
            alert('Please enter a task name before starting a timer');
            return;
        }
        setIsRunning(true);
        setIsPaused(false);
       // setStartTime(Date.now());
    };

    //pauses timer & records elapsed time
    const pauseTimer = () => {
        setIsPaused(true);
    };

    //formats time for display (HH:MM:SS)
    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    };

    const resumeTimer = () => {
        setIsPaused(false);
    };

    /** stops timer and calculates hours worked */
    const stopTimer = () => {
        const totalMs = elapsedTime;
        const hoursWorked = totalMs / (1000 * 60 * 60);

        //reset timer state
        setIsRunning(false);
        setIsPaused(false);
        setElapsedTime(0);

        //send data to parent component
        onTimerComplete(taskName, parseFloat(hoursWorked.toFixed(2)));
        setTaskName('');
    };

    return (
        <div className="timer-container">
            <h4>Task Timer</h4>
            {isRunning ? (
                <div className="timer-active">
                    <p className="timer-task">Tracking: <span>{taskName}</span></p>
                    <p className="timer-display">{formatTime(elapsedTime)}</p>
                    <div className="timer-controls">
                        {isPaused ? (
                            <button onClick={resumeTimer} className="resume-button">
                                Resume
                            </button>
                        ) : (
                            <button onClick={pauseTimer} className="pause-button">
                                Pause
                            </button>
                        )}
                        <button onClick={stopTimer} className="stop-button">
                            Stop & Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="timer-setup">
                    <div className="timer-input">
                        <label htmlFor='timerTask'>Task Name : </label>
                        <input 
                            type='text' 
                            id='timerTask' 
                            value={taskName} 
                            onChange={(e) => setTaskName(e.target.value)} 
                            placeholder="Current task" 
                        />
                    </div><br/>
                    <button onClick={startTimer} className="start-button">
                        Start Timer
                    </button>
                </div>
            )}
        </div>
    );
}