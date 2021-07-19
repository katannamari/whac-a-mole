const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const score = document.querySelector(".score");
const timeLeft = document.querySelector(".time-left");

let result = 0;
let hitPosition;
let currentTime = 10;
let timer = null;

const moleBehaviour = () => {
  // At the start of the game, clean the board
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  // Move mole around the grid
  let randomSquare = squares[Math.floor(Math.random() * 9)];
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
};

moveMole();

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
