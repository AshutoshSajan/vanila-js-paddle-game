import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import { buildLevel, level1 } from "./levels.js";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEW_LAVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight, ballImage, wallImage) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.ballImage = ballImage;
    this.wallImage = wallImage;

    this.gameState = GAME_STATE.MENU;

    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    this.gameObjects = [];

    this.lives = 3;
    this.score = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (this.gameState !== GAME_STATE.MENU) return;

    let bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle, ...bricks];
    this.gameState = GAME_STATE.RUNNING;
  }

  update(dt) {
    if (this.lives === 0) {
      this.gameState === GAME_STATE.GAMEOVER;
    }

    if (
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState == GAME_STATE.MENU ||
      this.gameState == GAME_STATE.GAMEOVER
    )
      return;

    this.gameObjects.forEach(obj => {
      return obj.update(dt);
    });

    this.gameObjects = this.gameObjects.filter(obj => !obj.markedForDeletion);
  }

  draw(ctx) {
    this.gameObjects.forEach(obj => {
      obj.draw(ctx);
    });

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(0, 0, 200, 40);
    // ctx.fill();

    ctx.font = "26px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(600, 0, 200, 40);
    // ctx.fill();

    ctx.font = "26px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";

    ctx.fillText(
      "SCORE : " + this.score,
      this.gameWidth / 2,
      this.gameHeight / 2
    );

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

    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "40px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ENTER to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAME_STATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "60px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
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
