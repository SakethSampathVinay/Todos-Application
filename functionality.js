let todoUserInputEl = document.getElementById("todoUserInput");
let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");
let saveTodoButtonEl = document.getElementById("saveTodoButton");
let tasksCompletedEl = document.getElementById("tasksCompleted");
let tasksPendingEl = document.getElementById("tasksPending");
let totalTasksEl = document.getElementById("totalTasks");
let priorityIdEl = document.getElementById("priorityId");
let myTasksIdEl = document.getElementById("myTasksId");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

function showingCongratsMessage() {
    let congratsMessagePopupContainer = document.createElement("div");
    congratsMessagePopupContainer.classList.add("congrats-popup-5-seconds");
    let congratsMessagePopupEl = document.createElement("h1");
    congratsMessagePopupEl.classList.add("congrats-heading-popup");
    congratsMessagePopupEl.textContent = "Congrats! You Have Completed all Your Tasks. Have a Great Day.";
    congratsMessagePopupContainer.appendChild(congratsMessagePopupEl);
    document.body.appendChild(congratsMessagePopupContainer);
    todoItemsContainerEl.style.display = "none";
    myTasksIdEl.style.display = "none";
    saveTodoButtonEl.style.display = "none";
    setTimeout(function() {
        document.body.removeChild(congratsMessagePopupContainer);
        myTasksIdEl.style.display = "";
        todoItemsContainerEl.style.display = "";
        saveTodoButtonEl.style.display = "";
    }, 2000);
}

function showingPendingMessage() {
    let pendingMessagePopupContainer = document.createElement("div");
    pendingMessagePopupContainer.classList.add("congrats-popup-5-seconds");
    let pendingMessagePopup = document.createElement("h1");
    pendingMessagePopup.classList.add("congrats-heading-popup");
    pendingMessagePopup.textContent = "Complete your Pending Tasks well. Have a Great Day!";
    pendingMessagePopupContainer.appendChild(pendingMessagePopup);
    document.body.appendChild(pendingMessagePopupContainer);
    todoItemsContainerEl.style.display = "none";
    myTasksIdEl.style.display = "none";
    saveTodoButtonEl.style.display = "none";
    setTimeout(function() {
        document.body.removeChild(pendingMessagePopupContainer);
        myTasksIdEl.style.display = "";
        todoItemsContainerEl.style.display = "";
        saveTodoButtonEl.style.display = "";
    }, 1000);
}

function noTasksPopupMessage() {
    let noTasksPopupMessageContainer = document.createElement("div");
    noTasksPopupMessageContainer.classList.add("congrats-popup-5-seconds");
    let noTasksMessagePopupEl = document.createElement("h1");
    noTasksMessagePopupEl.classList.add("congrats-heading-popup");
    noTasksMessagePopupEl.textContent = "Your to-do list is currently empty. Take a moment to plan out your day now.";
    noTasksPopupMessageContainer.appendChild(noTasksMessagePopupEl);
    document.body.appendChild(noTasksPopupMessageContainer);
    todoItemsContainerEl.style.display = "none";
    myTasksIdEl.style.display = "none";
    saveTodoButtonEl.style.display = "none";
    setTimeout(function() {
        document.body.removeChild(noTasksPopupMessageContainer);
        myTasksIdEl.style.display = "";
        todoItemsContainerEl.style.display = "";
        saveTodoButtonEl.style.display = "";
    }, 2000);
}

function noTodolist() {
    let noTodolistContainer = document.createElement("div");
    noTodolistContainer.classList.add("congrats-popup-5-seconds");
    let noTodolistEl = document.createElement("h1");
    noTodolistEl.classList.add("congrats-heading-popup");
    noTodolistEl.textContent = "Nothing to Save in TodoList. Plan out your Day to get things done.";
    noTodolistContainer.appendChild(noTodolistEl);
    document.body.appendChild(noTodolistContainer);
    todoItemsContainerEl.style.display = "none";
    myTasksIdEl.style.display = "none";
    saveTodoButtonEl.style.display = "none";
    setTimeout(function() {
        document.body.removeChild(noTodolistContainer);
        myTasksIdEl.style.display = "";
        todoItemsContainerEl.style.display = "";
        saveTodoButtonEl.style.display = "";
    }, 2000);
}

if (todoList.length === 0) {
    totalTasksEl.textContent = 0;
    tasksCompletedEl.textContent = 0;
    tasksPendingEl.textContent = 0;
    noTasksPopupMessage();
}
let congratsMessageVisible = false;
let pendingMessageVisible = false;

function updateTasksCount() {
    let completedTasks = 0;
    for (let todo of todoList) {
        if (todo.isChecked === true) {
            completedTasks = completedTasks + 1;
        }
    }
    totalTasksEl.textContent = todosCount;
    let pendingTasks = todosCount - completedTasks;
    tasksCompletedEl.textContent = completedTasks;
    tasksPendingEl.textContent = pendingTasks;

    if (completedTasks === todosCount && !congratsMessageVisible) {
        showingCongratsMessage();
        congratsMessageVisible = true;
    } else if (completedTasks !== todosCount) {
        congratsMessageVisible = false;
    }

    if (completedTasks !== todosCount && !pendingMessageVisible) {
        showingPendingMessage();
        pendingMessageVisible = true;
    } else if (completedTasks !== todosCount) {
        congratsMessageVisible = true;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    saveTodoButtonEl.onclick = function() {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        updateTasksCount();
        location.reload(); // Reload the page
    };
});

saveTodoButtonEl.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    updateTasksCount();
};

function onAddTodo() {
    let priorityIdValue = priorityIdEl.value;
    let todoUserInputValue = todoUserInputEl.value;


    if (todoUserInputValue === "") {
        alert("Enter Valid Text");
        return;
    } else {
        let userClicked = confirm("Do you want to Add in TodoList");
        if (userClicked) {
            todosCount = todosCount + 1;
            let newTodo = {
                text: todoUserInputValue,
                uniqueNo: todosCount,
                isChecked: false,
                priority: priorityIdValue
            };
            todoList.push(newTodo);
            createAndAppendTodo(newTodo);
            todoUserInputEl.value = "";
        } else {
            todoUserInputEl.value = "";
        }
    }

    updateTasksCount();
}
addTodoButtonEl.onclick = function() {
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;

    } else {
        todoObject.isChecked = true;
    }
    updateTasksCount();
}

function onDeleteTodo(todoId) {
    let todoEl = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoEl);

    let deleteElIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteElIndex, 1);
    updateTasksCount();
}

function createAndAppendTodo(todo) {

    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoEl = document.createElement("li");
    todoEl.classList.add("todo-item-container", "d-flex", "flex-row");
    todoEl.id = todoId;
    todoItemsContainerEl.appendChild(todoEl);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    inputEl.classList.add("checkbox-input");
    todoEl.appendChild(inputEl);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    // update label-container when the p1 the label container border color should be red,
    // when p2 its yellow , when p3 its blue, when p4 its white
    todoEl.appendChild(labelContainer);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.id = labelId;
    labelEl.classList.add("checkbox-label");
    labelEl.textContent = todo.text;
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelContainer.appendChild(labelEl);

    let priorityEl = document.createElement("span");
    priorityEl.classList.add("priority");
    priorityEl.textContent = todo.priority;
    labelContainer.appendChild(priorityEl);



    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);

    switch (todo.priority) {
        case "P1":
            labelContainer.style.borderColor = "red";
            priorityEl.style.backgroundColor = "red"
            priorityEl.style.color = "white";
            break;
        case "P2":
            labelContainer.style.borderColor = "yellow";
            priorityEl.style.backgroundColor = "yellow";
            priorityEl.style.color = "black";
            break;
        case "P3":
            labelContainer.style.borderColor = "blue";
            priorityEl.style.backgroundColor = "blue";
            priorityEl.style.color = "white";
            break;
        default:
            labelContainer.style.borderColor = "white";
    }

    updateTasksCount()
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

saveTodoButtonEl.addEventListener("click", function() {
    alert("Save Successfully!");
})
