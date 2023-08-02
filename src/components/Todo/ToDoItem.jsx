import ControlButton from "../focus_timer_clock/ControlButton";
import { useState } from "react";

export default function ToDoItem({
    openItemMenu,
    toDoItemObject,
    updateLists,
    isEditing,
    cancelEdit,
    saveEdittedData,
    selectItem,
    selectedItem,
}) {
    const [checked, setChecked] = useState(false);

    const [newToDoItemValue, setNewToDoItemValue] = useState(
        toDoItemObject.name
    );

    function handleNewToDoItemValue(e) {
        setNewToDoItemValue(e.target.value);
    }

    function handleSubmitToEdit(e) {
        e.preventDefault();
        saveEdittedData(
            toDoItemObject.id,
            newToDoItemValue,
            toDoItemObject.createdFrom
        );
        cancelEdit();
    }

    function handleItemMenuButtonClick() {
        openItemMenu(toDoItemObject.id);
        selectItem(toDoItemObject.id);
    }

    return (
        <li
            className={`todo-item ${
                selectedItem === toDoItemObject.id && !isEditing
                    ? "item-selected"
                    : ""
            }`}
        >
            <div className="col">
                <form onSubmit={handleSubmitToEdit} action="">
                    {!isEditing || selectedItem !== toDoItemObject.id ? (
                        <label className={checked ? "is-checked" : ""}>
                            <input
                                type="checkbox"
                                name="todo-item"
                                checked={checked}
                                onChange={(e) => {
                                    setChecked(e.target.checked);
                                    updateLists(toDoItemObject.id);
                                }}
                            />
                            {toDoItemObject.name}
                        </label>
                    ) : (
                        <div className="new-val-form-control">
                            <input
                                type="text"
                                name="new to-do item value"
                                value={newToDoItemValue}
                                onChange={handleNewToDoItemValue}
                            />
                            <ControlButton
                                type={"button"}
                                handleClick={cancelEdit}
                                className={`btn-transparent btn-cancel-edit btn-transperent-hovered-bg`}
                            >
                                <i className="ri-close-fill"></i>
                            </ControlButton>
                        </div>
                    )}
                </form>
            </div>
            <div className="col">
                <ControlButton
                    handleClick={handleItemMenuButtonClick}
                    disabled={isEditing}
                    className=" btn-transparent btn-transperent-hovered-bg btn-todo-item-ctrl"
                >
                    <i className="ri-more-fill"></i>
                </ControlButton>
            </div>
        </li>
    );
}
