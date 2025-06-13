import React, { useEffect, useState } from 'react';

type TimerProps = {
    started: boolean;
    isWin: boolean;
    onLose: () => void;
    duration?: number;
    resetTrigger?: number;
};

const Timer: React.FC<TimerProps> = ({ started, isWin, onLose, duration = 60, resetTrigger }) => {
    const [seconds, setSeconds] = useState(duration);

    useEffect(() => {
        setSeconds(duration);
    }, [started, isWin, duration, resetTrigger]);

    useEffect(() => {
        if (!started || isWin) return;
        if (seconds === 0) {
            onLose();
            return;
        }
        const interval = setInterval(() => setSeconds(s => s - 1), 1000);
        return () => clearInterval(interval);
    }, [started, isWin, seconds, onLose]);

    return <div className="timer">Time left: {seconds}s</div>;
};

export default Timer;