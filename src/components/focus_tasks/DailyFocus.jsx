import FocusTask from "./FocusTasks";
import FocusForm from "./FocusForm";
import { useState } from "react";

export default function DailyFocus() {
    const [focusTask, setFocusTask] = useState("");
    const [submittedTask, setSubmittedTask] = useState(null);

    function handleChange(e) {
        setFocusTask(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!focusTask.trim()) return;
        setSubmittedTask(focusTask);
    }

    function editTask() {
        setSubmittedTask(null);
        setFocusTask(submittedTask);
    }

    function createNewtask() {
        setSubmittedTask(null);
        setFocusTask("");
    }

    return (
        <>
            {submittedTask ? (
                <FocusTask
                    task={submittedTask}
                    editTask={editTask}
                    createNewtask={createNewtask}
                />
            ) : (
                <FocusForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    task={focusTask}
                />
            )}
        </>
    );
}
