import { useState, useEffect } from 'react';


//Define props for the timer component
type TimerProps = {
    onTimerComplete: (taskName: string, hours: number) => void;
};

export default function Timer({ onTimerComplete }: TimerProps) {
    //State for tracking timer status and values 
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapseTime] = useState(0)
    const [isPaused, setIsPaused] = useState(false);
    const [taskName, setTaskName] = useState('')


    //Effect hook to handler timer interval
    useEffect(() => {
        let interval: NodeJS.Timeout;

        //only run timer when active and not paused
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                //update elapsed time every 100ms for smooth display
                setElapseTime(prev => prev + 100);
            }, 100);
        }

        //Cleanup interval on component unmount or state change
        return () => clearInterval(interval);
    }, [isRunning, isPaused]);

    /*
    *Starts the timer with current task name
    *validates input before starting
    */
    const startTimer = () => {
        if (!taskName.trim()) {
            alert(`please enter a task name before starting a timer`);
            return;
        }
        setIsRunning(true);
        setIsPaused(false);
        setStartTime(Date.now());
    };

    //pauses timer & records elapsed time
    const pauseTimer = () => {
        setIsPaused(true);
    }
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

    /**stops timer and calculates hours worked*/
    const stopTimer = () => {
        const totalMs = elapsedTime;
        const hoursWorked = totalMs / (1000 * 60 * 60);

        //reset timer state
        setIsRunning(false);
        setIsPaused(false);
        setElapseTime(0);

        //send data to parent component
        onTimerComplete(taskName, parseFloat(hoursWorked.toFixed(2)));
        setTaskName('');
    };

    return (
        <>
            <div>
                <h4>Task Timer</h4>
                {/**Timer display and controls*/}
                {isRunning ? (
                    <div>
                        <p>
                            Tracking : <span>
                                {taskName}
                            </span>
                        </p>
                        <p>
                            {formatTime(elapsedTime)}
                        </p>
                        <div>
                            {isPaused ? (
                                <button onClick={resumeTimer}>Resume</button>
                            ) : (
                                <button onClick={pauseTimer}>Pause</button>
                            )}
                            <button onClick={stopTimer}>
                                Stop & Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <label htmlFor='timerTask'>Task Name</label>
                            <input type='text' id='timerTask' value={taskName} onChange={(e)=>setTaskName(e.target.value)} placeholder="current task"> </input>
                        </div>
                        <button onClick={startTimer}>Start Timer</button>
                    </div>
                )}
            </div>
        </>
    )
}