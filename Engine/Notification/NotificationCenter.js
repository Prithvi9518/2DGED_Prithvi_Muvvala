/**
 * Provides a central hub for registering, de-registering and posting 
 * notifications.
 * 
 * This component notifies observers when an interesting event occurs in 
 * our game (we call them notifications to avoid confusion with JavaScript 
 * events).
 *
 * For example, when the player wins the game, then the player controller 
 * should post a notification. Any observers which are registered to that
 * notification would then by notified that some event has occured. This
 * allows the observers to act appropriately - the UIManager may post some
 * text on the screen - the MenuManager may open a new menu - the SoundManager
 * may play a success chime, or a win song, etc.
 * 
 * For example: 
 * 
 * notificationCenter.Notify(
 *      NotificationType.PlayerWin, 
 *      { message: "player wins!", audio: "victory.wav"}
 * );
 *
 * @author NMCG
 * @version 1.0
 * @class NotificationCenter
 */

// Here we try to think of ALL the unique type of events that may want a
// listener to respond by performing an action (e.g. menu, player, sound, 
// pickup)
const NotificationType = {

    Player: "Player",
    Enemy: "Enemy",
    Pickup: "Pickup",
    Sprite: "Sprite",

    GameState: "GameState",
    Menu: "Menu",
    Sound: "Sound"

    // Add more here as necessary
};

// Here we try to think of ALL the unique actions in our game that may 
// want a listener to respond by performing an action (e.g. playing a 
// sound, updating the UI)
const NotificationAction = {

    Fire: "Fire",
    Win: "Win",
    Lose: "Lose",

    Add: "Add",
    Remove: "Remove",
    RemoveFirst: "RemoveFirst",
    RemoveFirstBy: "RemoveFirstBy",
    RemoveAllBy: "RemoveAllBy",
    RemoveAllByType: "RemoveAllByType",

    Pickup: "Pickup",

    Play: "Play",
    Pause: "Pause",
    ShowMenuChanged: "ShowMenuChanged",
    SetVolume: "SetVolume",
    SetVolumeByTheme: "SetVolumeByTheme",
    SetVolumeAll: "SetVolumeAll",
    ResetVolumeAll: "ResetVolumeAll"

    // Add more here as required
};

// Objects can register to particular notifications which they are
// interested about. Any object can register to any notification.

// If a notification is fired, every object which is registered to
// that notification is notified. This, in turn, calls a method in
// the object which performs some action. 

// Additionally, we can provide a list of parameters when creating
// a notification. These parameters are then passed to the handler
// method.

// For example, we can register the sound manager to sound event. 
// As such, if a sound event is fired, the sound manager will react. 
// However, multiple different sound events may be fired. We may 
// have a 'play sound' event, or a 'pause sound event. As such, we
// determine which function to call based on the notification 
// action.

class Notification {

    get notificationType() {
        return this._notificationType;
    }
    get notificationAction() {
        return this._notificationAction;
    }
    get notificationArguments() {
        return this._notificationArguments;
    }

    set notificationType(notificationType) {
        this._notificationType = notificationType;
    }
    set notificationAction(notificationAction) {
        this._notificationAction = notificationAction;
    }
    set notificationArguments(notificationArguments) {
        this._notificationArguments = notificationArguments;
    }

    constructor(notificationType, notificationAction, notificationArguments = []) {
        this.notificationType = notificationType;
        this.notificationAction = notificationAction;
        this.notificationArguments = notificationArguments;
    }

    /**
     * Check if two notifications are strictly equal to each other.
     * 
     * @param {Notification} other 
     * @returns 
     */
    equals(other) {

        return GDUtility.IsSameTypeAsTarget(this, other) && (
            this.notificationType === other.notificationType &&
            this.notificationAction === other.notificationAction &&
            this.notificationArguments === other.notificationArguments
        );
    }
}

class NotificationCenter {

    constructor() {

        // Notification types are mapped to a list of observers. This allows
        // us to notify all observers of a particular notification type.

        // For example, the sound manager may be an observer of the sound
        // notification type. This means that the sound manager should be
        // notified if a sound notification is triggered. Similarly, the 
        // object manager may be an observer of the sprite notification type.
        // This means that the object manager should be notified if a sprite 
        // notification is triggered.
        this.notificationTypeToObserversMap = new Array();
    }

    /**
     * Register an object as an observer of a notification type.
     * 
     * @param {NotificationType} notificationType 
     * @param {object} observer 
     * @param {function} handler
     * @returns 
     */
    register(notificationType, observer, handler) {

        let success = true;

        // If a notification of this type already exists in the map
        if (this.notificationTypeToObserversMap[notificationType]) {

            // If we are not trying to add a duplicate observer
            if (this.indexOf(notificationType, observer) == -1) {

                // Add the observer to our map
                this.notificationTypeToObserversMap[notificationType].push(
                    { observer: observer, handler: handler }
                );
            }

            // Otherwise, we must be trying to add a duplicate observer
            else {

                // So, set success to false, i.e., we did not successfully
                // add the observer to our map
                success = false;
            }
        }

        // Otherwise
        else {

            // Create space in our map for this notification type
            this.notificationTypeToObserversMap[notificationType] = new Array();

            // Add observer to map
            this.notificationTypeToObserversMap[notificationType].push(
                { observer: observer, handler: handler }
            );
        }

        // Return success
        // Success in this case will be true unless we are trying to add a duplicate
        // observer (in which case, it will be set to false).
        return success;
    }

    /**
     * Deregister an object as an observer of a notification type.
     * 
     * @param {NotificationType} notificationType 
     * @param {object} observer 
     * @param {function} handler 
     * @returns 
     */
    deregister(notificationType, observer, handler) {

        // Determine index of observer in map
        let index = this.indexOf(notificationType, observer);

        // If an index is found
        if (index != -1) {

            // Remove the observer from our map
            this.notificationTypeToObserversMap[notificationType].splice(index, 1);

            // Indicate success
            return true;

        }

        // Otherwise, the observer must not exist in our map
        else {

            // Output useful message
            console.log(
                "An observer has already been added for this notification type!"
            );

            // Indicate failure
            return false;
        }
    }

    /**
     * Get the index of an observer in our map.
     * 
     * @param {NotificationType} notificationType 
     * @param {object} observer 
     * @returns 
     */
    indexOf(notificationType, observer) {

        // If the notification type exists in our map
        if (this.notificationTypeToObserversMap[notificationType]) {

            // Get a list of all the observers which match notificationType
            let observers = this.notificationTypeToObserversMap[notificationType];

            // Loop through the list of observers
            // Loop in reverse order (why do you think we do this?)
            for (let i = observers.length - 1; i >= 0; i--) {

                // If a matching observer is found
                if (observers[i].observer === observer) {

                    // Return its index
                    return i;
                }
            }
        }

        // The observer was not found in our map
        return -1;
    }

    /**
     * Notifies all the observers that are registered to the input
     * notification's notificationType. Calls the appropriate handler 
     * method of each observer object.
     * 
     * @param {Notification} notification 
     */
    notify(notification) {

        // If a notification of this type exists in our map
        if (this.notificationTypeToObserversMap[notification.notificationType]) {

            // Store a list of all objects which are observing this notification type
            let observers =
                this.notificationTypeToObserversMap[notification.notificationType];

            // Loop through the list of observers
            for (let i = observers.length - 1; i >= 0; i--) {

                // Call the 'handler' method of the 'observer' object,
                // passing through 'notification' as a parameter.
                Reflect.apply(
                    observers[i].handler,       // Call the handler method
                    observers[i].observer,      // Of the observer object
                    [notification]              // Passing through 'notification' as a paramter
                );

                // this.handleSoundNotification(notification)
            }
        }
    }
}
