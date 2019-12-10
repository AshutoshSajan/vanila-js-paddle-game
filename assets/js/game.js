import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1 } from "./levels.js";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight, ballImage, wallImage) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.ballImage = ballImage;
    this.wallImage = wallImage;
  }

  start() {
    this.gameState = GAME_STATE.RUNNING;

    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    let bricks = buildLevel(this, level1);

    this.gameObjects = [this.ball, this.paddle, ...bricks];
    new InputHandler(this.paddle, this);
  }

  update(dt) {
    if (this.gameState == GAME_STATE.PAUSED) return;

    this.gameObjects.forEach(obj => {
      return obj.update(dt);
    });

    this.gameObjects = this.gameObjects.filter(obj => !obj.markedForDeletion);
  }

  draw(ctx) {
    this.gameObjects.forEach(obj => {
      obj.draw(ctx);
    });

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "64px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);

      ctx.font = "28px Arial";
      ctx.fillStyle = "green";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press space key again to resume the game",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      );
    }
  }

  togglePause() {
    if (this.gameState == GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }
}
