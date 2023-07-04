const wordsUsed = [];
const wordsListElement = document.querySelector("#words-list");
const addWordButtonElement = document.querySelector("#add-word-button");
const newWordInputElement = document.querySelector("#new-word-input");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");
const timerInterval = setInterval(updateTimer, 1000);

let score = 0;
let time = 30;

function renderList() {
  wordsListElement.innerHTML = "";
  wordsUsed.forEach(function (word) {
    const newListItem = document.createElement("li");
    newListItem.innerText = word;
    wordsListElement.appendChild(newListItem);
  });
}

function updateScore(points) {
  score += points;
  displayScore();
}

function displayScore() {
  scoreElement.textContent = score;
}

function updateTimer() {
  time--;
  timeElement.textContent = time;
  if (time === 0) {
    clearInterval(timerInterval);
    alert(`Game over! Your final score is ${score}.`);
  }
}

function handleWordAdd(newWord) {
  if (wordsUsed.length === 0) {
    wordsUsed.push(newWord);
    return renderList();
  }
  const firstLetterOfNewWord = newWord[0];
  const lastWordInList = wordsUsed[wordsUsed.length - 1];
  const lastLetterOfLastWordInList = lastWordInList[lastWordInList.length - 1].toLowerCase(); // Convert to lowercase
  if (lastLetterOfLastWordInList === firstLetterOfNewWord) {
    wordsUsed.push(newWord);
    renderList();
    updateScore(1);
    displayScore();

  } else {
    updateScore(-1);
    displayScore();
    alert(`Try again! Your next word needs to start with ${lastLetterOfLastWordInList}.`);
  }
}

function respondToWordSubmit() {
  const newWordToAdd = newWordInputElement.value;
  handleWordAdd(newWordToAdd);
  newWordInputElement.value = "";
}

addWordButtonElement.addEventListener("click", respondToWordSubmit);