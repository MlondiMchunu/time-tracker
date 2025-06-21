import { useState, useEffect } from 'react';


//Define props for the timer component
type TimerProps = {
    onTimerComplete: (hours: number, taskName: string) => void;
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
    const pauseTimer = ()=>{
        setIsPaused(true);
    }
}