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

    set playerHealth(value) {
        this._playerHealth = value;
    }

    constructor(id, notificationCenter, initialPlayerHealth) {
        
        super(id);

        this.notificationCenter = notificationCenter;

        this.playerHealth = initialPlayerHealth;
        
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

            case NotificationAction.Inventory:
                this.handleInventoryStateChange(notification.notificationArguments);
                break;

            case NotificationAction.Ammo:
                this.handleAmmoStateChange(notification.notificationArguments);
                break;

            // Add more cases here...

            default:
                break;
        }
    }

    handleHealthStateChange(argArray) {

        let amount = argArray[0];

        // Add your own code here...

        this.playerHealth += amount;

        console.log(this.playerHealth);

        // Maybe update a health variable?
        // Maybe update a UI element?
    }

    handleInventoryStateChange(argArray) {
        console.log(argArray);

        // Add your code here...
        // Maybe update an inventory array?
        // Maybe update a UI element
    }

    handleAmmoStateChange(argArray) {
        console.log(argArray);

        // Add your code here...
        // Maybe update an ammo variable?
        // Maybe update a UI element?
    }

    update(gameTime) {

        // Add your code here...
        
        // For example, every update(), we could check the player's health. If
        // the player's health is <= 0, then we can create a notification...

        // Remove player
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