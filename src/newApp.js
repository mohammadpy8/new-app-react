const taskInput = document.getElementById("");
const dateInput = document.getElementById("");
const addButton = document.getElementById("");
const editButton = document.getElementById("");
const alertMessage = document.getElementById("");
const todosBody = document.getElementById("");
const deleteButton = document.getElementById("");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  const id = Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
  return id;
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 1500);
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!!</td></tr>";
    return;
  }
  todos.array.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
      <td>${todo.task}</td>
      <td>${!todo.date ? todo.date : "no date...!"}</td>
      <td>${!todo.completed ? "Completed" : "Pending"}</td>
      <td>
        <button onclick="editHandler('${todo.id}')">Edit</button>
        <button onclick="toggleHandler('${todo.id}')">${
      todo.completed ? "Undo" : "Do"
    }</button>
        <button onclick="deleteHandler('${todo.id}')">delete</button>
      </td>
    </tr>
    `;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    completed: false,
    task,
    date,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("todo added successfully", "success");
  } else {
    showAlert("please enter add todo", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("todos empty !!!", "error");
  }
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("todo is deleted..", "success");
};

const toggleHandler = (id) => {
  const newsTodos = todos.find(todo => todo.id === id);
  newsTodos.completed = !newsTodos.completed;
  saveToLocalStorage();
  displayTodos();
  showAlert("todo status changed successfully", "success");
};

const editHandler = (id) => {
  const todo = todos.find(todo => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find(todo => todo.id === id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  addButton.style.display = "inline-block";
  editButton.style.display = "none";
  saveToLocalStorage();
  displayTodos();
  showAlert("todo edited successfully", "success");
};

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
editButton.addEventListener("click", applyEditHandler)
deleteButton.addEventListener("click", deleteAllHandler);
