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
    initializePlatform();
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
        GameData.BACKGROUND_DATA[0].translation,
        GameData.BACKGROUND_DATA[0].rotation,
        GameData.BACKGROUND_DATA[0].scale,
        GameData.BACKGROUND_DATA[0].origin,
        new Vector2(canvas.clientWidth, canvas.clientHeight)
    );

    artist = new SpriteArtist(
        context,
        1,
        GameData.BACKGROUND_DATA[0].spriteSheet,
        GameData.BACKGROUND_DATA[0].sourcePosition,
        GameData.BACKGROUND_DATA[0].sourceDimensions,
        GameData.BACKGROUND_DATA[0].fixedPosition
    );

    sprite = new Sprite(
        GameData.BACKGROUND_DATA[0].id,
        transform,
        GameData.BACKGROUND_DATA[0].actorType,
        GameData.BACKGROUND_DATA[0].collisionType,
        StatusType.Drawn,
        artist,
        GameData.BACKGROUND_DATA[0].scrollSpeedMultiplier,
        GameData.BACKGROUND_DATA[0].layerDepth
    );

    objectManager.add(sprite);

}

function initializePlatform()
{
    let transform;
    let artist;
    let sprite;
    let spriteClone;

    transform = new Transform2D(
        GameData.PLATFORM_DATA[0].translation,
        GameData.PLATFORM_DATA[0].rotation,
        GameData.PLATFORM_DATA[0].scale,
        GameData.PLATFORM_DATA[0].origin,
        GameData.PLATFORM_DATA[0].sourceDimensions,
        GameData.PLATFORM_DATA[0].explodeBoundingBoxInPixels
    );

    artist = new SpriteArtist(
        context,
        1,
        GameData.PLATFORM_DATA[0].spriteSheet,
        GameData.PLATFORM_DATA[0].sourcePosition,
        GameData.PLATFORM_DATA[0].sourceDimensions
    );

    sprite = new Sprite(
        GameData.PLATFORM_DATA[0].id,
        transform,
        GameData.PLATFORM_DATA[0].actorType,
        GameData.PLATFORM_DATA[0].collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        0,
        GameData.PLATFORM_DATA[0].layerDepth
    );

    for (let i = 0; i < 5; i++) {

        // Clone sprite
        spriteClone = sprite.clone();

        // Update id
        spriteClone.id = spriteClone.id + " " + i;

        // Update translation
        spriteClone.transform.setTranslation(
            Vector2.Add(
                sprite.transform.translation, new Vector2(
                    (GameData.PLATFORM_DATA[0].sourceDimensions.x-1) * GameData.PLATFORM_DATA[0].scale.x * i,
                    0
                    )
                )
            );

        // Add to object manager
        objectManager.add(spriteClone);
    }

}

function resetGame() {

    clearCanvas();
    startGame();
}

// Start the game once the page has loaded
window.addEventListener("load", start);



