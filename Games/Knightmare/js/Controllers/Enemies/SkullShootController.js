class SkullShootController {

    constructor(notificationCenter, objectManager, shootInterval)
    {
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.shootInterval = shootInterval;

        // Internal Variables
        this.noExistingFireballs = true;
        this.timeSinceLastShot = shootInterval;
        this.isFiring = true;

        this.registerForNotifications();

    }

    // We register this controller for notifications in order to set the isFiring variable to true/false
    // depending on the game state.
    // This is done to fix an issue where the fireballs keep spawning even after the game is over.
    registerForNotifications() {
        this.notificationCenter.register(
            NotificationType.SkullShootController, 
            this, 
            this.handleSkullShootNotification
        );
    }

    handleSkullShootNotification(notification)
    {
        switch (notification.notificationAction) {

            case NotificationAction.ToggleFiring:
                this.toggleFiring(notification.notificationArguments[0]);
                break;

            default:
                break;
        }
    }

    toggleFiring(firing)
    {
        this.isFiring = firing;
    }

    initializeFireball(parent)
    {
        let transform;
        let artist;
        let sprite;

        artist = new AnimatedSpriteArtist(
            context,
            1,
            GameData.FIREBALL_ANIMATION_DATA
        );

        artist.setTake("Charging");

        // Calculating the direction to fire a fireball based on the difference in x axis
        // between the midpoint of the canvas and the translation of the parent
        let fireDirection = new Vector2(canvas.clientWidth/2 - parent.transform.translation.x,0);

        // Normalize to give either (1,0) or (-1,0)
        fireDirection = Vector2.Normalize(fireDirection);

        // Caluclating the offset of fireball's x position from the skull's position
        let xPos = parent.transform.translation.x + (fireDirection.x * (parent.transform.boundingBox.width + 3));

        transform = new Transform2D(
            new Vector2(xPos, parent.transform.translation.y + 20),
            0,
            Vector2.One,
            Vector2.Zero,
            artist.getBoundingBoxByTakeName("Charging"),
            0
        );

        sprite = new Sprite(
            GameData.FIREBALL_ANIMATION_DATA.id,
            transform,
            ActorType.Projectile,
            CollisionType.Collidable,
            StatusType.Drawn | StatusType.Updated,
            artist,
            1,
            1
        );

        sprite.attachController(
            new FireballController(
                this.notificationCenter,
                this.objectManager,
                fireDirection.x * GameData.FIREBALL_VELOCITY_MULTIPLIER,
                GameData.FIREBALL_CHARGE_DURATION
            )
        );

        this.objectManager.add(sprite);

    }

    // Checks every frame if a fireball sprite currently exists
    checkForExistingFireballs()
    {
        // Getting an array of all the projectiles from the object manager, and filtering it to see which elements
        // have an id that includes Fireball
        let projectiles = this.objectManager.get(ActorType.Projectile);
        if(projectiles == null) return;

        let fireballs = projectiles.filter(function(el) {
            return el.id.includes("Fireball");
        });

        // Set noExistingFireballs to true, and reset timeSinceLast shot to 0 when there are no remaining fireballs on the canvas
        if(fireballs.length == 0 && !this.noExistingFireballs)
        {
            this.noExistingFireballs = true;
            this.timeSinceLastShot = 0;
        }
    }

    shootFireball(parent)
    {
        if(this.isFiring)
        {
            // After the shoot interval, shoot a new fireball if there are no other fireballs on the canvas
            if(this.noExistingFireballs && this.timeSinceLastShot >= this.shootInterval)
            {
                this.initializeFireball(parent);
                this.noExistingFireballs = false;
            }
        }
    }

    update(gameTime, parent)
    {
        this.checkForExistingFireballs();
        this.shootFireball(parent);

        if(this.noExistingFireballs)
        {
            this.timeSinceLastShot += gameTime.elapsedTimeInMs;
        }
    }

}