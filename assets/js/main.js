import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import Game from "./game.js";

let canvas = document.getElementById("game-screen");
let ctx = canvas.getContext("2d");

let ballImage = new Image(); // Using optional size for image
// image.onload = drawImageActualSize; // Draw when image has loaded
let wallImage = new Image();
// Load an image of intrinsic size 300x227 in CSS pixels
ballImage.src = "assets/media/basketball.png";
wallImage.src = "assets/media/brick.png";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// let ball = new Ball(ballImage, 2, GAME_WIDTH, GAME_HEIGHT);
// let wall = new Ball(wallImage);

let game = new Game(GAME_WIDTH, GAME_HEIGHT, ballImage, wallImage);
// new InputHandler(paddle);
game.start();

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.draw(ctx);
  game.update(deltaTime);

  // paddle.draw(ctx);
  // paddle.update(deltaTime);

  // ball.update(deltaTime);
  // ball.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
