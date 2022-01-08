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

    constructor(id, notificationCenter, objectManager, initialPlayerHealth) {
        
        super(id);

        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;

        this.playerHealth = initialPlayerHealth;
        this.playerScore = 0;
        this.currentLevel = 1;
        
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

            default:
                break;
        }
    }

    handleHealthStateChange(argArray) {

        let amount = argArray[0];

        // Add your own code here...

        // Updating health variable
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

        // Updating score variable
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

        // Check if player has passed the score to proceed to the next level, and change the level if necessary
        this.checkAndUpdateLevel();
    }

    checkAndUpdateLevel()
    {

        // Checking if the score has crossed the required amount to proceed to the next level.
        // If the required score has been reached, update the current level variable, and call the updateLevel function
        switch(this.playerScore)
        {
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
        // Change Background
        let background = this.objectManager.get(ActorType.Background)[0];

        // Notifying the objectManager to change the data of the sprite(such as the id, spriteSheet, source position and dimensions)
        // based on the current level being played.
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

        // Removing all existing enemies
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


    update(gameTime) {

        // Add your code here...
        
        // For example, every update(), we could check the player's health. If
        // the player's health is <= 0, then we can create a notification...

        // Remove player if health hits 0
        if(this.playerHealth <= 0)
        {
            let player = objectManager.get(ActorType.Player)[0];

            if(player==null) return;

            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sprite,    // Type
                    NotificationAction.Remove,  // Action
                    [player]                     // Arguments
                )
            );

            // Show game over menu
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.GameOver,
                    [true]
                )
            );
            
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