import { detectCollision } from "./collisionDetection.js";

export default class Brick {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.wallImage = game.wallImage;

    this.game = game;

    this.position = position;

    this.width = 100;
    this.height = 24;

    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.wallImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(dt) {
    if (detectCollision(this.game.ball, this)) {
      // console.log("bricks collision...");
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
      this.game.score++;
    }
  }
}
