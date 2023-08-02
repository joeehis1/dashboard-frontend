import ToDoItem from "./ToDoItem";

export default function ToDoUnorderedList({
    list,
    openItemMenu,
    updateLists,
    isEditing,
    cancelEdit,
    saveEdittedData,
    selectItem,
    selectedItem,
}) {
    return (
        <ul className="todo-items reset-list">
            {list.map((itemObject) => {
                return (
                    <ToDoItem
                        key={itemObject.id}
                        openItemMenu={openItemMenu}
                        toDoItemObject={itemObject}
                        updateLists={updateLists}
                        isEditing={isEditing}
                        cancelEdit={cancelEdit}
                        saveEdittedData={saveEdittedData}
                        selectItem={selectItem}
                        selectedItem={selectedItem}
                    />
                );
            })}
        </ul>
    );
}
