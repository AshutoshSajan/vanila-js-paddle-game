export default class Ball {
  constructor(image, speed, gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image = image;
    this.position = { x: 10, y: 10 };
    this.size = 20;

    this.speed = {
      x: speed,
      y: speed
    };
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

    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
      // this.speed.y = -this.speed.y;
      this.position.x = 10;
      this.position.y = 10;
      this.speed.x = 0;
      this.speed.y = 0;
    }
  }
}
