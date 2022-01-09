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
    }

    handleOutOfBounds(parent)
    {
        if(parent.transform.translation.x < -5 || parent.transform.translation.x > canvas.clientWidth + 5)
        {
            console.log("Fireball removed");
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sprite,
                    NotificationAction.Remove,
                    [parent]
                )
            );

            this.fired = false;
        }
    }

    setAnimation(parent)
    {
        if(this.moveVelocity <= 0)
        {
            parent.artist.setTake("Fire Left");
        }
        else
        {
            parent.artist.setTake("Fire Right");
        }
    }

    move(parent)
    {
        if(this.fired)
        {
            parent.transform.translateBy(new Vector2(this.moveVelocity, 0));
        }
    }

    update(gameTime, parent)
    {
        if(this.timeSinceChargeBeganInMs >= this.chargeDuration)
        {
            this.fired = true;
            this.setAnimation(parent);
            this.timeSinceChargeBeganInMs = 0;
        }
        
        this.move(parent);
        this.handleOutOfBounds(parent);

        if(!this.fired)
        {
            this.timeSinceChargeBeganInMs += gameTime.elapsedTimeInMs;
        }
    }

}