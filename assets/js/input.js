export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", e => {
      // console.log(e.keyCode);
      switch (e.keyCode) {
        case 37:
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;

        case 32:
          game.togglePause();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;

        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;

        default:
          break;
      }
    });
  }
}
