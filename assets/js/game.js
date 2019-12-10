import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1 } from "./levels.js";

export default class Game {
  constructor(gameWidth, gameHeight, ballImage, wallImage) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.ballImage = ballImage;
    this.wallImage = wallImage;
  }

  start() {
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    let bricks = buildLevel(this, level1);

    // for (var i = 0; i <= 15; i++) {
    //   bricks.push(new Brick(this, { x: i * 50, y: 30 }));
    // }
    // let brick = new Brick(this, { x: 20, y: 20 });

    this.gameObjects = [this.ball, this.paddle, ...bricks];

    new InputHandler(this.paddle);
  }

  update(dt) {
    // this.paddle.update(dt);
    // this.ball.update(dt);

    this.gameObjects.forEach(obj => {
      obj.update(dt);
    });
  }

  draw(ctx) {
    // this.paddle.draw(ctx);
    // this.ball.draw(ctx);

    this.gameObjects.forEach(obj => {
      obj.draw(ctx);
    });
  }
}
