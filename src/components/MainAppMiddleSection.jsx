import { useState } from "react";

import Clocks from "./focus_timer_clock/Clocks";
import DailyFocus from "./focus_tasks/DailyFocus";
import { TimerContextProvider } from "./focus_tasks/TimerDisplayContext";

export default function MainAppMiddleSection() {
    const [date, setDate] = useState(new Date());

    //Date is going to be used in the greeting and in the live clock. See "clocks" component
    //Timer Context Provider manages the state for toggling the display of the timer

    function updateDate() {
        setDate(new Date());
    }
    return (
        <section className="app-middle">
            <div className="container">
                <TimerContextProvider>
                    <Clocks date={date} refreshDate={updateDate} />
                    <DailyFocus />
                </TimerContextProvider>
            </div>
        </section>
    );
}
