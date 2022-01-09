class SkullShootController {

    constructor(notificationCenter, objectManager, shootInterval)
    {
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.shootInterval = shootInterval;

        // Internal Variables
        this.timeSinceLastShotInMs = 0;

    }

    shoot()
    {
        
    }

    update(gameTime, parent)
    {
        this.timeSinceLastShotInMs += gameTime.elapsedTimeInMs;
    }

}