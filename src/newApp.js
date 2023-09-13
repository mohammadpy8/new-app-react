const taskInput = document.getElementById("");
const dateInput = document.getElementById("");
const addButton = document.getElementById("");
const alertMessage = document.getElementById("");
const todosBody = document.getElementById("");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

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
        <button></button>
        <button></button>
        <button></button>
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

addButton.addEventListener("click", addHandler);
