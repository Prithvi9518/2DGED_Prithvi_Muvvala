class MyUIManager extends UIManager {

    constructor(id, notificationCenter, objectManager, mouseManager) {

        super(id);

        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.mouseManager = mouseManager;

        this.registerForNotifications();
    }

    registerForNotifications() {

        // When a 'ui' event fires, call the 'handleUINotification' function 
        // of 'this' object
        this.notificationCenter.register(
            NotificationType.UI,
            this,
            this.handleUINotification
        );
    }

    handleUINotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.UpdateHealthBar:

                this.updateHealthBar(notification.notificationArguments[0]);
                break;

            case NotificationAction.UpdateScoreText:
                this.updateScoreText(notification.notificationArguments[0]);
                break;

            default:
                break;
        }
    }

    updateHealthBar(health) {

        // TO DO: Your code here...
        let numFullHearts = Math.floor(health/20);
        let heartsToRemove = 5-numFullHearts;
    
        let uiSprites = this.objectManager.get(ActorType.HUD);

        let heartSprites = uiSprites.filter(function (el) {
            return el.id.includes("Heart");
        });

        for(let i = 0; i < heartsToRemove; i++)
        {
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sprite,
                    NotificationAction.ChangeSprite,
                    [heartSprites[heartSprites.length-i-1], GameData.HEART_SPRITE_DATA[1].sourcePosition]
                )
            );
        }

    }

    updateScoreText(score) {

        let uiSprites = this.objectManager.get(ActorType.HUD);
        let scoreText = uiSprites.filter(function (el) {
            return el.id == "ScoreText";
        });

        scoreText[0].artist.text = "Score: " + score;

    }

    /**
     * 
     * @param {GameTime} gameTime 
     */
    update(gameTime) {

        // The below code checks to see if the mouse has been clicked.
        // It then extracts all of the HUD sprites from the object manager.
        // Next, it loops through the list of HUD sprites, and checks to see 
        // if the mouse click took place on top of any HUD sprite. If so,
        // some action is performed.

        // For example, this will allow us to check if the user has clicked on 
        // the pause button.

        // If the mouse has been clicked (i.e., if the click position 
        // is not null)
        if (this.mouseManager.clickPosition) {

            // Get a list of all the HUD sprites that are stored
            // within the object manager
            const hudSprites = objectManager.get(ActorType.HUD);

            // Loop through the list of HUD sprites
            for (let i = 0; i < hudSprites.length; i++) {

                // Store a reference to the current HUD sprite
                const hudSprite = hudSprites[i];

                // Create a new Rect object, with a width of 1 and height of 1
                // to represent the pixel at which the mouse was clicked
                const mouseClickPosition = new Rect(
                    this.mouseManager.clickPosition.x,
                    this.mouseManager.clickPosition.y,
                    1,                                      // Width
                    1                                       // Height
                );

                // Use the rect object to check if the mouse click took place
                // inside of the hudSprite
                if (hudSprite.transform.boundingBox.contains(mouseClickPosition)) {

                    // TO DO: Your code here...

                    // If the user clicks the pause button...
                    // If the user clicks the menu button...
                    // If the user clicks the flip gravity button...

                    if (hudSprite.id === "Pause Button") {

                        console.log("You clicked the pause button!");
                    }

                    if (hudSprite.id === "Exit Button") {
                        
                    }
                }
            }
        }
    }
}