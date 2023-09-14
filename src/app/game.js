const loader = document.getElementById("");
const container = document.getElementById("");

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formattedData = null;

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formattedData = json;
  start();
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
};

window.addEventListener("load", fetchData);
