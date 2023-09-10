const taskInput = document.getElementById("");
const dateInput = document.getElementById("");
const addButton = document.getElementById("");

const todos = [];

const addHandler = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        task,
        date,
        completed: false,
    };
    if (task) {
        todos.push(todo);
        taskInput.value = "";
        dateInput.value = "";
    } else {

    }

}

addButton.addEventListener("click", addHandler);
