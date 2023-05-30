export default class Ball {
  constructor(ballElem) {
    this.ball = ballElem;
    this.reset();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = {
      velX: 1.5,
      velY: 0.2,
    };
  }

  getRect() {
    return this.ball.getBoundingClientRect();
  }

  get x() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"));
  }

  set x(value) {
    this.ball.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"));
  }

  set y(value) {
    this.ball.style.setProperty("--y", value);
  }

  update(paddleAI, paddle1) {
    const height = window.innerHeight;
    const width = window.innerWidth;
    if (this.getRect().top > height || this.getRect().top < 0) {
      this.direction.velY = -this.direction.velY;
    }
    if (collisionDetected(this, paddleAI, paddle1)) {
      this.direction.velX = -this.direction.velX;
    }
    this.y += this.direction.velY;
    this.x += this.direction.velX;
    paddleAI.position = this.y;
  }
}

function collisionDetected(ball, paddleAI, paddle1) {
  const collisionAI =
    ball.x === 98 &&
    ball.y > paddleAI.position - 5 &&
    ball.y < paddleAI.position + 5;

  const collisionP1 =
    ball.x === 2 &&
    ball.y > paddle1.position - 5 &&
    ball.y < paddle1.position + 5;
  return collisionAI || collisionP1;
}
