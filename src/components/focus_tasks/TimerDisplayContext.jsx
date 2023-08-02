import { createContext, useState } from "react";

const TimerDisplayContext = createContext();

function TimerContextProvider({ children }) {
    //These two functions will be used to switch between the pomodoro and the clock and are passed into the clock visibility control component

    const [timerVisible, setTimerVisible] = useState(false);
    function showTimer() {
        setTimerVisible(true);
    }

    function showClock() {
        setTimerVisible(false);
    }

    const value = { timerVisible, showTimer, showClock };

    return (
        <TimerDisplayContext.Provider value={value}>
            {children}
        </TimerDisplayContext.Provider>
    );
}

export { TimerContextProvider, TimerDisplayContext };
