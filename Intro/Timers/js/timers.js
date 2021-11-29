// There are three types of timers in JavaScript
// The ones that we are going to look at are 
// setTimeout
// setInterval
// requestAnimationFrame

// setTimeout(callbackFunction, timeInMs)
// clearTimeout(timer);

// A callback function is a function which is passed to another function as a parameter to be executed later

// Let's start by looking at timeout timers
// A timeout timer will expire once after a pre-set amount of time
function demoTimeoutTimer() {

    // Let's create a variable called timeoutTimer - this will be used to store a handle to our timeout timer
    let timeoutTimer;

    // Let's also create a variable that will determine how much time must elapse before the timer will expire
    let timeoutTime = 2000;

    // Create a function that will start a timer when called
    function startTimeoutTimer() {

        // Start a timer
        // Store a handle to the timer that we create
        timeoutTimer = setTimeout(timeoutFunction, timeoutTime);
        console.log("Timer has started!");
    }

    // Create a function that will be called when our timeout timer expires
    function timeoutFunction() {
        console.log("The timer has elapsed!");
    }

    // Create a function that will stop our timeout timer when called
    function stopTimeoutTimer() {

        // Stop the timeout timer
        clearTimeout(timeoutTimer);
        console.log("The timer has been stoppped!");
    }

    // We can call the function directly to start our timer
    // startTimeoutTimer();

    // Or, we can start our timer by adding an event listener to our webpage
    // The following line of code will execute the startTimer function after
    // everything else on this page is loaded
    window.addEventListener("load", startTimeoutTimer);

    // Let's add another function that will stop our timer whenever the user clicks
    window.addEventListener("click", stopTimeoutTimer);

    // One thing to note about setTimeout is that the timer will continue to elapse
    // even if the user clicks out of the webpage
}

// Next, we'll look at interval timers
// Interval timers are different from timeout timers in that they expire continously
// using a pre-set interval - almost like a heartbeat. We can think of the interval
// as the amount of time between each heartbeat.

// The time between each expiration is known as the interval

function demoIntervalTimer() {

    // Let's create a variable called intervalTimer - this will be used to store a handle to our interval timer
    let intervalTimer;

    // Let's also create a variable that will determine how much time must elapse between each expire
    let intervalTime = 1000;

    // Create a function that will start our interval timer when called
    function startIntervalTimer() {

        // Start a timer
        // Store a handle to the timer that we create
        intervalTimer = setInterval(intervalFunction, intervalTime);
        console.log("Interval timer has started!");
    }

    // Create a function that will be called when our interval timer expires
    function intervalFunction() {
        console.log("Interval timer has elapsed!");
    }

    // Create a function that will stop our interval timer when called
    function stopIntervalTimer() {

        // Stop the interval timer
        clearInterval(intervalTimer);
        console.log("Interval timer has been stoppped!");
    }

    // Start interval timer when the page loads
    window.addEventListener("load", startIntervalTimer);

    // Stop interval timer when the user clicks on the page
    window.addEventListener("click", stopIntervalTimer);

    // But, again - just like setTimeout - setInterval continues to elapse even if the user 
    // navigates away from the web page.
}

// The final timer that we're going to look at is the request animation frame timer.
// Request animation frame is called at a refresh rate that is natural for the browser.
// For Google Chrome, this is usually 60 FPS.

// Esentially, request animation frame attempts to work at the same refresh rate as the
// browser.
function demoAnimateTime() {
    // Create a function that will start our animation timer
    function startAnimationTimer() {

        // Notice that we don't store a handle our timer
        // And that we don't pass through a time
        window.requestAnimationFrame(animationFunction);
        console.log("Animation timer has started");
    }

    // Also note that this function is only called once
    function animationFunction() {
        console.log("Animation timer has elapsed");

        // We can call the function inside of itself to create a loop
        // window.requestAnimationFrame(animationFunction);
    }

    // Start the animation timer when the page loads
    window.addEventListener("load", startAnimationTimer);

    // Check what happens when you navigate away from the webpage - does the timer
    // continue to elapse?

    // No it doesn't! This gives us the ability to automatically pause our timers 
    // when the user moves away from the page (when the window loses focus)
}

// Let's use this ability to create animation functions to build our game
// These animation functions will essentially be the backbone of our game
// They will dictate our main game loop

// Create a function that will load our game
function loadGame() {
    window.requestAnimationFrame(animate)
}

// Create a function that will run every time the browser updates
function animate() {
    console.log("Animating");

    // Update game
    update();

    // Re-draw game
    draw();

    // Loop
    window.requestAnimationFrame(animate);
}

// Create a function that will update our game state
function update() {
    console.log("Updating");
}

// Create a function that will re-draw our updated game
function draw() {
    console.log("Drawing");
}

// Load our game when the webpage loads
window.addEventListener("load", loadGame);