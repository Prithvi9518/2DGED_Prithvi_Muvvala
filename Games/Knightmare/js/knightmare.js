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

let debugDrawer;

// TO DO:
// Add more managers as necessary

const debugMode = true;

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

    if (debugMode) {

        // Call the update method of the debug drawer class
        // to update debug info
        debugDrawer.update(gameTime);
    }

}

function draw(gameTime) {

    // Clear previous draw
    clearCanvas();

    // Call the draw method of the object manager class
    // to draw all sprites
    objectManager.draw(gameTime);


    if (debugMode) {

        // Call the draw method of the debug drawer class
        // to display debug info
        debugDrawer.draw(gameTime);
    }

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


    if (debugMode) {

        // Initialize debug drawer
        initializeDebugDrawer();
    }

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
    initializePlayer();
    // Initialize enemies?
    initializeEnemies();
    // Initialize pickups?
}

function initializePlayer()
{
    let transform;
    let artist;
    let sprite;

    artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.KNIGHT_ANIMATION_DATA                          // Animation Data
    );

    // Set animation
    artist.setTake("Idle");

    transform = new Transform2D(
        GameData.KNIGHT_START_POSITION,                         // Translation
        0,                                                      // Rotation
        GameData.KNIGHT_TRANSFORM_SCALE,                        // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Idle"),                // Dimensions
        0                                                       // Explode By
    );

    // The moveable sprite is a sprite which has an attached physics body. The
    // attached physics body allows us to move the sprite in a particular way.
    // For example, we can apply velocity to the physics body, to move it in a
    // particular direction. If we apply a velocity in the -y direction, the 
    // physics body will move upwards. If we apply a velocity in the +x 
    // direction, the physics body will move to the left. The physics body, in
    // turn, moves the sprite. This is done by updating the position of the
    // sprite to match the position of the physics body. Additionally, forces
    // are automatically applied to the physics body every update. This 
    // includes gravity and friction. We can define how much gravity and how
    // much friction is applied to the physics body by setting those values
    // directly (see below an example of how this works). We can also set the
    // max speed of the physics body to define how fast we want to allow it to
    // move.

    sprite = new MoveableSprite(
        "Player",                                               // ID
        transform,                                              // Transform
        ActorType.Player,                                       // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    // Set characteristics of the body attached to the moveable sprite
    // Play around with these values and see what happens.
    sprite.body.maximumSpeed = 6;
    sprite.body.friction = FrictionType.Low;
    sprite.body.gravity = GravityType.Normal;

    sprite.attachController(
        new PlayerMoveController(
            notificationCenter,
            keyboardManager,
            objectManager,
            GameData.KNIGHT_MOVE_KEYS,
            GameData.KNIGHT_RUN_VELOCITY,
            GameData.KNIGHT_JUMP_VELOCITY
        )
    );

    objectManager.add(sprite);

}

function initializeEnemies()
{
    initializeSlime();
}

function initializeSlime()
{
    let transform;
    let artist;
    let sprite;

    artist = new AnimatedSpriteArtist(
        context,
        1,
        GameData.ENEMY_DATA[0]
    );

    // Set animation
    artist.setTake("Move Right");

    transform = new Transform2D(
        new Vector2(500, 331),
        0,
        new Vector2(2,2),
        Vector2.Zero,
        artist.getBoundingBoxByTakeName("Move Right"),
        0
    );

    sprite = new MoveableSprite(
        "OSlime",
        transform,
        ActorType.Enemy,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    sprite.body.maximumSpeed = 6;
    sprite.body.friction = FrictionType.Normal;
    sprite.body.gravity = GravityType.Normal;

    // Attach controller
    sprite.attachController(
        new SlimeMoveController(
            new Vector2(10,0),
            1000,
            1
        )
    );

    objectManager.add(sprite);

}

// #region Background
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
// #endregion

// #region Ground
function initializePlatform()
{
    let transform;
    let artist;
    let sprite;
    let spriteClone = null;

    for(let i=0; i<23; i++) // 23 tiles
    {
        let spriteIndex = 1; // This game requires multiple tiles for the ground and the soil beneath the ground.
                             // spriteIndex is used to select the correct sprite information
                             // from GameData.PLATFORM_DATA.plaformSpriteData

        // spriteIndex is changed depending on whether the tile is the first or last tile in the row.
        if(i==0)
        {
            spriteIndex = 0;
        }
        else if(i==22)
        {
            spriteIndex = 2;
        }

        initializeGround(i, spriteIndex, transform, artist, sprite, spriteClone);
        initializeUnderGround(i, spriteIndex,transform, artist, sprite, spriteClone);
        initializeBedrock(i, spriteIndex,transform, artist, sprite, spriteClone);


    }
}

function initializeGround(loopIndex,spriteIndex,transform, artist, sprite, spriteClone)
{

    // loopIndex is used to translate the sprites by different distances when cloning them
    
    transform = new Transform2D(
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex].translation,
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
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex].sourcePosition,
        GameData.PLATFORM_DATA[0].sourceDimensions
    ); 

    sprite = new Sprite(
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex].id,
        transform,
        GameData.PLATFORM_DATA[0].actorType,
        GameData.PLATFORM_DATA[0].collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        0,
        GameData.PLATFORM_DATA[0].layerDepth
    );


    spriteClone = sprite.clone();
    spriteClone.id = spriteClone.id + " " + loopIndex;

    spriteClone.transform.setTranslation(
        Vector2.Add(
            sprite.transform.translation, new Vector2(
                (GameData.PLATFORM_DATA[0].sourceDimensions.x-1) * GameData.PLATFORM_DATA[0].scale.x * loopIndex,
                0
                )
            )
    );

    objectManager.add(spriteClone);

}

function initializeUnderGround(loopIndex, spriteIndex,transform, artist, sprite, spriteClone)
{

    transform = new Transform2D(
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex+3].translation,
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
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex+3].sourcePosition,
        GameData.PLATFORM_DATA[0].sourceDimensions
    ); 

    sprite = new Sprite(
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex+3].id,
        transform,
        GameData.PLATFORM_DATA[0].actorType,
        GameData.PLATFORM_DATA[0].collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        0,
        GameData.PLATFORM_DATA[0].layerDepth
    );


    spriteClone = sprite.clone();
    spriteClone.id = spriteClone.id + " " + loopIndex;

    spriteClone.transform.setTranslation(
        Vector2.Add(
            sprite.transform.translation, new Vector2(
                (GameData.PLATFORM_DATA[0].sourceDimensions.x-1) * GameData.PLATFORM_DATA[0].scale.x * loopIndex,
                0
                )
            )
    );

    objectManager.add(spriteClone);

}

function initializeBedrock(loopIndex, spriteIndex,transform, artist, sprite, spriteClone)
{

    transform = new Transform2D(
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex+6].translation,
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
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex+6].sourcePosition,
        GameData.PLATFORM_DATA[0].sourceDimensions
    ); 

    sprite = new Sprite(
        GameData.PLATFORM_DATA[0].platformSpriteData[spriteIndex+6].id,
        transform,
        GameData.PLATFORM_DATA[0].actorType,
        GameData.PLATFORM_DATA[0].collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        0,
        GameData.PLATFORM_DATA[0].layerDepth
    );


    spriteClone = sprite.clone();
    spriteClone.id = spriteClone.id + " " + loopIndex;

    spriteClone.transform.setTranslation(
        Vector2.Add(
            sprite.transform.translation, new Vector2(
                (GameData.PLATFORM_DATA[0].sourceDimensions.x-1) * GameData.PLATFORM_DATA[0].scale.x * loopIndex,
                0
                )
            )
    );

    objectManager.add(spriteClone);

}
// #endregion



function initializeDebugDrawer()
{
    debugDrawer = new DebugDrawer(
        "Debug Drawer",
        context,
        objectManager,
        cameraManager
    );
}


function resetGame() {

    clearCanvas();
    startGame();
}

// Start the game once the page has loaded
window.addEventListener("load", start);



