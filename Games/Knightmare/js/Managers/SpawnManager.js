
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
        this.isSkullDead = true;

        this.timeSinceLastSlimeSpawnInMs = 0;
        this.timeSinceLastBatSpawnInMs = 0;
        this.timeSinceLastSkullSpawnInMs = 0;

        this.timeSinceLastHealthPotionSpawnInMs = 0;

        this.numEnemiesSpawned = 0;
        this.numPickupsSpawned = 0;

        this.currentLevel = 1;

        this.enemySpawnInterval = GameData.ENEMY_SPAWN_INTERVALS[0];

        this.registerForNotifications();

        this.initializeSlime(500);
    }

    // We use NotificationType.SpawnParameters to handle notifications related to the SpawnManager class.
    // The spawn manager recieves notifications to update spawn parameters when there is a change in levels
    // (such as decreasing the spawn interval), start/stop spawning when the game restarts/ends, and notify that
    // a skull-type enemy has died
    registerForNotifications() {
        this.notificationCenter.register(
            NotificationType.SpawnManager, 
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
                break;

            case NotificationAction.SkullDead:
                this.updateSkullDead();
                break;

            default:
                break;
        }
    }

    toggleSpawning(spawning)
    {
        this.isSpawning = spawning;
    }

    // This function, and the isSkullDead variable are used to control the spawning of skull-type enemies.
    // There can only be one skull on the screen at a time, so the next skull is only allowed to spawn when
    // the existing skull has died.
    // When a player kills a skull, the spawn manager recieves a notification from the PlayerMoveController,
    // and then sets isSkullDead to true. This allows the next skull to spawn.
    updateSkullDead()
    {
        this.isSkullDead = true;

        this.notificationCenter.notify(
            new Notification(
                NotificationType.SkullShootController,
                NotificationAction.ToggleFiring,
                [false]
            )
        );

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

    // #endregion

    // #region Bat
    initializeBat(posX)
    {
        let transform;
        let artist;
        let sprite;

        // Setting the index of the bat animation data based on the current level
        let animationDataIndex = (this.currentLevel < 3) ? 3 : 4;

        artist = new AnimatedSpriteArtist(
            context,
            1,
            GameData.ENEMY_DATA[animationDataIndex]
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
            GameData.ENEMY_DATA[animationDataIndex].id + this.numEnemiesSpawned,
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
            xVel = 3 + (0.2*this.currentLevel-1);
        else
            xVel = -(3 + (0.2*this.currentLevel-1));

        // Attach controller
        sprite.attachController(
            new BatMoveController(
                this.notificationCenter,
                this.objectManager,
                150,
                300,
                xVel,
                4 + (0.4*(this.currentLevel-1))
            )
        );

        this.objectManager.add(sprite);
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

    // #endregion

    // #region Fiery Skull
    initializeFierySkull(posX)
    {
        let transform;
        let artist;
        let sprite;

        artist = new AnimatedSpriteArtist(
            context,
            1,
            GameData.ENEMY_DATA[5]
        );

        // Set animation
        if(posX < canvas.clientWidth/2)
        {
            artist.setTake("Look Right");
        }
        else{
            artist.setTake("Look Left");
        }

        transform = new Transform2D(
            new Vector2(posX, 300),
            0,
            new Vector2(2.5,2.5),
            Vector2.Zero,
            artist.getBoundingBoxByTakeName("Look Right"),
            0
        );

        sprite = new Sprite(
            GameData.ENEMY_DATA[5].id + this.numEnemiesSpawned,
            transform,
            ActorType.Enemy,
            CollisionType.Collidable,
            StatusType.Updated | StatusType.Drawn,
            artist,
            1,
            1
        );

        sprite.attachController(
            new SkullShootController(
                this.notificationCenter,
                this.objectManager,
                1500 - (200*this.currentLevel)
            )
        );

        this.objectManager.add(sprite);
    }

    spawnFierySkull()
    {
        if((this.timeSinceLastSkullSpawnInMs >= 3 * this.enemySpawnInterval) && this.isSkullDead)
        {
            // Randomly picks either 0 or 1
            let sideToSpawn = Math.floor(Math.random()*2);

            // If sideToSpawn = 0, bat spawns on left side of screen. If sideToSpawn = 1, bat spawns on right side.
            let enemyPosX = sideToSpawn*(canvas.clientWidth-45) + 3;

            this.initializeFierySkull(enemyPosX);
            this.numEnemiesSpawned++;

            this.isSkullDead = false;

            this.notificationCenter.notify(
                new Notification(
                    NotificationType.SkullShootController,
                    NotificationAction.ToggleFiring,
                    [true]
                )
            );

            this.timeSinceLastSkullSpawnInMs = 0;
        }
    }

    // #endregion

    //#region Health Potion
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

    spawnHealthPotion()
    {
        let pickupSpawnInterval = (Math.random()*4000) + 10000;
        let pickupPosX = 15 + (Math.random() * (canvas.clientWidth-25));

        if(this.timeSinceLastHealthPotionSpawnInMs >= pickupSpawnInterval)
        {
            this.initializeHealthPotion(pickupPosX);
            this.numPickupsSpawned++;

            this.timeSinceLastHealthPotionSpawnInMs = 0;
        }

    }

    // #endregion

    spawnEnemies(playerPosX)
    {
        this.spawnSlime(playerPosX);
        this.spawnBat();

        if(this.currentLevel > 1)
        {
            this.spawnFierySkull();
        }
    }

    update(gameTime)
    {
        // Check object manager's status type, and the isSpawning variable to prevent enemies/pickups
        // from being initialized before the player starts the game/when the game is over/when the level ends
        if(objectManager.statusType == 0 || !this.isSpawning)
        {
            // Reset all time-related variables
            this.timeSinceLastSlimeSpawnInMs = 0;
            this.timeSinceLastBatSpawnInMs = 0;
            this.timeSinceLastSkullSpawnInMs = 0;
            this.timeSinceLastHealthPotionSpawnInMs = 0;

            // Set isSkullDead = true, as this enables spawning of the skulls when the game restarts/the next level begins
            this.isSkullDead = true;

            // Disable firing of fireballs, to fix an issue where fireballs spawn even after a level ends/game over
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.SkullShootController,
                    NotificationAction.ToggleFiring,
                    [false]
                )
            );

            return;
        }

        let player = this.objectManager.get(ActorType.Player)[0];
        if(player.statusType == StatusType.Off || player == null) return;

        // Update player position
        let playerPosX = player.transform.translation.x;

        this.spawnEnemies(playerPosX);
        this.spawnHealthPotion();

        // Update time-related variables
        this.timeSinceLastSlimeSpawnInMs += gameTime.elapsedTimeInMs;
        this.timeSinceLastBatSpawnInMs += gameTime.elapsedTimeInMs;
        if(this.isSkullDead)
        {
            this.timeSinceLastSkullSpawnInMs += gameTime.elapsedTimeInMs;
        }

        this.timeSinceLastHealthPotionSpawnInMs += gameTime.elapsedTimeInMs;
    }


}