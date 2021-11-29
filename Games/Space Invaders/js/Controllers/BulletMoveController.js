/**
 * @author James Farrell
 */
class BulletMoveController {

    /**
     * 
     * @param {*} notificationCenter 
     * @param {*} objectManager 
     * @param {*} moveDirection 
     * @param {*} moveSpeed 
     */
    constructor(
        notificationCenter,
        objectManager,
        moveDirection,
        moveSpeed
    ) {
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;

        this.moveDirection = moveDirection;
        this.moveSpeed = moveSpeed;
    }

    /**
     * 
     * @param {*} gameTime 
     * @param {*} parent 
     */
    update(gameTime, parent) {

        this.updatePosition(gameTime, parent);

        this.handleEnemyCollision(parent);
        this.handleDecoratorCollision(parent);
        this.handleExitCanvas(parent);
    }

    updatePosition(gameTime, parent) {

        // Calculate velocity vector
        let velocity = Vector2.MultiplyScalar(
            this.moveDirection,
            gameTime.elapsedTimeInMs * this.moveSpeed
        );

        // Move the bullet
        parent.transform.translateBy(velocity);
    }

    handleEnemyCollision(parent) {

        // Get a list of all enemy sprites
        let enemySprites = this.objectManager.sprites[ActorType.Enemy];

        // Loop through enemy sprites
        for (let index = 0; index < enemySprites.length; index++) {

            // Store a reference to the current enemy
            const enemy = enemySprites[index];

            // Store a reference to each bounding box
            const bulletBoundingBox = parent.transform.boundingBox;
            const enemyBoundingBox = enemy.transform.boundingBox;

            // Check if the two bounding boxes are intersecting
            if (bulletBoundingBox.intersects(enemyBoundingBox)) {

                // Remove enemy
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sprite,    // Type
                        NotificationAction.Remove,  // Action
                        [enemy]                     // Arguments
                    )
                );

                // Remove bullet
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sprite,    // Type
                        NotificationAction.Remove,  // Action
                        [parent]                    // Arguments
                    )
                );

                // Play bading
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,     // Type
                        NotificationAction.Play,    // Action
                        ["sound_bading"]            // Arguments
                    )
                );
            }
        }
    }

    handleDecoratorCollision(parent) {

        // Get a list of all enemy sprites
        let decoratorSprites = this.objectManager.sprites[ActorType.Decorator];

        // Loop through enemy sprites
        for (let index = 0; index < decoratorSprites.length; index++) {

            // Store a reference to the current enemy
            const decorator = decoratorSprites[index];

            // Store a reference to each bounding box
            const bulletBoundingBox = parent.transform.boundingBox;
            const decoratorBoundingBox = decorator.transform.boundingBox;

            // Check if the two bounding boxes are intersecting
            if (bulletBoundingBox.intersects(decoratorBoundingBox)) {

                // Remove bullet
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sprite,    // Type
                        NotificationAction.Remove,  // Action
                        [parent]                    // Arguments
                    )
                );
            }
        }
    }

    handleExitCanvas(parent) {

        // If the bullet has left the bounds of our canvas
        if (parent.transform.translation.y < 0) {

            // Remove from object manager
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sprite,    // Type
                    NotificationAction.Remove,  // Action
                    [parent]                    // Arguments
                )
            );
        }
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new BulletMoveController(
            this.notificationCenter,
            this.objectManager,
            this.moveDirection,
            this.moveSpeed
        );
    }
}