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
            id: "Platform 1",
            spriteSheet: document.getElementById("green_plains_tileset"),
            sourcePosition: new Vector2(16,16),
            sourceDimensions: new Vector2(16,16),
            translation: new Vector2(0,350),
            rotation: 0,
            scale: new Vector2(2.5,2.5),
            origin: Vector2.Zero,
            actorType: ActorType.Platform,
            collisionType: CollisionType.Collidable,
            layerDepth: 0,
            explodeBoundingBoxInPixels: -6
        }

    ];

}