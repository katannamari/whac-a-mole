// Variable initialization
const button = document.querySelector(".button");
const gameInfo = document.querySelector(".game-info");

// GAME BOARD

// Grab correct div to add content to:
const element = document.querySelector(".grid");

// An array for how many squares are needed for board
const boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const createBoard = (boardArray, id) => {
  // initial empty variable we add markup to
  let markup = "";

  // Loop creates required squares for the board according to array
  for (let i = 0; i < boardArray.length; i++) {
    markup += `<div class="square" id="${boardArray[i]}"></div>`;
  }
  // Prints the markup inside <div class="grid"></div>
  element.innerHTML = markup;
};
createBoard(boardArray);

// MOLE BEHAVIOUR

// Grab correct divs from html file:
const mole = document.querySelector(".mole");
const squares = document.querySelectorAll(".square");
let hitPosition;

const moleBehaviour = () => {
  // At the start of the game, clean the board by removing the
  // "mole"-class
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  // Move mole around the grid by picking a random one of the squares
  // and adding the "mole"-class to it
  let randomSquare = squares[Math.floor(Math.random() * 8)];
  randomSquare.classList.add("mole");

  // hitPosition is the same as the randomized mole location
  hitPosition = randomSquare.id;
};

const moveMole = () => {
  timer = setInterval(moleBehaviour, 500);
  clearInterval(moleBehaviour);
};

// SCORE COUNTING

const score = document.querySelector(".score");
let result = 0;
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

resetGame = () => {
  score.textContent = 0;
  timeLeft.textContent = 10;
};

// TIMER
const timeLeft = document.querySelector(".time-left");
let currentTime = 10;
let timer = null;

startGame = () => {
  resetGame();
  const countDown = () => {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
      clearInterval(countDownTimer);
      clearInterval(timer);
      // alert("Game over! You scored " + result + " points.");
      score.classList.add("score-final");
      score.classList.remove("score");
      button.classList.remove("button-hidden");
      currentTime = 10;
      result = 0;
    }
  };
  let countDownTimer = setInterval(countDown, 1000);
  moveMole();

  button.classList.add("button-hidden");
  gameInfo.style.removeProperty("display");
};
