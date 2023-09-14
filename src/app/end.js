const scoreElem = document.getElementsByClassName("");
const button = document.querySelector("");
const input = document.querySelector("");

const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

scoreElem.innerText = score;

const saveHandler = () => {
  if (!input.value || !score) {
    alert("invalid username or score");
  } else {
    const finalScore = {
      name: input.value,
      score,
    };
      highScores.push(finalScore);
      highScores.sort((a, b) => b.score - a.score);
      highScores.splice(10);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      localStorage.removeItem("score");
      window.location.assign("/");
  }
};

button.addEventListener("click", saveHandler);
