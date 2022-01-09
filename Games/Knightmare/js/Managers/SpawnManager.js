
/**
 * This class is responsible for spawning all the enemies and pickups within the game.
 *
 * @class SpawnManager
 */
class SpawnManager {

    constructor(id, notificationCenter, objectManager)
    {
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;

        // Internal Variables
        this.isSpawning = true;

        this.timeSinceLastSlimeSpawnInMs = 0;
        this.timeSinceLastBatSpawnInMs = 0;

        this.timeSinceLastHealthPotionSpawnInMs = 0;

        this.numEnemiesSpawned = 0;
        this.numPickupsSpawned = 0;

        this.currentLevel = 1;

        this.enemySpawnInterval = GameData.ENEMY_SPAWN_INTERVALS[0];

        this.registerForNotifications();

        this.initializeSlime(500);
    }

    // We use NotificationType.SpawnParameters to handle notifications related to the SpawnManager class.
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

            case NotificationAction.ToggleSpawning:
                this.toggleSpawning(notification.notificationArguments[0]);

            default:
                break;
        }
    }

    toggleSpawning(spawning)
    {
        this.isSpawning = spawning;
    }

    // Change the currentLevel and spawnInterval variables depending on the level being played.
    // The spawn interval gets shorter as the level increases.
    handleSpawnParametersChange(level)
    {
        this.currentLevel = level;
        this.enemySpawnInterval = GameData.ENEMY_SPAWN_INTERVALS[level-1];
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
            GameData.ENEMY_DATA[this.currentLevel-1].id + " " + this.numEnemiesSpawned,
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
            "R_Bat " + this.numEnemiesSpawned,
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


    // Health Potion
    initializeHealthPotion(posX)
    {
        let transform;
        let artist;
        let sprite;

        transform = new Transform2D(
            new Vector2(posX, -20),
            GameData.HEALTH_POTION_SPRITE_DATA.rotation,
            GameData.HEALTH_POTION_SPRITE_DATA.scale,
            GameData.HEALTH_POTION_SPRITE_DATA.origin,
            GameData.HEALTH_POTION_SPRITE_DATA.sourceDimensions,
            0
        );

        artist = new SpriteArtist(
            context,
            1,
            GameData.HEALTH_POTION_SPRITE_DATA.spriteSheet,
            GameData.HEALTH_POTION_SPRITE_DATA.sourcePosition,
            GameData.HEALTH_POTION_SPRITE_DATA.sourceDimensions
        );

        sprite = new MoveableSprite(
            GameData.HEALTH_POTION_SPRITE_DATA.id + this.numPickupsSpawned,
            transform,
            GameData.HEALTH_POTION_SPRITE_DATA.actorType,
            GameData.HEALTH_POTION_SPRITE_DATA.collisionType,
            StatusType.Drawn | StatusType.Updated,
            artist,
            0,
            1
        );

        sprite.body.maximumSpeed = 3;
        sprite.body.friction = FrictionType.Normal;
        sprite.body.gravity = GravityType.Normal;

        sprite.attachController(
            new HealthPotionDropController(
                this.notificationCenter,
                this.objectManager
            )
        );

        this.objectManager.add(sprite);
    }

    spawnSlime(playerPosX)
    {
        if(this.timeSinceLastSlimeSpawnInMs >= this.enemySpawnInterval)
        {
            let enemyPosX = 1 + (Math.random() * (canvas.clientWidth-2));

            if(enemyPosX < playerPosX + 30 && enemyPosX > playerPosX-30) return;
    
            this.initializeSlime(enemyPosX);
            this.numEnemiesSpawned++;

            this.timeSinceLastSlimeSpawnInMs = 0;
        }
    }

    spawnBat()
    {
        if(this.timeSinceLastBatSpawnInMs >= 1.5 * this.enemySpawnInterval)
        {
            // Randomly picks either 0 or 1
            let sideToSpawn = Math.floor(Math.random()*2);

            // If sideToSpawn = 0, bat spawns on left side of screen. If sideToSpawn = 1, bat spawns on right side.
            let enemyPosX = sideToSpawn*950 - 50;

            this.initializeBat(enemyPosX);
            this.numEnemiesSpawned++;

            this.timeSinceLastBatSpawnInMs = 0;
        }
    }

    spawnHealthPotion()
    {
        let pickupSpawnInterval = (Math.random()*4000) + 10000;
        let pickupPosX = 15 + (Math.random() * (canvas.clientWidth-15));

        if(this.timeSinceLastHealthPotionSpawnInMs >= pickupSpawnInterval)
        {
            this.initializeHealthPotion(pickupPosX);
            this.numPickupsSpawned++;

            this.timeSinceLastHealthPotionSpawnInMs = 0;
        }

    }

    spawnEnemies(playerPosX)
    {
        this.spawnSlime(playerPosX);
        this.spawnBat();
    }

    update(gameTime)
    {
        // Check object manager's status type to prevent enemies/pickups from being initialized before the player starts the game.
        if(objectManager.statusType == 0 || !this.isSpawning) return;

        let player = this.objectManager.get(ActorType.Player)[0];

        if(player.statusType == StatusType.Off || player == null) return;
        
        let playerPosX = player.transform.translation.x;

        this.spawnEnemies(playerPosX);
        this.spawnHealthPotion();

        this.timeSinceLastSlimeSpawnInMs += gameTime.elapsedTimeInMs;
        this.timeSinceLastBatSpawnInMs += gameTime.elapsedTimeInMs;
        this.timeSinceLastHealthPotionSpawnInMs += gameTime.elapsedTimeInMs;
    }


}