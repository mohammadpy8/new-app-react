import formatedData from "./helper";

const loader = document.getElementById("");
const container = document.getElementById("");
const questionText = document.getElementById("");
const answerList = document.getElementById("");
const scoreText = document.getElementById("");

const CORRECT_BONUS = 10;
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0; 
let isAccepted = true;

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formattedData = formatedData(json.results);
  start();
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
    if (!isAccepted) return;
    isAccepted = false;
    const isCorrect = index === correctAnswer ? true : false;
    if (isCorrect) {
        event.target.classList.add("correct");
        score += CORRECT_BONUS;
        scoreText.innerText = score;
    } else {
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct");
    }
};

window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
