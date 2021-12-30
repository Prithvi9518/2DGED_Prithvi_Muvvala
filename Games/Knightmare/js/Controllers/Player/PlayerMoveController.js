/**
 * Moves the parent sprite based on keyboard input and detect collisions against platforms, pickups etc.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class PlayerMoveController
 */
 class PlayerMoveController {

    constructor(
        notificationCenter,
        keyboardManager,
        objectManager,
        moveKeys,
        runVelocity,
        jumpVelocity
    ) {
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;
        this.objectManager = objectManager;

        this.moveKeys = moveKeys;
        this.runVelocity = runVelocity;
        this.jumpVelocity = jumpVelocity;
    }

    update(gameTime, parent) {

        this.applyForces(gameTime, parent);
        this.handleInput(gameTime, parent);
        this.checkCollisions(parent);
        this.applyInput(parent);
    }

    applyForces(gameTime, parent) {

        // Apply basic physic forces to the
        // player sprite

        parent.body.applyGravity(gameTime);

        if (parent.body.onGround) {
            
            parent.body.applyFriction(gameTime);
        }
    }

    handleInput(gameTime, parent) {

        this.handleMove(gameTime, parent);
        this.handleJump(gameTime, parent);
    }

    handleMove(gameTime, parent) {

        // If the move left key is pressed
        if (this.keyboardManager.isKeyDown(this.moveKeys[0])) {

            // Add velocity to begin moving player left
            parent.body.addVelocityX(-this.runVelocity * gameTime.elapsedTimeInMs);

            // Update the player's animation
            parent.artist.setTake("Run Left");
        }

        // If the move right key is pressed
        else if (this.keyboardManager.isKeyDown(this.moveKeys[1])) {

            // Add velocity to begin moving the player right
            parent.body.addVelocityX(this.runVelocity * gameTime.elapsedTimeInMs);

            // Update the player's animation
            parent.artist.setTake("Run Right");
        }
    }

    // UPDATE JUMP 
    handleJump(gameTime, parent) {

        // If the player is already jumping, or if the player is
        // not on the ground, then don't allow the player to jump
        if (parent.body.jumping || !parent.body.onGround) return;

        // If the jump key is pressed
        if (this.keyboardManager.isKeyDown(this.moveKeys[2])) {

            // Update body variables
            parent.body.jumping = true;
            parent.body.onGround = false;

            // Apply velocity to begin moving the player up
            // This gives the effect of jumping 
            parent.body.setVelocityY(-this.jumpVelocity * gameTime.elapsedTimeInMs);

            // Create a jump sound notification
            // notificationCenter.notify(
            //     new Notification(
            //         NotificationType.Sound,
            //         NotificationAction.Play,
            //         ["jump"]
            //     )
            // );
        }
    }

    checkCollisions(parent) {

        // Assume that the play is not on the ground - i.e., 
        // assume that they are falling. We will update this
        // value in handlePlatformCollision function if the
        // player is currently colliding with a platform that
        // is below them (i.e., if they are on the ground)
        parent.body.onGround = false;

        this.handlePlatformCollision(parent);
        this.handlePickupCollision(parent);
        this.handleEnemyCollision(parent);
    }

    handlePlatformCollision(parent) {

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

            // If the player has ran into a platform that is to the
            // left or to the right of them
            if (
                collisionLocationType === CollisionLocationType.Left ||
                collisionLocationType === CollisionLocationType.Right
            ) {
                // Reduce their horizontal velocity to 0, to stop them
                // from moving
                parent.body.setVelocityX(0);
            }

            // If the player has landed on a platform
            if (collisionLocationType === CollisionLocationType.Bottom) {

                // Update variables to represent their new state
                parent.body.onGround = true;
                parent.body.jumping = false;

                parent.body.setVelocityY(0);
            }

            // If the player has collided with a platform that is above
            // them
            if (collisionLocationType === CollisionLocationType.Top) {

                // Update their velocity to move them downwards.
                // This will create a bounce effect, where it will look 
                // like the player is bouncing off the platform above
                parent.body.setVelocityY(this.jumpVelocity);
            }
        }
    }

    handlePickupCollision(parent) {

        // Get a list of all the pickup sprites that are stored
        // within the object manager
        const pickups = this.objectManager.get(ActorType.Pickup);

        // If pickups is null, exit the function
        if (pickups == null) return;

        // Loop through the list of pickup sprites
        for (let i = 0; i < pickups.length; i++) {

            // Store a reference to the current pickup sprite
            const pickup = pickups[i];

            // We can use a simple collision check here to check if the player has collided
            // with the pickup sprite
            if (parent.transform.boundingBox.intersects(pickup.transform.boundingBox)) {

                // If the player has collided with a pickup, do something...

                // Create a notification that will ultimately remove
                // the pickup sprite
                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sprite,
                        NotificationAction.Remove,
                        [pickup]
                    )
                );

                // Uncomment this code to see how we could remove ALL platforms    
                // notificationCenter.notify(
                //     new Notification(
                //         NotificationType.Sprite,            // Who is registered to listen to this notification?        see ObjectManager -> registerForNotifications
                //         NotificationAction.RemoveAllByType, // How does the ObjectManager handle the notification?      see ObjectManager -> handleSpriteNotification
                //         [ActorType.Platform]                // What parameters does the method you are calling expect?  see ObjectManager -> removeAllByType()
                //     )
                // );

                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.Play,
                        ["jump"]
                    )
                );

                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.Play,
                        ["jump"]
                    )
                );

                // Uncomment this code to see how we could remove the first platform that has an
                // x position > 400
                // notificationCenter.notify(
                //     new Notification(
                //         NotificationType.Sprite,
                //         NotificationAction.RemoveFirstBy,
                //         [ActorType.Platform, platform => platform.transform.translation.x > 400]
                //     )
                // );
            }
        }
    }

    handleEnemyCollision(parent) {

        // Get a list of all the enemy sprites that are stored within
        // the object mananger
        const enemies = this.objectManager.get(ActorType.Enemy);

        // If enemies is null, exit the function
        if (enemies == null) return;

        // Loop through the list of enemy sprites
        for (let i = 0; i < enemies.length; i++) {

            // Store a reference to the current enemy sprite
            const enemy = enemies[i];

            // We can use a simple collision check here to check if the player has collided
            // with the enemy sprite
            if (parent.transform.boundingBox.intersects(enemy.transform.boundingBox)) {

                // Your code here...

                // Play a sound?
                // Remove the enemy?
                // Update the player's health?

                // Uncomment the below code to create three notifications
                // that will be fired if the player collides with a pickup
                // sprite

                // notificationCenter.notify(
                //     new Notification(
                //         NotificationType.Sound,
                //         NotificationAction.Play,
                //         ["game_over"]
                //     )
                // );

                // notificationCenter.notify(
                //   new Notification(
                //     NotificationType.Sprite,
                //     NotificationAction.RemoveFirst,
                //     [enemy]
                //   )
                // );

                // notificationCenter.notify(
                //     new Notification(
                //         NotificationType.GameState,
                //         NotificationAction.Health,
                //         [-5]
                //     )
                // );
            }
        }
    }

    applyInput(parent) {

        // If the x velocity value is very small
        if (Math.abs(parent.body.velocityX) <= Body.MIN_SPEED) {

            // Then set the velocity to zero
            parent.body.setVelocityX(0);
        }

        // If the y velocity value is very small
        if (Math.abs(parent.body.velocityY) <= Body.MIN_SPEED) {

            // Then set the velocity to zero
            parent.body.setVelocityY(0);
        }

        // It is important that we 'Zero' velocity valuees which are
        // very small, otherwise, it is likely that there will always
        // be some velocity being applied to the physics object, which
        // is often desireable

        // Use the values of the player's velocity to update the
        // translation of the player sprite

        // This is where the velocity is actually applied to the
        // player sprite - if we removed the below code, then the 
        // player would never move.

        parent.transform.translateBy(
            new Vector2(
                parent.body.velocityX,
                parent.body.velocityY
            )
        );

    }

    equals(other) {

        // TO DO...
        throw "Not Yet Implemented";
    }

    toString() {

        // TO DO...
        throw "Not Yet Implemented";
    }

    clone() {

        // TO DO...
        throw "Not Yet Implemented";
    }
}