/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 10;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var BOARD_WIDTH = $('#board').width(); // Number: the maximum X-Coordinate of the screen
  var BOARD_HEIGHT = $('#board').height();
  var KEY = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
  }

  var score = 0;
  var canLeft = false;
  var canRight = true;
  var canUp = true;
  var canDown = true;

  // Game Item Objects

  function GameItem(id, x, y, speedX, speedY) {
    var gameItemInstance = {
      id: id,
      x: x,
      y: y,
      width: $(id).width(),
      height: $(id).height(),
      speedX: speedX,
      speedY: speedY,
    };
    return gameItemInstance;
  }

  var snakeHead = GameItem("#snake-head", BOARD_WIDTH - 20 - $("#snake-head").width(), 200, 0, 0);
  var apple = {
    x: Math.floor(Math.random() * 45) * 20,
    y: Math.floor(Math.random() * 25) * 20,
    id: "#apple"
  }
  var snake = [snakeHead]


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    headHitBody();
    drawObject(apple);
    wallColision(snakeHead);
    drawScore();
    eatApple();
    checkSelf();
    moveBody();
    drawSnakeHead();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      if (snakeHead.speedY === 0 && canUp){
        snakeHead.speedY = -20;
        snakeHead.speedX = 0;
      }
    }
    if (event.which === KEY.DOWN) {
      if (snakeHead.speedY === 0 && canDown){
        snakeHead.speedY = 20;
        snakeHead.speedX = 0;
      }
      
    }
    if (event.which === KEY.RIGHT) {
      if (snakeHead.speedX === 0 && canRight){
        snakeHead.speedX = 20;
        snakeHead.speedY = 0;
      }

    }
    if (event.which === KEY.LEFT) {
      if (snakeHead.speedX === 0 && canLeft){
        snakeHead.speedX = -20;
        snakeHead.speedY = 0;
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function drawSnakeHead() {
    // update positon
    snakeHead.y += snakeHead.speedY;
    snakeHead.x += snakeHead.speedX;
    drawObject(snakeHead);
  }

  function drawObject(obj) { // draws the object
    $(obj.id).css("top", obj.y);
    $(obj.id).css("left", obj.x);
  }

  function wallColision(obj) { // object collides to wall
    if (obj.x > BOARD_WIDTH - $(obj.id).width() || obj.x < 0 || obj.y > BOARD_HEIGHT - $(obj.id).height() || obj.y < 0) {
      endGame();
    }
  }

  function drawScore() {
    $("#score").text(score); // draws score of snake
  }

  function eatApple() { // snakes eats the apple
    if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
      score++;
      apple.x = Math.floor(Math.random() * 45) * 20;
      apple.y = Math.floor(Math.random() * 25) * 20;
      console.log("eaten")
      growBody();
    }
  }

  function growBody() { // grows body every time snake eats the apple
    var id = "snake" + snake.length;

    $("<div>")
      .addClass("snake")
      .attr('id', id)
      .appendTo("#board")

    var tail = snake[snake.length - 1];
    var newBody = GameItem("#" + id, tail.x, tail.y, 0, 0);
    drawObject(newBody);
    snake.push(newBody);
  }

  function moveBody() { // movves the body
    for (var i = snake.length - 1; i >= 1; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;

      drawObject(snake[i]);

    }
  }

  function checkSelf() { // checks if the snake isn't reversing its direction
    snakeHead.x > snakeHead.prevX ? canLeft = false : canLeft = true;
    snakeHead.x < snakeHead.prevX ? canRight = false : canRight = true;
    snakeHead.y > snakeHead.prevY ? canUp = false : canUp = true;
    snakeHead.y < snakeHead.prevY ? canDown = false : canDown = true;
  };

  function headHitBody(){
    for (var i = 1; i < snake.length; i++){
      if (snakeHead.x === snake[i].x && snakeHead.y === snake[i].y){
        endGame();
        console.log("HIT BODY")
      }
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
