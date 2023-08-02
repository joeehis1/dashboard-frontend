export default function FocusForm({ task, handleChange, handleSubmit }) {
    return (
        <form
            onSubmit={handleSubmit}
            action=""
            className="daily-focus text-form-focus"
        >
            <h2>What is your main focus for today?</h2>
            <input
                type="text"
                name="mainFocus"
                value={task}
                onChange={handleChange}
            />
        </form>
    );
}
