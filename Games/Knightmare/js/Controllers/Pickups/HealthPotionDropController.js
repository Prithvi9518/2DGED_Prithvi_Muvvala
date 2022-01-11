class HealthPotionDropController {

    constructor(notificationCenter, objectManager)
    {
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        
        this.timeUntilPickupDespawnInMs = 0;
        this.despawnTimeInMs = GameData.PICKUP_DESPAWN_TIME;
    }
 
    // Used to apply gravity to make the pickup drop down from above the screen
    applyForces(gameTime, parent) {

        if(!parent.body.onGround)
        {
            parent.body.applyGravity(gameTime);
        }
    }

    checkCollisions(gameTime, parent) {

        parent.body.onGround = false;
        this.handlePlatformCollision(gameTime, parent);
    }

    handlePlatformCollision(gameTime, parent)
    {
        // Get a list of all the platform sprites that are stored
        // within the object manager
        const platforms = this.objectManager.get(ActorType.Platform);

        // If platforms is null, exit the function
        if (platforms == null) return;

        // Loop through the list of platform sprites        
        for (let i = 0; i < platforms.length; i++) {

            // Store a reference to the current pickup sprite
            const platform = platforms[i];

            // Determine what type of collision has occured (if any)
            // Ultimately, if a collision has taken place, this function will 
            // return the direction at which that collision took place, 
            // otherwise, it will return null

            // e.g.
            // CollisionLocationType.Left       if the player has collided with a platform to the left
            // CollisionLocationType.Right      if the player has collided with a platform to the right
            // CollisionLocationType.Bottom     if the player has collided with a platform below
            // CollisionLocationType.Top        if the player has collided with a platform above
            // null                             if no collision has taken place


            let collisionLocationType = Collision.GetCollisionLocationType(
                parent,
                platform
            );

            // If the pickup has landed on a platform
            if (collisionLocationType === CollisionLocationType.Bottom) {

                // Update variables to represent their new state
                parent.body.onGround = true;
                parent.body.setVelocityY(0);

                // Remove sprite after a few seconds (if player hasn't picked it up)
                this.timeUntilPickupDespawnInMs += gameTime.elapsedTimeInMs;

                if(this.timeUntilPickupDespawnInMs >= this.despawnTimeInMs)
                {
                    this.notificationCenter.notify(
                        new Notification(
                            NotificationType.Sprite,
                            NotificationAction.Remove,
                            [parent]
                        )
                    );

                    this.timeUntilPickupDespawnInMs = 0;
                }

            }

        }
    }
 
    update(gameTime, parent)
    {
        this.applyForces(gameTime, parent);
        parent.transform.translateBy(new Vector2(0,parent.body.velocityY));
        this.checkCollisions(gameTime, parent);
    }
 
 }