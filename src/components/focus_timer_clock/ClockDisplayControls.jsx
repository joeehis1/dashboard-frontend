import { useState, useRef, useEffect } from "react";
import ControlButton from "./ControlButton";

export default function ClockDisplayControls({ displayTimer, displayClock }) {
    const [clockControlsVisible, setClockControlsVisible] = useState(false);

    const menuWrapperRef = useRef(null);

    function showClockControls() {
        setClockControlsVisible((visible) => !visible);
    }

    function handleClockDisplay() {
        displayClock();
        setClockControlsVisible(false);
    }

    function handleTimerDisplay() {
        displayTimer();
        setClockControlsVisible(false);
    }

    useEffect(() => {
        function onEscape(e) {
            if (e.key === "Escape") {
                setClockControlsVisible(false);
            }
        }

        function handleClickOutside(e) {
            if (
                menuWrapperRef.current &&
                !menuWrapperRef.current.contains(e.target)
            ) {
                setClockControlsVisible(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        window.addEventListener("keydown", onEscape);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("keydown", onEscape);
        };
    }, []);

    return (
        <div
            className={`col clock-options ${
                clockControlsVisible ? "is-visible" : ""
            }`}
        >
            <ControlButton
                handleClick={showClockControls}
                className={
                    "btn-expand btn-transparent btn-clock-menu btn-filtered"
                }
                title="Click to select clock option"
            >
                <i className="ri-menu-3-line"></i>
            </ControlButton>
            <ul
                ref={menuWrapperRef}
                className={`reset-list clock-controls ${
                    clockControlsVisible ? "is-shown" : ""
                }`}
            >
                <li>
                    <ControlButton
                        handleClick={handleTimerDisplay}
                        className={
                            "btn-menu-option btn-transparent btn-clock-menu btn-filtered"
                        }
                        title="Pomodoro Timer"
                    >
                        <i className="ri-timer-fill"></i>
                    </ControlButton>
                </li>
                <li>
                    <ControlButton
                        handleClick={handleClockDisplay}
                        className={
                            "btn-menu-option btn-clock-menu btn-transparent btn-filtered"
                        }
                        title="Clock"
                    >
                        <i className="ri-time-line"></i>
                    </ControlButton>
                </li>
            </ul>
        </div>
    );
}
