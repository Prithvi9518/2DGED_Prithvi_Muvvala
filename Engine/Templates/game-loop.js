// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

/* GAME VARIABLES HERE */


// Create a function that will load our game
function loadGame() {
    initializeGame();
    window.requestAnimationFrame(animate);
}

// Set up game values
function initializeGame() {

}

// Create a function that will run every time the browser updates
function animate() {
    // Update game state
    update();

    // Re-draw updated game state
    draw();

    // Loop
    window.requestAnimationFrame(animate);
}

// Create a function that will update our game
function update() {

}

// Create a function that will re-draw our updated game
function draw() {
    clearCanvas();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

let keysDown = {};

// Add an event listener that will be triggered when the
// user presses (or holds) a button

// In this example, we are using an anonymouse function
// i.e. a function without a name
window.addEventListener("keydown", function (event) {

    // Add the button that the user has pressed to a 
    // keysDown object
    keysDown[event.key] = true;
});

// Add an event listener that will be triggered when the 
// user releases a button

// In this example, we are using an anonymouse function
// i.e. a function without a name
window.addEventListener("keyup", function (event) {

    // Remove the key that the user is no longer pressing
    // from our keysDown object
    delete keysDown[event.key];
});

// Load our game when the webpage is loaded
window.addEventListener("load", loadGame);