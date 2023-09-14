const buttons = document.querySelectorAll("");

const selectHandler = (event) => {
  const level = event.target.innerText.toLowerCase();
  localStorage.setItem("level", level);
  window.location.assign("/");
};

buttons.forEach((button) => button.addEventListener("click", selectHandler));
