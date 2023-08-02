import ControlButton from "./ControlButton";
import { timerDisplay } from "../../util";

export default function Timer({
    isWorking,
    workDuration,
    restDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    timerRunning,
}) {
    const displayedTime = isWorking
        ? timerDisplay(workDuration)
        : timerDisplay(restDuration);

    //isWorking is used to determine whether to display the rest duration or the work duration
    //event handlers for playing, pausing and resetting the time are also passed in to the timer component as well.

    return (
        <div className="timer">
            <p className="text-clock clock-face">{displayedTime}</p>
            <ul className={`reset-list timer-controls `}>
                <li>
                    <ControlButton
                        handleClick={startTimer}
                        disabled={timerRunning}
                        className={"btn-timer-control btn-control"}
                    >
                        <i className="ri-play-fill"></i>
                    </ControlButton>
                </li>
                <li>
                    <ControlButton
                        handleClick={pauseTimer}
                        className={"btn-timer-control btn-control"}
                    >
                        <i className="ri-pause-fill"></i>
                    </ControlButton>
                </li>
                <li>
                    <ControlButton
                        handleClick={resetTimer}
                        className={"btn-timer-control btn-control"}
                    >
                        <i className="ri-loop-left-line"></i>
                    </ControlButton>
                </li>
            </ul>
        </div>
    );
}
