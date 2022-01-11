class GameData
{

    static CAMERA_DATA = {
        id: "Camera 1",
        translation: Vector2.Zero,
        rotation: 0,
        scale: Vector2.One,
        actorType: ActorType.Camera,
        statusType: StatusType.Updated
    };

    static AUDIO_CUE_ARRAY = [
        new AudioCue("background", AudioType.Background, 0.4, 1, 0, true),
        new AudioCue("jump", AudioType.Move, 0.4, 1, 0, false),
        new AudioCue("hit", AudioType.All, 1, 1, 0, false),
        new AudioCue("hurt", AudioType.All, 1, 1, 0, false),
        new AudioCue("pickup", AudioType.All, 1, 1, 0, false),
        new AudioCue("fireball_charge", AudioType.All, 0.3, 2, 0, true),
        new AudioCue("explosion", AudioType.Explosion, 1, 1, 0, false),
        new AudioCue("fireball_shoot", AudioType.Explosion, 1, 1, 0, false),
        new AudioCue("game_over", AudioType.WinLose, 0.6, 1, 0, false),
        new AudioCue("win", AudioType.WinLose, 0.5, 0.4, 0, false),
      ];

    // #region Background Data

    static BACKGROUND_1_DIMENSIONS = new Vector2(384, 240);
    static BACKGROUND_2_DIMENSIONS = new Vector2(1000,496);
    static BACKGROUND_3_DIMENSIONS = new Vector2(1920,1080);

    static BACKGROUND_DATA = [

        {
            id: "Background 1",
            spriteSheet: document.getElementById("knightmare_background_1"),
            sourcePosition: Vector2.Zero,
            sourceDimensions: this.BACKGROUND_1_DIMENSIONS,
            translation: Vector2.Zero,
            rotation: 0,
            scale: Vector2.One,
            origin: Vector2.Zero,
            actorType: ActorType.Background,
            collisionType: CollisionType.NotCollidable,
            layerDepth: 0,
            scrollSpeedMultiplier: 0,
            fixedPosition: true
        },

        {
            id: "Background 2",
            spriteSheet: document.getElementById("knightmare_background_2"),
            sourcePosition: Vector2.Zero,
            sourceDimensions: this.BACKGROUND_2_DIMENSIONS,
            translation: Vector2.Zero,
            rotation: 0,
            scale: Vector2.One,
            origin: Vector2.Zero,
            actorType: ActorType.Background,
            collisionType: CollisionType.NotCollidable,
            layerDepth: 0,
            scrollSpeedMultiplier: 0,
            fixedPosition: true
        },

        {
            id: "Background 3",
            spriteSheet: document.getElementById("knightmare_background_3"),
            sourcePosition: Vector2.Zero,
            sourceDimensions: this.BACKGROUND_3_DIMENSIONS,
            translation: Vector2.Zero,
            rotation: 0,
            scale: Vector2.One,
            origin: Vector2.Zero,
            actorType: ActorType.Background,
            collisionType: CollisionType.NotCollidable,
            layerDepth: 0,
            scrollSpeedMultiplier: 0,
            fixedPosition: true
        }


    ];
    // #endregion

    // #region Platform Data
    static PLATFORM_DATA = [

        {
            //Green Plains Tiles
            spriteSheet: document.getElementById("green_plains_tileset"),
            actorType: ActorType.Platform,
            collisionType: CollisionType.Collidable,
            layerDepth: 0,
            explodeBoundingBoxInPixels: -6,
            sourceDimensions: new Vector2(16,16),
            rotation: 0,
            scale: new Vector2(2.5,2.5),
            origin: Vector2.Zero,

            platformSpriteData: [       // Data for different tiles inside the green_plains_tileset spritesheet
                {
                    id: "Grass 1",
                    sourcePosition: new Vector2(16,16),
                    translation: new Vector2(0,350)
                },

                {
                    id: "Grass 2",
                    sourcePosition: new Vector2(48,16),
                    translation: new Vector2(0,350)
                },

                {
                    id: "Grass 3",
                    sourcePosition: new Vector2(80,16),
                    translation: new Vector2(0,350)
                },

                {
                    id: "Soil 1",
                    sourcePosition: new Vector2(16,48),
                    translation: new Vector2(0.3,385)
                },

                {
                    id: "Soil 2",
                    sourcePosition: new Vector2(48,48),
                    translation: new Vector2(1,385)
                },

                {
                    id: "Soil 3",
                    sourcePosition: new Vector2(80,48),
                    translation: new Vector2(1,385)
                },

                {
                    id: "Soil 4",
                    sourcePosition: new Vector2(16,80),
                    translation: new Vector2(0,420)
                },

                {
                    id: "Soil 5",
                    sourcePosition: new Vector2(48,80),
                    translation: new Vector2(0,420)
                },

                {
                    id: "Soil 6",
                    sourcePosition: new Vector2(80,80),
                    translation: new Vector2(0,420)
                },


            ]
        },

        {
            // Dungeon Tiles
            spriteSheet: document.getElementById("dungeon_tileset"),
            actorType: ActorType.Platform,
            collisionType: CollisionType.Collidable,
            layerDepth: 0,
            explodeBoundingBoxInPixels: -6,
            sourceDimensions: new Vector2(16,16),
            rotation: 0,
            scale: new Vector2(2.5,2.5),
            origin: Vector2.Zero,

            platformSpriteData: [       // Data for different tiles inside the dungeon_tileset spritesheet
                {
                    id: "Dungeon 1",
                    sourcePosition: new Vector2(32,0),
                    translation: new Vector2(0,350)
                },

                {
                    id: "Dungeon 2",
                    sourcePosition: new Vector2(48,0),
                    translation: new Vector2(0,350)
                },

                {
                    id: "Dungeon 3",
                    sourcePosition: new Vector2(64,0),
                    translation: new Vector2(0,350)
                }

            ]

        }

    ];
    // #endregion

    // #region Player Data
    static INITIAL_PLAYER_HEALTH = 100;

    // Player knight sprite data
    static KNIGHT_START_POSITION = new Vector2(100, 252);
    static KNIGHT_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space];
    static KNIGHT_RUN_VELOCITY = 0.3;
    static KNIGHT_JUMP_VELOCITY = 0.8;

    static KNIGHT_TRANSFORM_SCALE = new Vector2(2.5,2.5);
    static KNIGHT_BOUNDING_BOX_DIMENSIONS = new Vector2(23,24);

    static KNIGHT_ANIMATION_DATA = {

        id: "Knight Animation Data",
        spriteSheet: document.getElementById("player_knight_sprite_sheet"),

        // Animations
        takes: {

            // Animation 1
            "Idle": {
    
            frameRatePerSec: 1,
    
            // -1 = Loop forever
            //  0 = Run once (no loop)
            //  N = Loop N times
            maxLoopCount: -1,
    
            startFrameIndex: 0,

            endFrameIndex: 1,
    
            // Notice that I chose the largest of all the widths taken from the frames
            // array below
            boundingBoxDimensions: this.KNIGHT_BOUNDING_BOX_DIMENSIONS,
    
            frames: [
    
                // This list of rects just represent the positions
                // and dimension of each individual animation frame
                // on the sprite sheet
                // new Rect(3, 0, 17, 22),    // Idle frame 1
                // new Rect(67, 1, 17, 21),    // Idle frame 2
                // new Rect(131, 2, 17, 20),    // Idle frame 3
                // new Rect(195, 1, 17, 21),    // Idle frame 4
                // new Rect(259, 0, 17, 22),    // Idle frame 5
                new Rect(5, 35, 23, 25),
                new Rect(37, 36, 23, 24)

            ]
            },
    
            // Animation 2
            "Run Right": {
    
            frameRatePerSec: 6,
    
            maxLoopCount: -1,
    
            startFrameIndex: 0,
            endFrameIndex: 3,

            boundingBoxDimensions: this.KNIGHT_BOUNDING_BOX_DIMENSIONS,
    
            frames: [
                new Rect(69, 35, 23, 25),
                new Rect(101, 35, 23, 25),
                new Rect(133, 35, 23, 25),
                new Rect(165, 35, 23, 25)
            ]
            },

            // Animation 3
            "Run Left": {
    
                frameRatePerSec: 6,
        
                maxLoopCount: -1,
        
                startFrameIndex: 0,
                endFrameIndex: 3,

                boundingBoxDimensions: this.KNIGHT_BOUNDING_BOX_DIMENSIONS,
        
                frames: [
                    new Rect(68, 3, 23, 25),
                    new Rect(100, 3, 23, 25),
                    new Rect(132, 3, 23, 25),
                    new Rect(164, 3, 23, 25),
                ]
                }
    
        }

    };

    // #endregion

    // #region Enemy Data
    static ENEMY_DATA = [

        {
            //Orange Slime
            id: "Orange Slime",
            spriteSheet: document.getElementById("enemy_sprite_sheet_1"),
            scale: new Vector2(2,2),

            takes: {

                //Animation 1
                "Move Right": {

                    frameRatePerSec: 3,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 2,

                    boundingBoxDimensions: new Vector2(16,12),

                    frames: [
                        new Rect(49,5,14,11),
                        new Rect(64,6,16,10),
                        new Rect(82,4,12,12)
                    ]

                },

                //Animation 2
                "Move Left": {

                    frameRatePerSec: 6,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 2,

                    boundingBoxDimensions: new Vector2(16,12),

                    frames: [
                        new Rect(82,4,12,12),
                        new Rect(64,6,16,10),
                        new Rect(49,5,14,11)
                    ]

                }

            }

        },

        {
            // Green Slime
            id: "Green Slime",
            spriteSheet: document.getElementById("enemy_sprite_sheet_1"),
            scale: new Vector2(2,2),

            takes: {

                //Animation 1
                "Move Right": {

                    frameRatePerSec: 3,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 2,

                    boundingBoxDimensions: new Vector2(16,12),

                    frames: [
                        new Rect(49,37,14,11),
                        new Rect(64,38,16,10),
                        new Rect(82,36,12,12)
                    ]

                },

                //Animation 2
                "Move Left": {

                    frameRatePerSec: 6,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 2,

                    boundingBoxDimensions: new Vector2(16,12),

                    frames: [
                        new Rect(82,36,12,12),
                        new Rect(64,38,16,10),
                        new Rect(49,37,14,11)
                    ]

                }

            }
        },

        {
            // Red Slime
            id: "Red Slime",
            spriteSheet: document.getElementById("enemy_sprite_sheet_1"),
            scale: new Vector2(2,2),

            takes: {

                //Animation 1
                "Move Right": {

                    frameRatePerSec: 3,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 2,

                    boundingBoxDimensions: new Vector2(16,12),

                    frames: [
                        new Rect(49,21,14,11),
                        new Rect(64,22,16,10),
                        new Rect(82,20,12,12)
                    ]

                },

                //Animation 2
                "Move Left": {

                    frameRatePerSec: 6,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 2,

                    boundingBoxDimensions: new Vector2(16,12),

                    frames: [
                        new Rect(82,20,12,12),
                        new Rect(64,22,16,10),
                        new Rect(49,21,14,11)
                    ]

                }

            }
        },

        {
            // Red Bat
            id: "R_Bat",
            spriteSheet: document.getElementById("enemy_sprite_sheet_2"),
            scale: new Vector2(4,4),

            takes: {

                // Animation 1
                "Move Right": {

                    frameRatePerSec: 4,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 3,

                    boundingBoxDimensions: new Vector2(10,7),

                    frames: [
                        new Rect(0,27,8,6),
                        new Rect(9,26,10,6),
                        new Rect(20,28,8,7),
                        new Rect(29,29,10,6)
                    ]

                },

                // Animation 2
                "Move Left": {
                    
                    frameRatePerSec: 4,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 3,

                    boundingBoxDimensions: new Vector2(10,7),

                    frames: [
                        new Rect(73,27,8,6),
                        new Rect(62,26,10,6),
                        new Rect(53,28,8,7),
                        new Rect(42,29,10,6)
                    ]

                }

            }

        },

        {
            // Dark Bat
            id: "D_Bat",
            spriteSheet: document.getElementById("enemy_sprite_sheet_2"),
            scale: new Vector2(4,4),

            takes: {

                // Animation 1
                "Move Right": {

                    frameRatePerSec: 6,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 3,

                    boundingBoxDimensions: new Vector2(10,7),

                    frames: [
                        new Rect(0,39,8,6),
                        new Rect(9,38,10,6),
                        new Rect(20,40,8,7),
                        new Rect(29,41,10,6)
                    ]

                },

                // Animation 2
                "Move Left": {
                    
                    frameRatePerSec: 6,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 3,

                    boundingBoxDimensions: new Vector2(10,7),

                    frames: [
                        new Rect(73,39,8,6),
                        new Rect(62,38,10,6),
                        new Rect(53,40,8,7),
                        new Rect(42,41,10,6)
                    ]

                }

            }

        },

        {
            // Fiery Skull
            id: "FierySkull",
            spriteSheet: document.getElementById("enemy_sprite_sheet_3"),
            scale: new Vector2(2.5,2.5),

            takes: {

                // Sprite 1
                "Look Right": {

                    frameRatePerSec: 1,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 0,

                    boundingBoxDimensions: new Vector2(15,20),

                    frames: [
                        new Rect(0,3,15,20)
                    ]

                },

                // Sprite 2
                "Look Left": {
                    
                    frameRatePerSec: 1,

                    maxLoopCount: -1,
            
                    startFrameIndex: 0,
                    endFrameIndex: 0,

                    boundingBoxDimensions: new Vector2(15,20),

                    frames: [
                        new Rect(0,35,15,20)
                    ]

                }

            }

        }
        
    ];
    // #endregion

    // #region Fireball data
    static FIREBALL_ANIMATION_DATA = {
        
        id: "Fireball",
        spriteSheet: document.getElementById("fireball_sprite_sheet"),

        takes: {

            // Charging Animation
            "Charging": {

                frameRatePerSec: 6,

                maxLoopCount: -1,

                startFrameIndex: 0,
                endFrameIndex: 2,

                boundingBoxDimensions: new Vector2(28,24),

                frames: [
                    new Rect(333, 3, 18, 18),
                    new Rect(43, 72, 23, 24),
                    new Rect(137, 72, 28, 24)
                ]

            },

            // Fire Right Animation
            "Fire Right": {

                frameRatePerSec: 4,

                maxLoopCount: -1,

                startFrameIndex: 0,
                endFrameIndex: 3,

                boundingBoxDimensions: new Vector2(41,29),

                frames: [
                    new Rect(323,72,32,25),
                    new Rect(33,143,36,27),
                    new Rect(126,142,39,29),
                    new Rect(220,141,41,29)
                ]

            },

            // Fire Left Animation
            "Fire Left": {

                frameRatePerSec: 4,

                maxLoopCount: -1,

                startFrameIndex: 0,
                endFrameIndex: 3,

                boundingBoxDimensions: new Vector2(41,29),

                frames: [
                    new Rect(393,72,32,25),
                    new Rect(679,143,36,27),
                    new Rect(583,142,39,29),
                    new Rect(487,141,41,29)
                ]

            },

        }


    };
    // #endregion

    // Enemy spawn data
    static ENEMY_SPAWN_INTERVALS = [
        2500,       // Level 1
        2000,       // Level 2
        1400        // Level 3
    ];

    static STARTING_SLIME_POS_X = 500;
    static SLIME_POS_Y = 331;
    static SLIME_MOVE_INTERVAL = 650;
    static SLIME_MAX_SPEED = 5;
    static SLIME_VELOCITY_MULTIPLIER = 0.8;
    static SLIME_OFFSET_PLAYER = 30;

    static BAT_POS_Y = 200;
    static BAT_MAX_SPEED = 100;
    static BAT_X_VEL_MIN = 0.2;
    static BAT_X_VEL_MULTIPLIER = 0.03;
    static BAT_Y_VEL_MIN = 0.23;
    static BAT_Y_VEL_MULTIPLIER = 0.03;
    static BAT_MIN_Y = 150;
    static BAT_MAX_Y = 300;
    static BAT_INTERVAL_MULTIPLIER = 1.5;

    static SKULL_POS_Y = 300;
    static SKULL_SHOOT_INTERVAL_MAX = 1500;
    static SKULL_SHOOT_INTERVAL_MULTIPLIER = 200;
    static SKULL_INTERVAL_MULTIPLIER = 3;

    static FIREBALL_CHARGE_DURATION = 2000;
    static FIREBALL_VELOCITY_MULTIPLIER = 0.6;



    // Pickup data
    static HEALTH_POTION_SPRITE_DATA = {
        id: "HealthPotion",
        spriteSheet: document.getElementById("health_potion"),
        sourcePosition: new Vector2(40,20),
        sourceDimensions: new Vector2(90,140),
        rotation: 0,
        scale: new Vector2(0.17,0.17),
        origin: Vector2.Zero,
        actorType: ActorType.Pickup,
        collisionType: CollisionType.Collidable
    };

    static POTION_POS_Y = -20;
    static POTION_MAX_SPEED = 3;
    static PICKUP_SPAWN_INTERVAL_MIN = 10000;
    static PICKUP_SPAWN_INTERVAL_MULTIPLIER = 4000;
    static PICKUP_DESPAWN_TIME = 5000;


    // UI data    
    static PAUSE_BUTTON_DATA = {
        id: "Pause Button",
        spriteSheet: document.getElementById("pause_button"),
        offsetX: 40,
        offsetY: 10,
        scale: new Vector2(3,3),
        dimensions: new Vector2(10,10),
        sourceDimensions: new Vector2(32, 32),
        fixedPosition: true
    };

    static SCORE_TEXT_DATA = {
        offsetX: 195,
        offsetY: 10,
    };

    static LEVEL_TEXT_DATA = {
        offsetX: 65,
        offsetY: 10
    };

    static FULL_HEART_DIMENSIONS = new Vector2(140,131);
    static EMPTY_HEART_DIMENSIONS = new Vector2(140,130);
    static HEART_OFFSET_X = 27;

    static HEART_SPRITE_DATA = [

        {
            id: "FullHeart",
            spritesheet: document.getElementById("hearts"),
            sourcePosition: new Vector2(35,44),
            sourceDimensions: this.FULL_HEART_DIMENSIONS,
            translation: new Vector2(10,10),
            rotation: 0,
            scale: new Vector2(0.17,0.17),
            origin: Vector2.Zero,
            actorType: ActorType.HUD,
            collisionType: CollisionType.NotCollidable,
            layerDepth: 1,
            scrollSpeedMultiplier: 1,
            fixedPosition: true
        },

        {
            id: "EmptyHeart",
            spritesheet: document.getElementById("hearts"),
            sourcePosition: new Vector2(252,175),
            sourceDimensions: this.EMPTY_HEART_DIMENSIONS,
            translation: new Vector2(50,10),
            rotation: 0,
            scale: new Vector2(0.17,0.17),
            origin: Vector2.Zero,
            actorType: ActorType.HUD,
            collisionType: CollisionType.NotCollidable,
            layerDepth: 1,
            scrollSpeedMultiplier: 1,
            fixedPosition: true
        }

    ];

    // Level Data
    static SCORE_THRESHOLDS = [
        0,
        100,         //Level 1 Threshold
        300,        // Level 2 Threshold
        600        // Win
    ]

}

// Fonts
const FontType = {
    InformationSmall: "12px Arial",
    InformationMedium: "18px Arial",
    InformationLarge: "24px Arial",
    PixelatedFont: "12px PixelFont"
  };

