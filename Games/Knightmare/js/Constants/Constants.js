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

    // static PLATFORM_DATA = [

    //     {
    //         id: "Platform 1",
    //         spriteSheet: document.getElementById("green_plains_tileset"),
    //         sourcePosition: new Vector2(16,16),
    //         sourceDimensions: new Vector2(16,16),
    //         translation: new Vector2(0,350),
    //         rotation: 0,
    //         scale: new Vector2(2.5,2.5),
    //         origin: Vector2.Zero,
    //         actorType: ActorType.Platform,
    //         collisionType: CollisionType.Collidable,
    //         layerDepth: 0,
    //         explodeBoundingBoxInPixels: -6
    //     }

    // ];

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

            platformSpriteData: [
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

}