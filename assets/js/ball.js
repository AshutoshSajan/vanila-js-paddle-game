import { detectCollision } from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
    this.image = game.ballImage;
    this.position = { x: 50, y: 200 };
    this.size = 20;

    this.speed = {
      x: 2,
      y: 2
    };
  }

  reset() {
    this.position = { x: 50, y: 200 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(dt) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // left right ball collision check
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // ball top collision check
    // let topOfBall = this.position.y;
    // let leftSideOfBall = this.position.x;
    // let rightSideOfBall = this.position.x + this.width;
    // let bottomOfBall = this.position.y + this.height;

    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // bottom collision of ball
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // collision check for ball and paddle
    var paddleMovement = this.game.paddle.position.x;

    if (detectCollision(this, this.game.paddle)) {
      // console.log("ball paddle collision check", this.game.paddle.position.x);
      this.speed.y = -this.speed.y;
      // if(this.game.paddle.position.x > paddleMovement){
      //   this.speed.x = -this.speed.x;
      // } else {
      //   this.speed.x = this.speed.x;
      // }
      // this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
