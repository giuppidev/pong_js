import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const PADDLE_SPEED = 3;
const MAX_POINTS = 5;

const ball = new Ball(document.getElementById("ball"));
const paddle1 = new Paddle(document.getElementById("player1"));
const paddleAI = new Paddle(document.getElementById("ai"));
const scoreP1 = document.getElementById("p1-score");
const scoreAI = document.getElementById("p2-score");
const restartBtn = document.getElementById("restart");
function update() {
  ball.update(paddleAI, paddle1);
  if (checkIsPoint()) {
    resetGame();
  }
  if (!gameOver()) {
    globalID = window.requestAnimationFrame(update);
  }
}

restartBtn.addEventListener("click", restart);

function restart() {
  document.getElementById("gameover").style.display = "none";
  scoreAI.innerHTML = 0;
  scoreP1.innerHTML = 0;
  globalID = window.requestAnimationFrame(update);
}

let globalID = window.requestAnimationFrame(update);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowDown") {
    paddle1.position += PADDLE_SPEED;
  } else if (event.key === "ArrowUp") {
    paddle1.position -= PADDLE_SPEED;
  }
});

function checkIsPoint() {
  if (ball.x < 0) {
    scoreAI.innerHTML = parseInt(scoreAI.innerHTML) + 1;
    return true;
  }
  if (ball.x > 100) {
    scoreP1.innerHTML = parseInt(scoreP1.innerHTML) + 1;
    return true;
  }
  return false;
}

function gameOver() {
  const p1Win = parseInt(scoreP1.innerHTML) >= MAX_POINTS;
  const aiWin = parseInt(scoreAI.innerHTML) >= MAX_POINTS;
  const isGameOver = p1Win || aiWin;
  if (p1Win) {
    console.log("Player 1 win");
  } else if (aiWin) {
    console.log("AI win");
  }
  if (isGameOver) {
    cancelAnimationFrame(globalID);
    document.getElementById("gameover").style.display = "flex";
  }

  return isGameOver;
}

function resetGame() {
  ball.reset();
  paddle1.reset();
  paddleAI.reset();
}
