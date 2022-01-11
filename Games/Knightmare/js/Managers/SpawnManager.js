
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

        // To start off the game with one enemy present, we initialize a single slime in the constructor
        this.initializeSlime(GameData.STARTING_SLIME_POS_X);
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

        // Notify SkullShootController to stop spawning fireballs- this is to fix an issue where the fireballs
        // keep spawning even after the skull sprite has been removed when a level ends/game ends
        this.notificationCenter.notify(
            new Notification(
                NotificationType.SkullShootController,
                NotificationAction.ToggleFiring,
                [false]
            )
        );

    }

    // Changes the currentLevel and spawnInterval variables depending on the level being played.
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
            new Vector2(posX, GameData.SLIME_POS_Y),
            0,
            GameData.ENEMY_DATA[this.currentLevel-1].scale,
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

        sprite.body.maximumSpeed = GameData.SLIME_MAX_SPEED;
        sprite.body.friction = FrictionType.Normal;
        sprite.body.gravity = GravityType.Normal;

        // Attach controller
        // Increase the movement velocity of the slime based on the current level
        sprite.attachController(
            new SlimeMoveController(
                this.objectManager,                                                  // Object Manager
                new Vector2(GameData.SLIME_VELOCITY_MULTIPLIER*this.currentLevel,0), // Move Velocity
                GameData.SLIME_MOVE_INTERVAL                                         // Move Interval
            )
        );

        this.objectManager.add(sprite);
    }

    spawnSlime(playerPosX)
    {
        if(this.timeSinceLastSlimeSpawnInMs >= this.enemySpawnInterval)
        {
            // Randomly pick a position on the x-axis within the bounds of the canvas
            // This calculation picks any number between 1 and (canvas width - 2)
            let enemyPosX = 1 + (Math.random() * (canvas.clientWidth-2));

            // If the x position is anywhere within 30 units of the player's current position,
            // The function returns and doesn't initialize the slime.
            // This is to make sure that slimes don't spawn right under the player, or right beside them
            if(enemyPosX < playerPosX + GameData.SLIME_OFFSET_PLAYER && enemyPosX > playerPosX-GameData.SLIME_OFFSET_PLAYER) return;
    
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
        // If the level is either one or two, the animation data of the Red Bat sprite is selected (index 3).
        // In case of level 3, the Dark Bat sprite is selected (index 4).
        let animationDataIndex = (this.currentLevel < 3) ? 3 : 4;

        artist = new AnimatedSpriteArtist(
            context,
            1,
            GameData.ENEMY_DATA[animationDataIndex]
        );

        // Set animation
        artist.setTake("Move Right");

        transform = new Transform2D(
            new Vector2(posX, GameData.BAT_POS_Y),
            0,
            GameData.ENEMY_DATA[animationDataIndex].scale,
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

        sprite.body.maximumSpeed = GameData.BAT_MAX_SPEED;
        sprite.body.friction = FrictionType.Normal;
        sprite.body.gravity = GravityType.Normal;

        let xVel;

        if(posX <=0)
            xVel = GameData.BAT_X_VEL_MIN + (GameData.BAT_X_VEL_MULTIPLIER*(this.currentLevel-1));
        else
            xVel = -(GameData.BAT_X_VEL_MIN + (GameData.BAT_X_VEL_MULTIPLIER*(this.currentLevel-1)));

        let yVel = GameData.BAT_Y_VEL_MIN + (GameData.BAT_Y_VEL_MULTIPLIER*(this.currentLevel-1));

        // Attach controller
        sprite.attachController(
            new BatMoveController(
                this.notificationCenter,
                this.objectManager,
                GameData.BAT_MIN_Y,         // Minimum y position (Highest the bat can fly)
                GameData.BAT_MAX_Y,         // Max y position   (Lowest the bat can fly)
                xVel,
                yVel
            )
        );

        this.objectManager.add(sprite);
    } 

    spawnBat()
    {
        if(this.timeSinceLastBatSpawnInMs >= GameData.BAT_INTERVAL_MULTIPLIER * this.enemySpawnInterval)
        {
            // Randomly picks either 0 or 1
            let sideToSpawn = Math.floor(Math.random()*2);

            // If sideToSpawn = 0, bat spawns on left side of screen. If sideToSpawn = 1, bat spawns on right side.
            // If left side, pos x would be -50. If right, pos x would be the canvas width + 50
            let enemyPosX = sideToSpawn*(canvas.clientWidth + 100) - 50;

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
            new Vector2(posX, GameData.SKULL_POS_Y),
            0,
            GameData.ENEMY_DATA[5].scale,
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
                GameData.SKULL_SHOOT_INTERVAL_MAX - (GameData.SKULL_SHOOT_INTERVAL_MULTIPLIER*this.currentLevel)
            )
        );

        this.objectManager.add(sprite);
    }

    spawnFierySkull()
    {
        if((this.timeSinceLastSkullSpawnInMs >= GameData.SKULL_INTERVAL_MULTIPLIER * this.enemySpawnInterval) && this.isSkullDead)
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
            new Vector2(posX, GameData.POTION_POS_Y),
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

        sprite.body.maximumSpeed = GameData.POTION_MAX_SPEED;
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
        // Randomize the pickup spawn interval to be between 10 and 14 seconds.
        let pickupSpawnInterval = (Math.random()*GameData.PICKUP_SPAWN_INTERVAL_MULTIPLIER) + GameData.PICKUP_SPAWN_INTERVAL_MIN;

        // Randomize x position of pickup
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

        // Access player from object manager and return if player doesn't exist or if player's status type is set to Off
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