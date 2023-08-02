import { useEffect, useRef, useState } from "react";
import ControlButton from "../focus_timer_clock/ControlButton";

import ToDoUnorderedList from "./ToDoUnorderedList";
import ContentIfEmpty from "./ContentIfEmpty";

export default function ToDo() {
    const [toDoAppVisible, setToDoAppVisible] = useState(false);

    const [typeMenuVisible, setTypeMenuVisible] = useState(false);

    const [itemMenuVisible, setItemMenuVisible] = useState(false);

    const [selectedType, setSelectedType] = useState({
        today: true,
        inbox: false,
        done: false,
    });

    const [selectedItem, setSelectedItem] = useState("");

    //To do input at the bottom
    const [toDoItem, setToDoItem] = useState(" ");

    const [toDoInputVisible, setToDoInputVisible] = useState(false);
    const [addNewBtnVisible, setAddNewButtonVisible] = useState(true);

    //Lists are obtained from local storage and if there is nothing in local storage, the IIFE returns an empty array

    const [toDoInbox, setToDoInbox] = useState(
        (() => {
            const toDoInbox = JSON.parse(localStorage.getItem("todo-inbox"));
            if (toDoInbox) {
                return toDoInbox;
            }
            return [];
        })()
    );
    const [toDoDone, setToDoDone] = useState(
        (() => {
            const toDoDone = JSON.parse(localStorage.getItem("todo-done"));
            if (toDoDone) {
                return toDoDone;
            }
            return [];
        })()
    );
    const [toDoToday, setToDoToday] = useState(
        (() => {
            const toDoToday = JSON.parse(localStorage.getItem("todo-today"));
            if (toDoToday) {
                return toDoToday;
            }
            return [];
        })()
    );

    //this state will be used to handle the editing state of a todo item

    const [isEditing, setIsEditing] = useState(false);

    const wrapperRef = useRef(null);
    const itemMenuRef = useRef(null);
    const typeMenuRef = useRef(null);
    const toDoInputRef = useRef(null);
    const toDoRef = useRef(null);

    function addNew() {
        setAddNewButtonVisible(false);
        setToDoInputVisible(true);
        if (toDoInputRef.current) {
            toDoInputRef.current.focus();
        }
    }

    function handleToDoItemChange(e) {
        setToDoItem(e.target.value);
    }

    //On submitting the to do form at the bottom, this function updates the todo list array with a new object

    function createTodo(e) {
        e.preventDefault();
        const newToDo = {
            name: toDoItem,
            id: crypto.randomUUID(),
        };
        if (selectedType.done) {
            newToDo.createdFrom = "done";
            setToDoDone((list) => [...list, newToDo]);
        } else if (selectedType.inbox) {
            newToDo.createdFrom = "inbox";
            setToDoInbox((list) => [...list, newToDo]);
        } else {
            newToDo.createdFrom = "today";
            setToDoToday((list) => [...list, newToDo]);
        }

        setToDoItem("");

        //Steps
        //Create new object representing a todo item
        //Based on current selected type assign to different list
    }

    function switchView() {
        if (selectedType.inbox) {
            return setSelectedType((type) => ({
                ...type,
                inbox: false,
                today: true,
            }));
        }
        return setSelectedType((type) => ({
            ...type,
            today: false,
            inbox: true,
        }));
    }

    //The main function that opens the to do list application from the dashboard

    function openToDo() {
        if (toDoAppVisible) {
            setToDoAppVisible(false);
            setToDoInputVisible(false);
            setAddNewButtonVisible(true);
            setTypeMenuVisible(false);
            setSelectedType((type) => ({ ...type }));
        } else {
            setToDoAppVisible((visible) => {
                return !visible;
            });
        }
    }

    //The functions below here manage which type is being shown

    function showInbox() {
        setTypeMenuVisible(false);
        setSelectedType({
            today: false,
            inbox: true,
            done: false,
        });
    }

    function showToday() {
        setTypeMenuVisible(false);
        setSelectedType({
            today: true,
            inbox: false,
            done: false,
        });
    }

    function showDone() {
        setTypeMenuVisible(false);
        setSelectedType({
            today: false,
            inbox: false,
            done: true,
        });
    }

    //Type of to do list i.e inbox, today and done

    function openTypeMenu() {
        setItemMenuVisible(false);
        setTypeMenuVisible((visible) => {
            return !visible;
        });
    }

    //This event handler is attached to each button that opens up additional options for each item on the to do list
    function openItemMenu(currentlyClickedItemId) {
        setTypeMenuVisible(false);
        if (itemMenuVisible && currentlyClickedItemId === selectedItem) {
            return setItemMenuVisible(false);
        }
        if (itemMenuVisible && currentlyClickedItemId !== selectedItem) {
            return;
        }
        setItemMenuVisible((visible) => !visible);
    }

    //Functionality for the todo/item menu

    //Editting
    //Start edit to show input type text for new name for to do item
    function startEdit() {
        setItemMenuVisible(false);
        setIsEditing(true);
    }

    //Cancel edit to revert back to checkbox

    function cancelEdit() {
        setIsEditing(false);
    }

    function saveEdittedData(itemId, newValue, createdFrom) {
        // console.log(itemId, newValue, createdFrom);
        if (createdFrom === "today") {
            return setToDoToday((list) => {
                return list.map((item) => {
                    if (item.id === itemId) {
                        return { ...item, name: newValue };
                    }
                    return item;
                });
            });
        }

        if (createdFrom === "inbox") {
            return setToDoInbox((list) => {
                return list.map((item) => {
                    if (item.id === itemId) {
                        return { ...item, name: newValue };
                    }
                    return item;
                });
            });
        }
    }

    //This function is used to move the items between the today todo list, inbox todo list and the done list. the fucnction is called whenever you tick on a checkbox item

    function updateLists(itemId) {
        const itemFromToday = toDoToday.some((item) => {
            return item.id === itemId;
        });

        const itemFromInbox = toDoInbox.some((item) => {
            return item.id === itemId;
        });

        const itemFromDone = toDoDone.some((item) => {
            return item.id === itemId;
        });

        if (itemFromDone) {
            const foundItem = Object.assign(
                {},
                toDoDone.find((item) => item.id === itemId)
            );

            setToDoDone((list) => {
                return list.filter((item) => item.id !== itemId);
            });

            if (foundItem.createdFrom === "inbox") {
                return setToDoInbox((list) => {
                    return [...list, foundItem];
                });
            }

            if (foundItem.createdFrom === "today") {
                return setToDoToday((list) => {
                    return [...list, foundItem];
                });
            }
        }

        if (itemFromInbox) {
            const foundItem = Object.assign(
                {},
                toDoInbox.find((item) => item.id === itemId)
            );
            setToDoInbox((list) => {
                return list.filter((item) => {
                    return item.id !== itemId;
                });
            });
            return setToDoDone((list) => {
                return [...list, foundItem];
            });
        }

        if (itemFromToday) {
            const foundItem = Object.assign(
                {},
                toDoToday.find((item) => item.id === itemId)
            );

            setToDoToday((list) => {
                return list.filter((item) => {
                    return item.id !== itemId;
                });
            });
            return setToDoDone((list) => {
                return [...list, foundItem];
            });
        }
    }

    //Move

    //To Select an item before moving
    function selectItem(id) {
        setSelectedItem(id);
    }

    function moveToInboxFromToday(id) {
        if (!selectedItem) return;
        setItemMenuVisible(false);
        const foundItem = Object.assign(
            {},
            toDoToday.find((item) => item.id === id)
        );

        setToDoToday((todayList) => {
            return todayList.filter((item) => item.id !== id);
        });
        setToDoInbox((inboxList) => {
            return [...inboxList, foundItem];
        });
    }

    function moveToTodayFromInbox(id) {
        if (!selectedItem) return;
        setItemMenuVisible(false);
        const foundItem = Object.assign(
            {},
            toDoInbox.find((item) => item.id === id)
        );

        setToDoInbox((todayList) => {
            return todayList.filter((item) => item.id !== id);
        });
        setToDoToday((inboxList) => {
            return [...inboxList, foundItem];
        });
    }

    //Complete will directly delete an item from either the todo list or the inbox list

    function complete(selectedItemId) {
        setItemMenuVisible(false);
        if (selectedType.today) {
            return setToDoToday((todayList) => {
                return todayList.filter((item) => item.id !== selectedItemId);
            });
        }
        if (selectedType.inbox) {
            return setToDoInbox((inboxList) => {
                return inboxList.filter((item) => item.id !== selectedItemId);
            });
        }
    }

    //Delete will delete an item after it has been moved to the done list

    function deleteItemFromDone(selectedItemId) {
        setItemMenuVisible(false);
        console.log(selectedItemId);
        return setToDoDone((doneList) => {
            return doneList.filter((item) => item.id !== selectedItemId);
        });
    }

    //This use effect is to ensure that the min height of the to do content wrapper is equal to that of the type menu

    useEffect(() => {
        if (wrapperRef.current && typeMenuRef.current && typeMenuVisible) {
            const height = typeMenuRef.current.offsetHeight;
            wrapperRef.current.style.minHeight = `${height}px`;
        } else if (wrapperRef.current) {
            wrapperRef.current.style.minHeight = `auto`;
        } else {
            return;
        }
    }, [typeMenuVisible, itemMenuVisible]);

    //itemMenuRef is a DOM ref to the item menu shown when you click the ellipsis on a list item

    useEffect(() => {
        if (itemMenuRef.current && wrapperRef.current && itemMenuVisible) {
            const height = itemMenuRef.current.offsetHeight;
            wrapperRef.current.style.minHeight = `${height}px`;
        } else if (wrapperRef.current) {
            wrapperRef.current.style.minHeight = `auto`;
        } else {
            return;
        }
    }, [itemMenuVisible]);

    //Hide type menu on click outside

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                typeMenuVisible &&
                typeMenuRef.current &&
                !typeMenuRef.current.contains(e.target)
            ) {
                setTypeMenuVisible(false);
            }
        }

        document.addEventListener("click", handleClickOutside, { once: true });
        return () =>
            document.removeEventListener("click", handleClickOutside, {
                once: true,
            });
    }, [typeMenuVisible]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                itemMenuVisible &&
                itemMenuRef.current &&
                !itemMenuRef.current.contains(e.target)
            ) {
                setItemMenuVisible(false);
                setSelectedItem(null);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [itemMenuVisible]);

    useEffect(() => {
        function handleKeyPressEsc(e) {
            if (e.key === "Escape" || e.key === "Esc") {
                setToDoAppVisible(false);
                setItemMenuVisible(false);
                setSelectedItem(null);
                setTypeMenuVisible(false);
            }
        }
        window.addEventListener("keydown", handleKeyPressEsc);

        return () => window.removeEventListener("keydown", handleKeyPressEsc);
    }, []);

    //Saving to do items to local storage

    useEffect(() => {
        localStorage.setItem("todo-today", JSON.stringify(toDoToday));
        localStorage.setItem("todo-done", JSON.stringify(toDoDone));
        localStorage.setItem("todo-inbox", JSON.stringify(toDoInbox));
    }, [toDoToday, toDoDone, toDoInbox]);

    return (
        <div className="todo-section">
            <ControlButton
                handleClick={openToDo}
                className="btn-todo-open btn-transparent btn-transperent-hovered-bg"
                title="Toggle to do app"
            >
                <h2>ToDo</h2>
            </ControlButton>
            {toDoAppVisible && (
                <>
                    <div ref={toDoRef} className="todo-wrapper">
                        <ControlButton
                            className="btn-transparent btn-todo-type-options-open "
                            title="Select a view"
                            handleClick={openTypeMenu}
                        >
                            {selectedType.inbox
                                ? "Inbox"
                                : selectedType.today
                                ? "Today"
                                : "Done"}
                        </ControlButton>
                        <div ref={wrapperRef} className="todo-content-wrapper">
                            {itemMenuVisible && (
                                <ul
                                    ref={itemMenuRef}
                                    className="reset-list todo-item-controls todo-menu"
                                >
                                    {(selectedType.inbox ||
                                        selectedType.today) && (
                                        <>
                                            <li>
                                                <ControlButton
                                                    handleClick={() => {
                                                        selectedType.inbox
                                                            ? moveToTodayFromInbox(
                                                                  selectedItem
                                                              )
                                                            : moveToInboxFromToday(
                                                                  selectedItem
                                                              );
                                                    }}
                                                    className="btn-menu-option btn-transparent btn-flat"
                                                >
                                                    Move to{" "}
                                                    {selectedType.today
                                                        ? "inbox"
                                                        : "today"}
                                                </ControlButton>
                                            </li>
                                            <li>
                                                <ControlButton
                                                    handleClick={startEdit}
                                                    className={`btn-menu-option btn-transparent btn-flat`}
                                                >
                                                    Edit
                                                </ControlButton>
                                            </li>
                                        </>
                                    )}

                                    <li>
                                        {selectedType.today ||
                                        selectedType.inbox ? (
                                            <ControlButton
                                                handleClick={() =>
                                                    complete(selectedItem)
                                                }
                                                className="btn-menu-option btn-transparent btn-flat"
                                            >
                                                Complete
                                            </ControlButton>
                                        ) : (
                                            <ControlButton
                                                handleClick={() =>
                                                    deleteItemFromDone(
                                                        selectedItem
                                                    )
                                                }
                                                className="btn-menu-option btn-transparent btn-flat"
                                            >
                                                Delete
                                            </ControlButton>
                                        )}
                                    </li>
                                </ul>
                            )}
                            {typeMenuVisible && (
                                <ul
                                    ref={typeMenuRef}
                                    className="reset-list todo-type-controls todo-menu"
                                >
                                    <li>
                                        <ControlButton
                                            handleClick={showInbox}
                                            className={
                                                "btn-menu-option btn-transparent btn-flat"
                                            }
                                        >
                                            Inbox ({toDoInbox.length})
                                        </ControlButton>
                                    </li>
                                    <li>
                                        <ControlButton
                                            handleClick={showToday}
                                            className={
                                                "btn-menu-option btn-transparent btn-flat"
                                            }
                                        >
                                            Today ({toDoToday.length})
                                        </ControlButton>
                                    </li>
                                    <li>
                                        <ControlButton
                                            handleClick={showDone}
                                            className={
                                                "btn-menu-option btn-transparent btn-flat"
                                            }
                                        >
                                            Done ({toDoDone.length})
                                        </ControlButton>
                                    </li>
                                </ul>
                            )}
                            {
                                /* If selectedView.todo show ul  */
                                toDoDone.length && selectedType.done ? (
                                    <ToDoUnorderedList
                                        list={toDoDone}
                                        updateLists={updateLists}
                                        openItemMenu={openItemMenu}
                                        isEditing={isEditing}
                                        cancelEdit={cancelEdit}
                                        saveEdittedData={saveEdittedData}
                                        selectItem={selectItem}
                                        selectedItem={selectedItem}
                                    />
                                ) : toDoInbox.length && selectedType.inbox ? (
                                    <ToDoUnorderedList
                                        list={toDoInbox}
                                        updateLists={updateLists}
                                        openItemMenu={openItemMenu}
                                        isEditing={isEditing}
                                        cancelEdit={cancelEdit}
                                        saveEdittedData={saveEdittedData}
                                        selectItem={selectItem}
                                        selectedItem={selectedItem}
                                    />
                                ) : toDoToday.length && selectedType.today ? (
                                    <ToDoUnorderedList
                                        list={toDoToday}
                                        updateLists={updateLists}
                                        openItemMenu={openItemMenu}
                                        isEditing={isEditing}
                                        cancelEdit={cancelEdit}
                                        saveEdittedData={saveEdittedData}
                                        selectItem={selectItem}
                                        selectedItem={selectedItem}
                                    />
                                ) : (
                                    <ContentIfEmpty
                                        selectedType={selectedType}
                                        switchView={switchView}
                                        showToday={showToday}
                                        addNewBtnVisible={addNewBtnVisible}
                                        addNew={addNew}
                                        doneAmount={toDoDone.length}
                                        todayAmount={toDoToday.length}
                                        inboxAmount={toDoInbox.length}
                                    />
                                )
                            }
                        </div>
                        {(toDoInputVisible ||
                            toDoInbox.length > 0 ||
                            toDoToday.length > 0 ||
                            toDoDone.length > 0) && (
                            <form
                                onSubmit={createTodo}
                                className="todo-form"
                                action=""
                            >
                                <input
                                    ref={toDoInputRef}
                                    type="text"
                                    name="todo-item"
                                    value={toDoItem}
                                    onChange={handleToDoItemChange}
                                    disabled={isEditing}
                                />
                                <button disabled={!toDoItem.trim()}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
