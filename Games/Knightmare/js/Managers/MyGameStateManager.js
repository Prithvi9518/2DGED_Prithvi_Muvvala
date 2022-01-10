/**
 * Stores, updates, and changes game state in my specific game- Knightmare.
 * @author
 * @version 1.0
 * @class MyGameStateManager
 */
class MyGameStateManager extends GameStateManager {

    get playerHealth() {
        return this._playerHealth;
    }

    get playerScore() {
        return this._playerScore;
    }

    get currentLevel() {
        return this._previousLevel;
    }

    set playerScore(value) {
        this._playerScore = value;
    }

    set playerHealth(value) {
        this._playerHealth = value;
    }

    set currentLevel(value) {
        this._previousLevel = value;
    }

    constructor(id, notificationCenter, objectManager) {
        
        super(id);

        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;

        // Internal Variables
        this.playerHealth = GameData.INITIAL_PLAYER_HEALTH;

        this.playerScore = 0;

        this.currentLevel = 1;

        // Used to create a delay when progressing to the next level
        this.nextLevelDelayInMs = 5000;
        this.timeSinceLevelEnded = 0;
        this.levelFinished = false;

        // gameOverDelay and timeSincePlayerDied are used to display the game over menu after a short delay when the player dies.
        this.gameOverDelayInMs = 2000;
        this.timeSincePlayerDied = 0;
        
        this.registerForNotifications();
    }

    registerForNotifications() {
        this.notificationCenter.register(
            NotificationType.GameState, 
            this, 
            this.handleGameStateNotification
        );
    }

    handleGameStateNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.Health:
                this.handleHealthStateChange(notification.notificationArguments);
                break;

            case NotificationAction.Score: 
                this.handleScoreChange(notification.notificationArguments);
                break;

            case NotificationAction.Restart:
                this.handleGameRestart();
                break;

            default:
                break;
        }
    }

    handleHealthStateChange(argArray) {

        let amount = argArray[0];

        // Incrementing existing player health by the amount
        this.playerHealth += amount;

        // Checking if the updated player health is greater than the maximum, or below 0
        // If the health goes above the maximum amount, set it back to the maximum
        // If the health goes below 0, set it back to 0
        if(this.playerHealth > GameData.INITIAL_PLAYER_HEALTH)
        {
            this.playerHealth = GameData.INITIAL_PLAYER_HEALTH;
        }
        else if(this.playerHealth < 0)
        {
            this.playerHealth = 0;
        }

        // Updating Health Bar/Lives Display
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateHealthBar,
                [this.playerHealth]
            )
        );

    }

    handleScoreChange(argArray) {
        let amount = argArray[0];

        // Incrementing existing score by the amount
        this.playerScore += amount;

        // Updating Score Text to display current score
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateScoreText,
                [this.playerScore]
            )
        );

        // Update Score to Next Level text
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateScoreToNextLevelText,
                [this.playerScore, GameData.SCORE_THRESHOLDS[this.currentLevel]]
            )
        );

    }

    // Called when the player reaches the required score to move on to the next level and levelFinished variable is true
    endLevel()
    {
        // Removing all existing enemies,projectiles and pickups from the previous level
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Enemy]
            )
        );
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Projectiles]
            )
        );
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Pickup]
            )
        );

        // Turn off spawning
        this.notificationCenter.notify(
            new Notification(
                NotificationType.SpawnManager,
                NotificationAction.ToggleSpawning,
                [false]
            )
        );

        // Calculate number of seconds till the next level begins
        let countDownTime = Math.ceil((this.nextLevelDelayInMs - this.timeSinceLevelEnded)/1000);

        // Show Level Finished Text
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateLevelFinishedText,
                [
                    StatusType.Updated | StatusType.Drawn,
                    this.currentLevel,
                    countDownTime
                ]
            )
        );
        
        // If the short delay between levels has ended, check and update the level
        if(this.timeSinceLevelEnded >= this.nextLevelDelayInMs)
        {
            this.checkAndUpdateLevel();
            this.timeSinceLevelEnded = 0;
            this.levelFinished = false;
        }

    }

    checkAndUpdateLevel()
    {
        // Sets currentLevel variable based on the current score, and calls the updateLevel function to start a new level
        switch(this.playerScore)
        {
            // The case for 0 score is used in case of a Game Over. The score gets reset back to 0,
            // hence the currentLevel variable is set back to 1
            case GameData.SCORE_THRESHOLDS[0]: 
                this.currentLevel = 1;
                this.updateLevel();
                break;

            case GameData.SCORE_THRESHOLDS[1]:
                this.currentLevel = 2;
                this.updateLevel();
                break;

            case GameData.SCORE_THRESHOLDS[2]:
                this.currentLevel = 3;
                this.updateLevel();
                break;
            
            default:
                break;
        }
    }

    // Starts a new level
    updateLevel()
    {
        // Hide Level Finished Text
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateLevelFinishedText,
                [
                    StatusType.Off,
                    this.currentLevel
                ]
            )
        );

        // Update Score to Next Level text
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateScoreToNextLevelText,
                [this.playerScore, GameData.SCORE_THRESHOLDS[this.currentLevel]]
            )
        );

        // Get the background sprite from the object manager, and change it to a new background
        let background = this.objectManager.get(ActorType.Background)[0];

        // Notifying the objectManager to change the data of the sprite(such as the id, spriteSheet, source position and dimensions)
        // based on the current level being played.
        // Depending on the currentLevel variable, a different background would be displayed.
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.ChangeSprite,
                [
                    background,
                    GameData.BACKGROUND_DATA[this.currentLevel-1].id,
                    GameData.BACKGROUND_DATA[this.currentLevel-1].spriteSheet,
                    GameData.BACKGROUND_DATA[this.currentLevel-1].sourcePosition,
                    GameData.BACKGROUND_DATA[this.currentLevel-1].sourceDimensions,
                ]
            )
        );

        // Resetting player position
        let player = this.objectManager.get(ActorType.Player)[0];
        player.transform.reset();

        // Turn spawning back on
        this.notificationCenter.notify(
            new Notification(
                NotificationType.SpawnManager,
                NotificationAction.ToggleSpawning,
                [true]
            )
        );

        // Notify spawn manager to update spawn parameters (such as the spawning interval, enemy velocities, enemy sprites)
        this.notificationCenter.notify(
            new Notification(
                NotificationType.SpawnManager,
                NotificationAction.EditSpawnParameters,
                [this.currentLevel]
            )
        );

        // Update level text to display the current level
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateLevelText,
                [this.currentLevel]
            )
        );

    }

    handleGameRestart()
    {        
        // Hide game over menu
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Menu,
                NotificationAction.GameOverMenu,
                [false]
            )
        );

        // Removing all existing enemies, projectiles and pickups from the previous level
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Enemy]
            )
        );
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Projectile]
            )
        );
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Pickup]
            )
        );
        

        // Reset player status type to Drawn | Updated
        // (When a player's health hits 0, we set the player's status type to Off, and move the transform outside the canvas,
        //  so we have to set it back to Drawn | Updated when the game restarts).
        let player = this.objectManager.get(ActorType.Player)[0];
        player.statusType = StatusType.Drawn | StatusType.Updated;

        // Reset player health
        // Adding (INITIAL_PLAYER_HEALTH - this.playerHealth) to the existing player health always ensures that the player starts
        // with the full health.
        this.handleHealthStateChange([GameData.INITIAL_PLAYER_HEALTH-this.playerHealth]);

        // Reset score to 0 by subtracting the current player score from itself
        this.handleScoreChange([-this.playerScore]);

        // Start playing background music
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sound,
                NotificationAction.Play,
                ["background"]
            )
        );

        // Update Level
        this.checkAndUpdateLevel();

    }

    checkLevelFinished()
    {
        let finishedLv1 = this.playerScore == GameData.SCORE_THRESHOLDS[1] && this.currentLevel == 1;
        let finishedLv2 = this.playerScore == GameData.SCORE_THRESHOLDS[2] && this.currentLevel == 2;
        
        if((finishedLv1 || finishedLv2) && this.levelFinished == false)
        {
            this.levelFinished = true;
        }
    }


    update(gameTime) {

        // Add your code here...
        
        // For example, every update(), we could check the player's health. If
        // the player's health is <= 0, then we can create a notification...

        // If health hits 0, hide player by setting statusType to Off and translating the sprite outside of the canvas
        if(this.playerHealth <= 0)
        {
            let player = objectManager.get(ActorType.Player)[0];

            player.statusType = StatusType.Off;
            player.transform.translation = new Vector2(-60,-60);
            
            // Start counting the time since player death
            this.timeSincePlayerDied += gameTime.elapsedTimeInMs;

            // Display the game over menu after the short delay
            if(this.timeSincePlayerDied >= this.gameOverDelayInMs)
            {
                // We use NotificationAction.GameOverMenu and pass in a boolean as the argument.
                // If true, display the menu. If false, hide the menu.
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Menu,
                        NotificationAction.GameOverMenu,
                        [true]
                    )
                );

                // Resetting the time since player death back to 0
                this.timeSincePlayerDied = 0;
            }
        }

        // Creating a delay between levels

        this.checkLevelFinished();

        if(this.levelFinished)
        {
            this.timeSinceLevelEnded += gameTime.elapsedTimeInMs;
            this.endLevel();
        }
    }
}