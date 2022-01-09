class SkullShootController {

    constructor(notificationCenter, objectManager, shootInterval)
    {
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.shootInterval = shootInterval;

        // Internal Variables
        this.noExistingFireballs = true;
        this.timeSinceLastShot = shootInterval;

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

        let fireDirection = new Vector2(canvas.clientWidth/2 - parent.transform.translation.x,0);
        fireDirection = Vector2.Normalize(fireDirection);

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
                fireDirection.x * 5,
                2000
            )
        );

        this.objectManager.add(sprite);

    }

    checkForExistingFireballs()
    {
        let projectiles = this.objectManager.get(ActorType.Projectile);

        let fireballs = projectiles.filter(function(el) {
            return el.id.includes("Fireball");
        });

        if(fireballs.length == 0 && !this.noExistingFireballs)
        {
            this.noExistingFireballs = true;
            this.timeSinceLastShot = 0;
            return;
        }
    }

    shootFireball(parent)
    {
        if(this.noExistingFireballs && this.timeSinceLastShot >= this.shootInterval)
        {
            this.initializeFireball(parent);
            this.noExistingFireballs = false;
        }
    }

    update(gameTime, parent)
    {
        this.shootFireball(parent);

        this.checkForExistingFireballs();

        if(this.noExistingFireballs)
        {
            this.timeSinceLastShot += gameTime.elapsedTimeInMs;
        }
    }

}