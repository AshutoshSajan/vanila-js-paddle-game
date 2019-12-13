import Game from "./game.js";
// console.log(Game);

// var body = document.querySelector("body");

// let canvasWidth = body.clientWidth;
// let canvasHeight = body.clientHeight;

let canvas = document.getElementById("game-screen");
let ctx = canvas.getContext("2d");

// canvas.width = canvasWidth - 20;
// canvas.height = canvasHeight - 40;

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 700;

// window.onresize = function(e) {
//   console.log(e, "resize event...");
//   canvasWidth = e.target.innerWidth;
//   canvasHeight = e.target.innerHeight;

//   canvas.width = canvasWidth - 20;
//   canvas.height = canvasHeight - 40;
// };

let ballImage = new Image();
let wallImage = new Image();

ballImage.src = "assets/media/basketball.png";
wallImage.src = "assets/media/brick.png";

let game = new Game(GAME_WIDTH, GAME_HEIGHT, ballImage, wallImage);
// let game = new Game(canvasWidth, canvasHeight, ballImage, wallImage);

let lastTime = 0;

export function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  // ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
