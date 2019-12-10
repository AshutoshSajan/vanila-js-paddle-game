export default class Brick {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.wallImage = game.wallImage;

    this.game = game;

    // this.position = { x: 10, y: 10 };
    this.position = position;

    this.width = 80;
    this.height = 24;
  }

  draw(ctx) {
    // ctx.fillStyle = "#f00";
    ctx.drawImage(
      this.wallImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(dt) {
    // TODO
  }
}
