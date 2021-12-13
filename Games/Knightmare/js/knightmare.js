// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

/** CORE GAME LOOP CODE - DO NOT CHANGE */

let gameTime;
let notificationCenter;

let cameraManager;
let objectManager;
let keyboardManager;
let soundManager;

// TO DO:
// Add more managers as necessary

function start() {

    // Create a new gameTime object
    // This will allow us to keep track of the time in our game
    gameTime = new GameTime();

    // Initialize game elements
    initialize();

    // TO DO: Publish an event to pause the object manager 
    // and show the menu

    // Start the game loop
    window.requestAnimationFrame(animate);
}

function animate(now) {

    // Update game time
    gameTime.update(now);

    // Update game
    update(gameTime);

    // Re-draw game
    draw(gameTime);

    // Loop
    window.requestAnimationFrame(animate);
}

function update(gameTime) {

    // Call the update method of the object manager class
    // to update all sprites
    objectManager.update(gameTime);

    // Call the update method of the camera manager class
    // to update all cameras
    cameraManager.update(gameTime);

    // TO DO: Update other managers
}

function draw(gameTime) {

    // Clear previous draw
    clearCanvas();

    // Call the draw method of the object manager class
    // to draw all sprites
    objectManager.draw(gameTime);
}

function clearCanvas() {

    // Clear the canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

/** GAME SPECIFIC CODE BELOW - CHANGE AS NECESSARY */

function initialize() {

    initializeNotificationCenter();
    initializeManagers();
    
    // TO DO: Call other initialize functions
    
    // It is important that you call initialize functions in the correct 
    // order. Think about what elements of your game are dependant on other
    // elements being initialized before they can be constructed. For 
    // example, do your sprites require a camera in their constructor? If
    // so, you should initialize your camera before attemptng to initialize
    // your sprites...
    initializeCameras();
    initializeSprites();
}

function initializeNotificationCenter() {

    // TO DO: Initialize notification center
    notificationCenter = new NotificationCenter();
}

function initializeManagers() {

    // TO DO: Initialize managers

    // Initialize camera manager?
    cameraManager = new CameraManager(
        "Camera Manager"
    );

    // Initialize object manager?
    objectManager = new ObjectManager(
        "Object Manager",
        notificationCenter,
        context,
        StatusType.Drawn | StatusType.Updated,
        cameraManager
    );
    // Initialize game manager?
    // Initialize sound manager?
    // soundManager = new SoundManager(
    //     "Sound Manager",
    //     notificationCenter,
    //     GameData.AUDIO_CUE_ARRAY
    // );

    // Initialize keyboard manager?
    keyboardManager = new KeyboardManager(
        "Keyboard Manager"
    );

}

function initializeCameras() {

    let transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        new Vector2(
            canvas.clientWidth / 2,
            canvas.clientHeight / 2
        ),
        new Vector2(
            canvas.clientWidth,
            canvas.clientHeight
        )
    );

    let camera = new Camera2D(
        "Camera 1",
        transform,
        ActorType.Camera,
        StatusType.Updated
    );

    cameraManager.add(camera);
}

function initializeSprites() {

    // TO DO: Initialize sprites

    // Initialize background?
    initializeBackground();
    // Initialize platforms?
    // Initialize players?
    // Initialize enemies?
    // Initialize pickups?
}

function initializeBackground()
{
    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(canvas.clientWidth, canvas.clientHeight)
    );

    artist = new SpriteArtist(
        context,
        1,
        document.getElementById("knightmare_background_1"),
        Vector2.Zero,
        new Vector2(384, 240),
        true
    );

    sprite = new Sprite(
        "Background 1",
        transform,
        ActorType.Background,
        CollisionType.NotCollidable,
        StatusType.Drawn,
        artist,
        0,
        0
    );

    objectManager.add(sprite);

}

function resetGame() {

    clearCanvas();
    startGame();
}

// Start the game once the page has loaded
window.addEventListener("load", start);



