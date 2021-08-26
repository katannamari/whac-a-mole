// Variable initialization
const score = document.querySelector(".score");
const timeLeft = document.querySelector(".time-left");
const button = document.querySelector(".button");
const gameInfo = document.querySelector(".game-info");

let result = 0;
let hitPosition;
let currentTime = 10;
let timer = null;

// Create game board in the html-file
const element = document.querySelector(".grid");
const boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const createBoard = (gameBoard, id) => {
  let gameSquare = "";
  for (let i = 0; i < gameBoard.length; i++) {
    gameSquare += `<div class="square" id="${gameBoard[i]}"></div>`;
  }
  element.innerHTML = gameSquare;
};
createBoard(boardArray);

// Mole behaviour
const mole = document.querySelector(".mole");
const squares = document.querySelectorAll(".square");
const moleBehaviour = () => {
  // At the start of the game, clean the board
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  // Move mole around the grid
  let randomSquare = squares[Math.floor(Math.random() * 8)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
};

// Checking player's mouse click to see if it matches where
// the mole is
squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    // if it's a match, player scores points
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

const moveMole = () => {
  timer = setInterval(moleBehaviour, 500);
  clearInterval(moleBehaviour);
};

startGame = () => {
  const countDown = () => {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
      clearInterval(countDownTimer);
      clearInterval(timer);
      alert("Game over! Your score is " + result + ".");
    }
  };
  let countDownTimer = setInterval(countDown, 1000);
  moveMole();

  button.classList.add("button-hidden");
  gameInfo.style.removeProperty("display");
};
