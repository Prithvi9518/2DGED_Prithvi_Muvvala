class GameData
{
    static BACKGROUND_DIMENSIONS = new Vector2(384, 240);

    static BACKGROUND_DATA = [

        {
            id: "Background 1",
            spriteSheet: document.getElementById("knightmare_background_1"),
            sourcePosition: Vector2.Zero,
            sourceDimensions: this.BACKGROUND_DIMENSIONS,
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
        }

    ];

    // Player Data
    static INITIAL_PLAYER_HEALTH = 50;

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
    
            // frameRatePerSec: 2,
            frameRatePerSec: 1,
    
            // -1 = Loop forever
            //  0 = Run once (no loop)
            //  N = Loop N times
            maxLoopCount: -1,
    
            startFrameIndex: 0,
            // endFrameIndex: 4,
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
    
            // frameRatePerSec: 12,
            frameRatePerSec: 6,
    
            // -1 = Loop forever
            //  0 = Run once (no loop)
            //  N = Loop N times
            maxLoopCount: -1,
    
            startFrameIndex: 0,
            // endFrameIndex: 7,
            endFrameIndex: 3,
    
            // Notice that I chose the largest of all the widths taken from the frames
            // array below
            boundingBoxDimensions: this.KNIGHT_BOUNDING_BOX_DIMENSIONS,
    
            frames: [
                // new Rect(4, 63, 15, 22),     // Animation frame 1
                // new Rect(68, 62, 14, 23),    // Animation frame 2
                // new Rect(132, 63, 15, 23),   // Animation frame 3
                // new Rect(195, 64, 17, 22),   // Animation frame 4
                // new Rect(258, 63, 19, 21),   // Animation frame 5
                // new Rect(321, 62, 21, 22),   // Animation frame 6
                // new Rect(386, 63, 19, 23),   // Animation frame 7
                // new Rect(451, 64, 17, 22),   // Animation frame 8

                new Rect(69, 35, 23, 25),
                new Rect(101, 35, 23, 25),
                new Rect(133, 35, 23, 25),
                new Rect(165, 35, 23, 25)

            ]
            },

            // Animation 3
            "Run Left": {
    
                // frameRatePerSec: 12,
                frameRatePerSec: 6,
        
                // -1 = Loop forever
                //  0 = Run once (no loop)
                //  N = Loop N times
                maxLoopCount: -1,
        
                startFrameIndex: 0,
                // endFrameIndex: 7,
                endFrameIndex: 3,
        
                // Notice that I chose the largest of all the widths taken from the frames
                // array below
                boundingBoxDimensions: this.KNIGHT_BOUNDING_BOX_DIMENSIONS,
        
                frames: [
                    // new Rect(965, 63, 15, 22),     // Animation frame 1
                    // new Rect(902, 62, 14, 23),    // Animation frame 2
                    // new Rect(837, 63, 15, 23),   // Animation frame 3
                    // new Rect(772, 64, 17, 22),   // Animation frame 4
                    // new Rect(707, 63, 19, 21),   // Animation frame 5
                    // new Rect(642, 62, 21, 22),   // Animation frame 6
                    // new Rect(579, 63, 19, 23),   // Animation frame 7
                    // new Rect(516, 64, 17, 22),   // Animation frame 8

                    new Rect(68, 3, 23, 25),
                    new Rect(100, 3, 23, 25),
                    new Rect(132, 3, 23, 25),
                    new Rect(164, 3, 23, 25),

                ]
                }
    
        }



    };

    static ENEMY_DATA = [

        {
            //Orange Slime
            id: "Orange Slime",
            spriteSheet: document.getElementById("enemy_sprite_sheet_1"),

            takes: {

                //Animation 1
                "Move Right": {

                    frameRatePerSec: 3,

                    // -1 = Loop forever
                    //  0 = Run once (no loop)
                    //  N = Loop N times
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

                    // -1 = Loop forever
                    //  0 = Run once (no loop)
                    //  N = Loop N times
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
            // Red Bat
            id: "R_Bat",
            spriteSheet: document.getElementById("enemy_sprite_sheet_2"),

            takes: {

                // Animation 1
                "Move Right": {

                    frameRatePerSec: 3,

                    // -1 = Loop forever
                    //  0 = Run once (no loop)
                    //  N = Loop N times
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

                    // -1 = Loop forever
                    //  0 = Run once (no loop)
                    //  N = Loop N times
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

        }
        
    ];

    // Enemy spawn data
    static ENEMY_SPAWN_INTERVAL = 3500;

}