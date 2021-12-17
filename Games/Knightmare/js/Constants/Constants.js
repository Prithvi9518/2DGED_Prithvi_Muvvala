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

    // Player knight data
    static KNIGHT_START_POSITION = new Vector2(100, 252);
    static KNIGHT_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space];
    static KNIGHT_RUN_VELOCITY = 0.3;
    static KNIGHT_JUMP_VELOCITY = 0.8;

    static KNIGHT_TRANSFORM_SCALE = new Vector2(2.5,2.5);
    static KNIGHT_BOUNDING_BOX_DIMENSIONS = new Vector2(21,23);

    static KNIGHT_ANIMATION_DATA = {

        id: "Knight Animation Data",
        spriteSheet: document.getElementById("player_knight_sprite_sheet"),

        // Animations
        takes: {

            // Animation 1
            "Idle": {
    
            frameRatePerSec: 2,
    
            // -1 = Loop forever
            //  0 = Run once (no loop)
            //  N = Loop N times
            maxLoopCount: -1,
    
            startFrameIndex: 0,
            endFrameIndex: 4,
    
            // Notice that I chose the largest of all the widths taken from the frames
            // array below
            boundingBoxDimensions: this.KNIGHT_BOUNDING_BOX_DIMENSIONS,
    
            frames: [
    
                // This list of rects just represent the positions
                // and dimension of each individual animation frame
                // on the sprite sheet
                new Rect(24, 26, 17, 22),    // Idle frame 1
                new Rect(88, 27, 17, 21),    // Idle frame 2
                new Rect(152, 28, 17, 20),    // Idle frame 3
                new Rect(216, 27, 17, 21),    // Idle frame 4
                new Rect(280, 26, 17, 22),    // Idle frame 5

            ]
            },
    
            // Animation 2
            "Run Right": {
    
            frameRatePerSec: 12,
    
            // -1 = Loop forever
            //  0 = Run once (no loop)
            //  N = Loop N times
            maxLoopCount: -1,
    
            startFrameIndex: 0,
            endFrameIndex: 7,
    
            // Notice that I chose the largest of all the widths taken from the frames
            // array below
            boundingBoxDimensions: this.KNIGHT_BOUNDING_BOX_DIMENSIONS,
    
            frames: [
                new Rect(25, 89, 15, 22),     // Animation frame 1
                new Rect(89, 88, 14, 23),    // Animation frame 2
                new Rect(153, 89, 15, 23),   // Animation frame 3
                new Rect(216, 90, 17, 22),   // Animation frame 4
                new Rect(279, 89, 19, 21),   // Animation frame 5
                new Rect(342, 88, 21, 22),   // Animation frame 6
                new Rect(407, 89, 19, 23),   // Animation frame 7
                new Rect(472, 90, 17, 22),   // Animation frame 8
            ]
            },
    
            // // Animation 3
            // "Run Right": {
    
            // frameRatePerSec: 12,
    
            // // -1 = Loop forever
            // //  0 = Run once (no loop)
            // //  N = Loop N times
            // maxLoopCount: -1,
    
            // startFrameIndex: 0,
            // endFrameIndex: 8,
    
            // // Notice that I chose the largest of all the widths taken from the frames
            // // array below
            // boundingBoxDimensions: new Vector2(49, 54),
    
            // frames: [
    
            //     // This list of rects just represent the positions
            //     // and dimension of each individual animation frame
            //     // on the sprite sheet
    
            //     new Rect(414, 385, 47, 54),   // Animation frame 1
            //     new Rect(362, 385, 44, 54),   // Animation frame 2
            //     new Rect(314, 385, 39, 54),   // Animation frame 3
            //     new Rect(265, 385, 46, 54),   // Animation frame 4
            //     new Rect(205, 385, 49, 54),   // Animation frame 5
            //     new Rect(150, 385, 46, 54),   // Animation frame 6
            //     new Rect(96, 385, 46, 54),    // Animation frame 7
            //     new Rect(45, 385, 35, 54),    // Animation frame 8
            //     new Rect(0, 385, 35, 54)      // Animation frame 9
            // ]
            // },
        }



    };

}