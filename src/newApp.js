const taskInput = document.getElementById("");
const dateInput = document.getElementById("");
const addButton = document.getElementById("");
const alertMessage = document.getElementById("");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

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

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

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
    taskInput.value = "";
    dateInput.value = "";
    showAlert("todo added successfully", "success");
  } else {
    showAlert("please enter add todo", "error");
  }
};

addButton.addEventListener("click", addHandler);
