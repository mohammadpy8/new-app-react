const list = document.getElementsByClassName("");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const contnt = highScores.map((score, index) => {
  return `
        <li>
            <span>${index + 1}</span>
            <p>${score.name}</p>
            <span>${score.score}</span>
        </li>
    `;
});

list.innerHTML = contnt.join("");
