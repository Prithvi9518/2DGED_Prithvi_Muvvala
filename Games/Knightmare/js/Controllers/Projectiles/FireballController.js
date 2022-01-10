class FireballController {

    constructor(notificationCenter, objectManager, moveVelocity, chargeDuration)
    {
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.chargeDuration = chargeDuration;
        this.moveVelocity = moveVelocity;

        // Internal Variables
        this.timeSinceChargeBeganInMs = 0;
        this.fired = false;

        // Play fireball charging sound
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sound,
                NotificationAction.Play,
                ["fireball_charge"]
            )
        );

    }

    handleOutOfBounds(parent)
    {
        // Remove fireball sprite once it is outside the canvas boundaries
        if(parent.transform.translation.x < -5 || parent.transform.translation.x > canvas.clientWidth + 5)
        {
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sprite,
                    NotificationAction.Remove,
                    [parent]
                )
            );

            // Set fired boolean to false to allow the next fireball to be fired
            this.fired = false;
        }
    }

    setAnimation(parent)
    {
        // Setting the animation take based on the x velocity of the sprite.
        if(this.moveVelocity <= 0)
        {
            // Moving left
            parent.artist.setTake("Fire Left");
        }
        else
        {
            // Moving right
            parent.artist.setTake("Fire Right");
        }
    }

    move(parent)
    {
        if(this.fired)
        {
            // Stop charging sound effect
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Pause,
                    ["fireball_charge"]
                )
            );

            parent.transform.translateBy(new Vector2(this.moveVelocity, 0));
        }
    }

    update(gameTime, parent)
    {
        // After the fireball's charging duration is finished
        if(this.timeSinceChargeBeganInMs >= this.chargeDuration)
        {
            // Setting fired to true allows the fireball to be shot
            // the move() function translates the fireball only when fired = true
            this.fired = true;

            // Play fired sound effect
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["fireball_shoot"]
                )
            );

            this.setAnimation(parent);
            // Reset charging time
            this.timeSinceChargeBeganInMs = 0;
        }
        
        this.move(parent);
        this.handleOutOfBounds(parent);

        if(!this.fired)
        {
            // The next fireball begins charging, when fired is set back to false
            this.timeSinceChargeBeganInMs += gameTime.elapsedTimeInMs;
        }
    }

}