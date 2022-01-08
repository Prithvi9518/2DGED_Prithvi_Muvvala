class SpawnManager {


    constructor(id, notificationCenter, objectManager)
    {
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;

        // Internal Variables
        this.timeSinceLastSlimeSpawnInMs = 0;
        this.timeSinceLastBatSpawnInMs = 0;
        this.numSpawned = 0;
        this.currentLevel = 1;

        this.spawnInterval = GameData.ENEMY_SPAWN_INTERVALS[0];

        this.registerForNotifications();
        this.initializeSlime(500);

    }

    registerForNotifications() {
        this.notificationCenter.register(
            NotificationType.SpawnParameters, 
            this, 
            this.handleSpawnParameterNotification
        );
    }

    handleSpawnParameterNotification(notification)
    {
        switch (notification.notificationAction) {

            case NotificationAction.EditSpawnParameters:
                this.handleSpawnParametersChange(notification.notificationArguments);
                break;

            // Add more cases here...

            default:
                break;
        }
    }

    handleSpawnParametersChange(level)
    {
        this.currentLevel = level;
        this.spawnInterval = GameData.ENEMY_SPAWN_INTERVALS[level-1];
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
            GameData.ENEMY_DATA[this.currentLevel-1]
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
            GameData.ENEMY_DATA[this.currentLevel-1].id + " " + this.numSpawned,
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
                new Vector2(10*this.currentLevel,0),
                500
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
            GameData.ENEMY_DATA[2]
        );

        // Set animation
        artist.setTake("Move Right");

        transform = new Transform2D(
            new Vector2(posX, 200),
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

        let xVel;

        if(posX <=0)
            xVel = 3;
        else
            xVel = -3;

        // Attach controller
        sprite.attachController(
            new BatMoveController(
                this.notificationCenter,
                this.objectManager,
                150,
                300,
                xVel,
                3*(1 + 0.4*(this.currentLevel-1))
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

    spawnBat()
    {
        // Randomly picks either 0 or 1
        let sideToSpawn = Math.floor(Math.random()*2);

        // If sideToSpawn = 0, bat spawns on left side of screen. If sideToSpawn = 1, bat spawns on right side.
        let enemyPosX = sideToSpawn*950 - 50;

        this.initializeBat(enemyPosX);
        this.numSpawned++;

    }

    update(gameTime)
    {
        // Check object manager's status type to prevent enemies from being initialized before the player starts the game.
        if(objectManager.statusType == 0) return;

        let player = this.objectManager.get(ActorType.Player)[0];

        if(player == null) return;
        
        let playerPosX = player.transform.translation.x;

        if(this.timeSinceLastSlimeSpawnInMs >= this.spawnInterval)
        {
            this.spawnSlime(playerPosX);
            this.timeSinceLastSlimeSpawnInMs = 0;
        }
        if(this.timeSinceLastBatSpawnInMs >= 1.5 * this.spawnInterval)
        {
            this.spawnBat(playerPosX);
            this.timeSinceLastBatSpawnInMs = 0;
        }

        this.timeSinceLastSlimeSpawnInMs += gameTime.elapsedTimeInMs;
        this.timeSinceLastBatSpawnInMs += gameTime.elapsedTimeInMs;


    }


}