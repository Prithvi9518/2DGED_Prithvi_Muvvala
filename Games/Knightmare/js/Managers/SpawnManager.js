class SpawnManager {


    constructor(id, objectManager, spawnInterval)
    {
        this.id = id;
        this.objectManager = objectManager;
        this.spawnInterval = spawnInterval;

        // Internal Variables
        this.timeSinceLastSpawnInMs = 0;
        this.numSpawned = 0;

        this.initializeSlime(600);

    }

    initializeSlime(posX)
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
            new Vector2(posX, 331),
            0,
            new Vector2(2,2),
            Vector2.Zero,
            artist.getBoundingBoxByTakeName("Move Right"),
            0
        );

        sprite = new MoveableSprite(
            "OSlime " + this.numSpawned,
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
                this.objectManager,
                new Vector2(10,0),
                500,
                1
            )
        );

        this.objectManager.add(sprite);
    }

    update(gameTime)
    {
        let player = this.objectManager.get(ActorType.Player)[0];

        if(player == null) return;

        if(this.timeSinceLastSpawnInMs >= this.spawnInterval)
        {
            let enemyPosX = 1 + (Math.random() * (canvas.clientWidth-2));

            if(enemyPosX < player.transform.translation.x + 30 && enemyPosX > player.transform.translation-30) return;

            this.initializeSlime(enemyPosX);

            this.timeSinceLastSpawnInMs = 0;
        }

        this.timeSinceLastSpawnInMs += gameTime.elapsedTimeInMs;

    }


}