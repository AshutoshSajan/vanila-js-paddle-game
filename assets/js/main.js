import Game from "./game.js";

let canvas = document.getElementById("game-screen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let ballImage = new Image();
let wallImage = new Image();

ballImage.src = "assets/media/basketball.png";
wallImage.src = "assets/media/brick.png";

let game = new Game(GAME_WIDTH, GAME_HEIGHT, ballImage, wallImage);
game.start();

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
