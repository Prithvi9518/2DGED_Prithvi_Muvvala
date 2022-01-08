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

            // Add more cases here...

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

        // Add your own code here...

        // Incrementing existing player health by the amount
        this.playerHealth += amount;

        console.log("Health: " + this.playerHealth);

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

        console.log("Player Score: " + this.playerScore);

        // Updating Score Text to display current score
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateScoreText,
                [this.playerScore]
            )
        );

        // Check if player has passed the required score to proceed to the next level, and change the level if necessary
        this.checkAndUpdateLevel();
    }

    checkAndUpdateLevel()
    {
        // Checking if the score has crossed the required amount to proceed to the next level.
        // If the required score has been reached, update the current level variable, and call the updateLevel function
        switch(this.playerScore)
        {
            case 0: 
                this.currentLevel = 1;
                this.updateLevel();
                break;

            case 30:
                this.currentLevel = 2;
                this.updateLevel();
                break;
            
            default:
                break;
        }
    }

    updateLevel()
    {
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

        // Removing all existing enemies from the previous level
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Enemy]
            )
        );

        // Notify spawn manager to update spawn parameters (such as the spawning interval, enemy velocities, enemy sprites)
        this.notificationCenter.notify(
            new Notification(
                NotificationType.SpawnParameters,
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
            if(this.timeSincePlayerDied > this.gameOverDelayInMs)
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

                // Resetting the time since player death and the game time back to 0
                this.timeSincePlayerDied = 0;
                gameTime = new GameTime();
            }
            
        }

        // Play a sound?
        // Pause the game?
        // Play the 'player death' animation?
        // Remove the player sprite from the game?
        // Show the win/lose screen?

        // How could we have these events fire one after each other, rather
        // than all at the same time? Hint: use timers.
    }
}