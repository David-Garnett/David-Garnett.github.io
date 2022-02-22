/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var BOARD_WIDTH = $('#board').width(); // Number: the maximum X-Coordinate of the screen
  var BOARD_HEIGHT = $('#board').height();
  var KEY = {
    UP: 38,
    DOWN: 40,
    W: 83,
    S: 87
  }


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

  var leftPaddle = GameItem("#leftPaddle", 20, 200, 0, 0);
  var rightPaddle = GameItem("#rightPaddle", BOARD_WIDTH - 20 - $("#rightPaddle").width(), 200, 0, 0);
  var ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3));
  var scoreLeftPaddle = 0;
  var scoreRightPaddle = 0;
  var message = GameItem("#message", 20, 200, 0, 0);

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // changeeventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $('#button2').on('click', challengeMode);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(rightPaddle);
    moveObject(leftPaddle);
    moveObject(ball);
    wallColision(rightPaddle);
    wallColision(leftPaddle);
    ballCollideTopBottom();
    ballCollideLeftRight();
    handlePaddleHit();
    drawScore();
    end();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) { //handles key down
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -7;
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 7;
    }
    if (event.which === KEY.W) {
      leftPaddle.speedY = 7;
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = -7;
    }
  }

  function handleKeyUp(event) { //handles key up
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.W || event.which === KEY.S) {
      leftPaddle.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function moveObject(obj) {
    // update positon
    obj.y += obj.speedY;
    obj.x += obj.speedX;
    $(obj.id).css("top", obj.y);
    $(obj.id).css("left", obj.x);
  }

  function wallColision(obj) { // object collides to wall
    if (obj.x > BOARD_WIDTH - $(obj.id).width()) {
      obj.x = BOARD_WIDTH - $(obj.id).width();
    }
    else if (obj.x < 0) {
      obj.x = 0;
    }
    if (obj.y > BOARD_HEIGHT - $(obj.id).height()) {
      obj.y = BOARD_HEIGHT - $(obj.id).height();
    }
    else if (obj.y < 0) {
      obj.y = 0;
    }
  }

  function ballCollideTopBottom() { // ball collides with top and bottom wall
    if (ball.y > BOARD_HEIGHT - ball.height) {
      ball.speedY *= -1;
    }
    if (ball.y < 0) {
      ball.speedY *= -1;
    }
  }

  function ballCollideLeftRight() { // ball collides with left and right wall
    if (ball.x > BOARD_WIDTH - ball.width) {
      ball.speedX *= -1;
      scoreLeftPaddle += 1;
      reset();
    }
    if (ball.x < 0) {
      ball.speedX *= -1;
      scoreRightPaddle += 1;
      reset();
    }
  }

  function doCollide(obj1, obj2) {
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + $(obj1.id).width(); // collides with objects
    obj1.bottomY = obj1.y + $(obj1.id).height();

    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + $(obj2.id).width();
    obj2.bottomY = obj2.y + $(obj2.id).height();

    if ((obj1.rightX > obj2.leftX) &&
      (obj1.leftX < obj2.rightX) &&
      (obj1.bottomY > obj2.topY) &&
      (obj1.topY < obj2.bottomY)) {
      return true;
    } else {
      return false;
    }
  }

  function handlePaddleHit() {
    if (doCollide(leftPaddle, ball)) {
      ball.speedX *= -1; // ball bounces after hitting left paddle
      ballSpeed();
    }
    if (doCollide(rightPaddle, ball)) {
      ball.speedX *= -1; // ball bounces after hitting right paddle
      ballSpeed();
    }
  }

  function ballSpeed() {
    if (ball.speedX >= 0) {
      ball.speedX += 0.5;
    } else {
      ball.speedX -= 0.5;
    }
    if (ball.speedY >= 0) {
      ball.speedY += 0.5;
    } else {
      ball.speedY -= 0.5;
    }
  }

  function drawScore() {
    $("#scoreLeftPaddle").text(scoreLeftPaddle); // draws score of left paddle
    $("#scoreRightPaddle").text(scoreRightPaddle); // draws score of right paddle
  }

  function reset() {
    if (scoreLeftPaddle !== 10 || scoreRightPaddle !== 10) {
      leftPaddle = GameItem("#leftPaddle", 20, 200, 0, 0); // resets the paddle everytime a point is scored
      rightPaddle = GameItem("#rightPaddle", BOARD_WIDTH - 20 - $("#rightPaddle").width(), 200, 0, 0);
      ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3));
    }
    else {
      leftPaddle = GameItem("#leftPaddle", 20, 200, 0, 0);
      rightPaddle = GameItem("#rightPaddle", BOARD_WIDTH - 20 - $("#rightPaddle").width(), 200, 0, 0);
      ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 0, 0);
    }
  }

  function challengeMode() {
    ball.speedX += 1; // changes ball speed
    console.log(ball.speedX);
  };

  function end() {
    if (scoreLeftPaddle === 10) {
      $("#message").text("Player 1 Wins!");
      $("#button2"); // stops game  if player 1 has 10 points
      endGame();
    }
    if (scoreRightPaddle === 10) {
      $("#message").text("Player 2 Wins!");
      $("#button2"); // stops game  if player 2 has 10 points
      endGame();
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}