export default class Paddle {
  constructor(paddleElement) {
    this.paddle = paddleElement;
  }

  reset() {
    this.position = 50;
  }

  getRect() {
    return this.paddle.getBoundingClientRect();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddle).getPropertyValue("--position")
    );
  }

  set position(value) {
    if (value < 95 && value > 5) {
      this.paddle.style.setProperty("--position", value);
    }
  }
}
