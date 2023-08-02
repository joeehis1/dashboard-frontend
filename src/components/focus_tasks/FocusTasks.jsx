import { useState } from "react";
import TaskOptions from "./TaskOptions";

export default function FocusTask({ task, editTask, createNewtask }) {
    const [checked, setChecked] = useState(false);

    function handleTaskComplete(e) {
        setChecked(e.target.checked);
    }
    return (
        <div className="taskbox text-task-focus" title="Task to focus on">
            <h2 className="task-title">Today</h2>
            <div className="task">
                <label className="task-name">
                    <input
                        className="custom"
                        type="checkbox"
                        checked={checked}
                        onChange={handleTaskComplete}
                        title="Click to set task completed"
                    />
                    <span className={checked ? "completed" : ""}>{task}</span>
                </label>
                <TaskOptions
                    taskCompleted={checked}
                    handleEditTask={editTask}
                    handleCreateNewTask={createNewtask}
                />
            </div>
        </div>
    );
}
