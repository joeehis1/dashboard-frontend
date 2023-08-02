export default function ClockText({
    date,
    isWorking,
    isRunning,
    timerVisible,
    durationDone,
}) {
    const hours = date.getHours();
    const greeting =
        hours >= 0 && hours < 12
            ? "Good morning"
            : hours > 12 && hours < 18
            ? "Good afternoon"
            : hours >= 18 && hours < 24
            ? "Good evening"
            : "Good Night";
    const timerText =
        isWorking && isRunning && !durationDone
            ? "Focus"
            : !isWorking && isRunning && !durationDone
            ? "Resting"
            : !isWorking && !isRunning && durationDone
            ? "Duration Complete"
            : "Press Play";
    const displayedText = timerVisible ? timerText : greeting;
    return <h2 className="clock-text text-clock-text">{displayedText}</h2>;
}
