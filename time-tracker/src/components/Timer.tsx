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
}