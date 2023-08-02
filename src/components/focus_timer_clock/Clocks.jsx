import { useState, useEffect, useContext, useCallback } from "react";
import ClockDisplayControls from "./ClockDisplayControls";
import Liveclock from "./LiveClock";
import Timer from "./Timer";
import ClockText from "./ClockText";

import { TimerDisplayContext } from "../focus_tasks/TimerDisplayContext";

export default function Clocks({ date, refreshDate }) {
    //State variables for timer
    const [workDuration, setWorkDuration] = useState(1500);
    const { timerVisible, showTimer, showClock } =
        useContext(TimerDisplayContext);
    const [restDuration, setRestDuration] = useState(300);
    //25minutes is 1500seconds, 5 mins is 300s
    const [isWorking, setIsWorking] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    //When work duration has run its course isWorking is set to false and the rest duration will start
    //isRunning is used to disable the play button when the duration starts
    const [durationDone, setDurationDone] = useState(false);
    //When rest duration is completed durationDone is set to true

    const [workIntervalId, setWorkIntervalId] = useState(null);
    const [restIntervalId, setRestIntervalId] = useState(null);

    //Timer Functionality //

    function startWorkTimer() {
        setIsRunning(true);
        const intervalId = setInterval(() => {
            setWorkDuration((duration) => {
                if (duration <= 0) {
                    setIsWorking(false);
                    return 0;
                }
                return duration - 1;
            });
        }, 1000);
        setWorkIntervalId(intervalId);
    }

    function pauseTimer() {
        setIsRunning(false);
        if (isWorking) {
            clearInterval(workIntervalId);
        } else {
            clearInterval(restIntervalId);
        }
    }

    //Reset timer now uses useCallback
    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setIsWorking(true);
        setWorkDuration(1500);
        setRestDuration(300);
        setDurationDone(false);
        clearInterval(workIntervalId);
        clearInterval(restIntervalId);
    }, [restIntervalId, workIntervalId]);

    //This use effect will run as soon as thw work portion of the timer is done
    useEffect(() => {
        let intervalId;
        if (!isWorking) {
            clearInterval(workIntervalId);
            intervalId = setInterval(() => {
                setRestDuration((duration) => {
                    if (duration <= 0) {
                        setDurationDone(true);
                        return 0;
                    }
                    return duration - 1;
                });
            }, 1000);
            setRestIntervalId(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isWorking, workIntervalId]);

    useEffect(() => {
        if (durationDone) {
            resetTimer();
        }
    }, [resetTimer, durationDone]);

    return (
        <div className="clocks">
            <ClockDisplayControls
                displayTimer={showTimer}
                displayClock={showClock}
            />
            <div className="col col-clock-display">
                {!timerVisible && (
                    <>
                        <Liveclock date={date} refreshDate={refreshDate} />
                        <ClockText
                            date={date}
                            isWorking={isWorking}
                            isRunning={isRunning}
                            timerVisible={timerVisible}
                            durationDone={durationDone}
                        />
                    </>
                )}
                {timerVisible && (
                    <>
                        <Timer
                            isWorking={isWorking}
                            workDuration={workDuration}
                            restDuration={restDuration}
                            startTimer={startWorkTimer}
                            pauseTimer={pauseTimer}
                            timerRunning={isRunning}
                            resetTimer={resetTimer}
                        />
                        <ClockText
                            date={date}
                            isWorking={isWorking}
                            isRunning={isRunning}
                            timerVisible={timerVisible}
                            durationDone={durationDone}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
