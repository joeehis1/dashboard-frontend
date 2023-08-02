import ControlButton from "../focus_timer_clock/ControlButton";

export default function ContentIfEmpty({
    selectedType,
    switchView,
    showToday,
    addNewBtnVisible,
    addNew,
    doneAmount,
    todayAmount,
    inboxAmount,
}) {
    const buttonText =
        selectedType.done && doneAmount <= 0
            ? "Get Started in Today"
            : selectedType.today && todayAmount <= 0 && inboxAmount
            ? `${inboxAmount} todo in Inbox`
            : `Switch to ${selectedType.inbox ? "today" : "inbox"}`;

    const paragraph =
        selectedType.done && doneAmount <= 0
            ? "No completed todos yet"
            : selectedType.today && todayAmount <= 0 && inboxAmount
            ? "No todos yet"
            : "Add a todo to get started";

    return (
        <div className="todo-area-if-empty">
            <p>{paragraph}</p>
            {/* Cick this button to switch between inbox and today */}
            <ControlButton
                handleClick={
                    selectedType.done && doneAmount <= 0
                        ? showToday
                        : switchView
                }
                className="btn-transparent btn-transperent-hovered-bg"
            >
                {buttonText}
            </ControlButton>
            {addNewBtnVisible && (
                <ControlButton handleClick={addNew}>New Todo</ControlButton>
            )}
        </div>
    );
}
