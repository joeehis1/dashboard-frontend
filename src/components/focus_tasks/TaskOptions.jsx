import { useRef, useState, useEffect, useContext } from "react";
import ControlButton from "../focus_timer_clock/ControlButton";
import { TimerDisplayContext } from "./TimerDisplayContext";

export default function TaskOptions({
    taskCompleted,
    handleEditTask,
    handleCreateNewTask,
}) {
    const [optionsVisible, setOptionsVisible] = useState(false);
    const { showTimer } = useContext(TimerDisplayContext);

    const taskOptionsRef = useRef(null);

    function viewTaskOptions() {
        setOptionsVisible((visible) => !visible);
    }

    function handleDisplayPomodoro() {
        showTimer();
        setOptionsVisible(false);
    }

    useEffect(() => {
        function onEscape(e) {
            if (e.key === "Escape") {
                setOptionsVisible(false);
            }
        }
        function handleClickOutside(e) {
            if (
                taskOptionsRef.current &&
                !taskOptionsRef.current.contains(e.target)
            ) {
                setOptionsVisible(false);
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
        <div className="options text-dialog-normal">
            <ControlButton
                className={"btn-expand btn-transparent"}
                title="Display task options"
                handleClick={viewTaskOptions}
            >
                <i className="ri-more-fill"></i>
            </ControlButton>

            <ul
                ref={taskOptionsRef}
                className={`reset-list options-list ${
                    optionsVisible ? "" : "hidden"
                }`}
            >
                <li>
                    <ControlButton
                        handleClick={
                            taskCompleted ? handleCreateNewTask : handleEditTask
                        }
                        className={"btn-menu-option btn-flat btn-transparent"}
                        title={`${
                            taskCompleted
                                ? "Create New task to focus on"
                                : "Edit current task"
                        }`}
                    >
                        {taskCompleted ? "New" : "Edit"}
                    </ControlButton>
                </li>
                <li>
                    <ControlButton
                        className={"btn-menu-option btn-flat btn-transparent"}
                        title="Clear current task"
                        handleClick={handleCreateNewTask}
                    >
                        Clear
                    </ControlButton>
                </li>
                <li>
                    <ControlButton
                        title="Show pomodoro timer"
                        handleClick={handleDisplayPomodoro}
                        className={`btn-menu-option btn-flat btn-transparent`}
                    >
                        Show Timer
                    </ControlButton>
                </li>
            </ul>
        </div>
    );
}
