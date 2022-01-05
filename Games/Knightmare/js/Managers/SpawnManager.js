class SpawnManager {


    constructor(id, objectManager, spawnInterval)
    {
        this.id = id;
        this.objectManager = objectManager;
        this.spawnInterval = spawnInterval;

        // Internal Variables
        this.timeSinceLastSpawnInMs = 0;
        this.numSpawned = 0;

        this.initializeBat(100);

    }

    // #region Slime
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
    // #endregion

    // #region Bat
    initializeBat(posX)
    {
        let transform;
        let artist;
        let sprite;

        artist = new AnimatedSpriteArtist(
            context,
            1,
            GameData.ENEMY_DATA[1]
        );

        // Set animation
        artist.setTake("Move Right");

        let startPos = new Vector2(posX, 200);

        transform = new Transform2D(
            startPos,
            0,
            new Vector2(4,4),
            Vector2.Zero,
            artist.getBoundingBoxByTakeName("Move Right"),
            0
        );

        sprite = new MoveableSprite(
            "R_Bat " + this.numSpawned,
            transform,
            ActorType.Enemy,
            CollisionType.Collidable,
            StatusType.Updated | StatusType.Drawn,
            artist,
            1,
            1
        );

        sprite.body.maximumSpeed = 100;
        sprite.body.friction = FrictionType.Normal;
        sprite.body.gravity = GravityType.Normal;

        // Attach controller
        sprite.attachController(
            new BatMoveController(
                this.objectManager,
                150,
                300,
                3,
                3
            )
        );

        this.objectManager.add(sprite);
    } 
    // #endregion

    spawnSlime(playerPosX)
    {
        let enemyPosX = 1 + (Math.random() * (canvas.clientWidth-2));

        if(enemyPosX < playerPosX + 30 && enemyPosX > playerPosX-30) return;

        this.initializeSlime(enemyPosX);
        this.numSpawned++;
    }

    update(gameTime)
    {
        // Check object manager's status type to prevent enemies from being initialized before the player starts the game.
        if(objectManager.statusType == 0) return;

        let player = this.objectManager.get(ActorType.Player)[0];

        if(player == null) return;

        if(this.timeSinceLastSpawnInMs >= this.spawnInterval)
        {
            let playerPosX = player.transform.translation.x;
            
            this.spawnSlime(playerPosX);
            this.timeSinceLastSpawnInMs = 0;
        }

        this.timeSinceLastSpawnInMs += gameTime.elapsedTimeInMs;

    }


}