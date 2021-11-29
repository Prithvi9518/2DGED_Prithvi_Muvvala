// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

// Get a handle to our scoreboard
const scoreBoard = document.getElementById("score_board");

// Create some variables that will represent the various elements
// of our game
let ball;
let ballMovementVector;
let ballSpeed;
let ballLineWidth;

let leftPaddle;
let rightPaddle;
let paddleMoveSpeed;
let paddleLineWidth;

let paddleWidth;
let paddleHeight;
let margin;

let ballColor;
let altColor1;
let altColor2;
let altColor3;

let leftPaddleStroke;
let rightPaddleStroke;
let paddleFill;

let player1Score;
let player2Score;

// Create a function that will load our game
function loadGame() {

  // Initialize game
  initializeGame();

  // Start game loop
  window.requestAnimationFrame(animate);
}

// Create a function that will reset our game
function resetGame() {

  clearCanvas(Constants.CANVAS_COLOR);
  loadGame();
}

function resetRound() {

  clearCanvas(Constants.CANVAS_COLOR);
  initializeBall();
}

function initializeGame() {

  initializeCanvas();
  initializeScore();

  initializeBall();
  initializePaddles();
}

function initializeCanvas() {
  canvas.style.backgroundColor = Constants.CANVAS_COLOR;
  canvas.style.border = Constants.CANVAS_BORDER;

  canvas.width = Constants.CANVAS_WIDTH;
  canvas.height = Constants.CANVAS_HEIGHT;
}

function initializeScore() {

  player1Score = 0;
  player2Score = 0;

  updateScore();
}

function updateScore() {

  scoreBoard.innerHTML = player1Score + " - " + player2Score;
}

// Initialize our ball
function initializeBall() {

  // Set ball movement speed
  ballSpeed = Constants.BALL_SPEED;

  // Set ball line width
  ballLineWidth = Constants.BALL_LINE_WIDTH;

  // Set ball primary color
  ballColor = Constants.BALL_COLOR_0;

  // Set ball bounce colors
  altColor1 = Constants.BALL_COLOR_1;
  altColor2 = Constants.BALL_COLOR_2;
  altColor3 = Constants.BALL_COLOR_3;

  // Create a ball at the middle of the screen
  ball = new Arc(
    canvas.clientWidth / 2, 
    canvas.clientHeight / 2,
    Constants.BALL_RADIUS,
    0,
    Math.PI * 2
  );

  // Use our new function to generate values for our Vector
  const randomX = GDUtilities.GetRandomInRangeExcluding(Constants.MIN_X_RANGE, Constants.MAX_X_RANGE, 0);
  const randomY = GDUtilities.GetRandomInRangeExcluding(Constants.MIN_Y_RANGE, Constants.MAX_Y_RANGE, 0);

  // Create a vector which will determine where the ball will 
  // move at the start of the game
  ballMovementVector = new Vector2(randomX, randomY);

  // Normalise our vector
  ballMovementVector.normalize();
}

// Initialize our two paddles
function initializePaddles() {

  // Set paddle dimensions
  paddleWidth = Constants.PADDLE_WIDTH;
  paddleHeight = Constants.PADDLE_HEIGHT;

  // Set paddle margin
  margin = Constants.CANVAS_MARGIN;

  // Set paddle move speed
  paddleMoveSpeed = Constants.PADDLE_SPEED;

  // Set paddle line width
  paddleLineWidth = Constants.PADDLE_LINE_WIDTH;

  // Set paddle stroke style
  leftPaddleStroke = Constants.LEFT_PADDLE_STROKE;
  rightPaddleStroke = Constants.RIGHT_PADDLE_STROKE;

  // Set paddle fill style
  paddleFill = Constants.PADDLE_FILL;

  // Create left paddle
  leftPaddle = new Rect(
    margin,
    canvas.clientHeight / 2 - paddleHeight / 2,
    paddleWidth,
    paddleHeight,
  );

  // Create right paddle
  rightPaddle = new Rect(
    canvas.clientWidth - paddleWidth - margin,
    canvas.clientHeight / 2 - paddleHeight / 2,
    paddleWidth,
    paddleHeight
  );
}

// Create a function that will run every time the browser updates
function animate() {

  // Update game
  update();

  // Re-draw game
  draw();

  // Loop
  window.requestAnimationFrame(animate);
}

// Create a function that will update our game
function update() {

  updateBall();
  updatePaddles();

  checkCollisions();
  checkBallToPaddleCollision();
}

function updateBall() {
  // Move our ball across the screen with every update
  ball.x += ballMovementVector.x * ballSpeed;
  ball.y += ballMovementVector.y * ballSpeed;
}

function updatePaddles() {

  // Initialize paddle movement vectors
  let leftPaddleMovement = new Vector2(0, 0);
  let rightPaddleMovement = new Vector2(0, 0);

  for (const key in keysDown) {

    // Left paddle
    if (key === Constants.LEFT_KEY_UP) {

      leftPaddleMovement = new Vector2(0, -paddleMoveSpeed);
    }
    else if (key === Constants.LEFT_KEY_DOWN) {

      leftPaddleMovement = new Vector2(0, paddleMoveSpeed);
    }

    // Vertical bounds check
    if (
      (leftPaddle.y + leftPaddleMovement.y) > margin &&
      (leftPaddle.y + leftPaddleMovement.y) + paddleHeight < canvas.clientHeight - margin
    ) {

      // Apply movement
      leftPaddle.moveByDelta(leftPaddleMovement);
    }

    // Right paddle
    if (key == Constants.RIGHT_KEY_UP) {

      rightPaddleMovement = new Vector2(0, -paddleMoveSpeed);
    }
    else if (key == Constants.RIGHT_KEY_DOWN) {

      rightPaddleMovement = new Vector2(0, paddleMoveSpeed);
    }

    // Vertical bounds check
    if (
      (rightPaddle.y + rightPaddleMovement.y) > margin &&
      (rightPaddle.y + rightPaddleMovement.y + paddleHeight) < canvas.clientHeight - margin
    ) {

      // Apply movement
      rightPaddle.moveByDelta(rightPaddleMovement);
    }
  }
}

function checkCollisions() {
  // Check if the ball is leaving the x bounds
  if (ball.x + ball.radius >= canvas.clientWidth) {

    player1Score++;

    updateScore();
    resetRound();
  }
  else if (ball.x - ball.radius <= 0) {

    player2Score++;

    updateScore();
    resetRound();
  }

  // Check if leaving the y bounds
  if (ball.y + ball.radius >= canvas.clientHeight) {

    // Invert ball y movement
    ballMovementVector.y *= -1;

    // Make the ball change colour on bounce
    ballColor = altColor3;
  }
  else if (ball.y - ball.radius <= 0) {

    // Invert ball y movement
    ballMovementVector.y *= -1;

    // Make the ball change colour on bounce
    ballColor = altColor3;
  }
}

function checkBallToPaddleCollision() {

  // Project balls next position
  let projectedBallPosition = new Vector2(
    ballMovementVector.x + ball.x,
    ballMovementVector.y + ball.y
  );

  // Check if ball in line with the left paddle
  if (
    projectedBallPosition.y >= leftPaddle.y &&
    projectedBallPosition.y <= leftPaddle.y + leftPaddle.height
  ) {

    // Check if ball colliding with the left paddle
    if (projectedBallPosition.x - ball.radius <= leftPaddle.x + leftPaddle.width) {

      ballMovementVector.x *= -1;

      ballColor = altColor1;
    }
  }

  // Check if ball in line with the right paddle
  if (
    projectedBallPosition.y >= rightPaddle.y &&
    projectedBallPosition.y <= rightPaddle.y + rightPaddle.height
  ) {

    // Check if ball colliding with the left paddle
    if (projectedBallPosition.x + ball.radius >= rightPaddle.x) {

      ballMovementVector.x *= -1;

      ballColor = altColor2;
    }
  }
}

// Create a function that will re-draw our updated game
function draw() {
  clearCanvas(Constants.CANVAS_COLOR);

  ball.draw(context, ballLineWidth, ballColor, ballColor);

  leftPaddle.draw(context, paddleLineWidth, leftPaddleStroke, paddleFill);
  rightPaddle.draw(context, paddleLineWidth, rightPaddleStroke, paddleFill);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

// Load our game when the webpage loads
window.addEventListener("load", loadGame);

// Create keys down object
// This will be used to determine which keys are currently
// held down by the user
//
// This will allow us to loop through each element in the object
// to determine if we need to perform some action, based on the
// users current input (i.e., if the user is currently holding down
// the 'w' key, we would want to move the left paddle up)
let keysDown = {};

// Trigger a function when a key is pressed
window.addEventListener("keydown", function (event) {

  keysDown[event.key] = true;
});

// Trigger a function when a key is released
window.addEventListener("keyup", function (event) {

  delete keysDown[event.key];
});

function getRandomInRangeExcluding(min, max, excluded) {
  let value = excluded;

  while (value == excluded) {
    value = Math.floor(Math.random() * (max - min + 1) + min);
  }

  return value;
}