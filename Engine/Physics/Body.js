/**
 * Represents the physical properties of a sprite (e.g. mass, velocity, friction)
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Body
 */
 const FrictionType = {
    Low: 0.9,
    Normal: 0.7,
    High: 0.5
};

const GravityType = {
    Off: 0,
    Weak: 0.2,
    Normal: 0.4,
    Strong: 0.7
};

class Body {

    static MAX_SPEED = 10;
    static MIN_SPEED = 0.01;

    get maximumSpeed() {
        return this._maximumSpeed;
    }
    get gravity() {
        return this._gravity;
    }
    get friction() {
        return this._friction;
    }
    get velocityX() {
        return this._velocityX;
    }
    get velocityY() {
        return this._velocityY;
    }

    set maximumSpeed(maximumSpeed) {
        this._maximumSpeed = maximumSpeed || Body.MAX_SPEED;
    }
    set gravity(gravity) {
        this._gravity = gravity || GravityType.Normal;
    }
    set friction(friction) {
        this._friction = friction || FrictionType.Normal;
    }

    set velocityX(velocityX) {
        
        if (velocityX <= this.maximumSpeed) {
            this._velocityX = velocityX;
        }
    }

    set velocityY(velocityY) {

        if (velocityY <= this.maximumSpeed) {
            this._velocityY = velocityY;
        }
    }

    constructor(maximumSpeed, gravity, friction) {
        
        this.maximumSpeed = this.originalMaximumSpeed = maximumSpeed;
        this.gravity = this.originalGravity = gravity;
        this.friction = this.originalFriction = friction;

        this.velocityX = 0;
        this.velocityY = 0;

        this.jumping = false;
        this.onGround = false;
    }

    reset() {

        this.velocityX = 0;
        this.velocityY = 0;

        this.jumping = false;
        this.onGround = false;

        this.maximumSpeed = this.originalMaximumSpeed;
        this.gravity = this.originalGravity;
        this.friction = this.originalFriction;
    }

    applyGravity() {

        this.velocityY += this.gravity;
    }

    applyFriction() {
        
        this.velocityX *= this.friction;
    }

    applyFrictionX() {
        
        this.velocityX *= this.friction;
    }

    applyFrictionY() {
        
        this.velocityY *= this.friction;
    }

    setVelocity(velocity) {
        
        this.velocityX = velocity.x;
        this.velocityY = velocity.y;
    }

    addVelocity(velocity) {

        this.addVelocityX(velocity.x);
        this.addVelocityY(velocity.y);
    }

    addVelocityX(deltaVelocityX) {
        
        if (Math.abs(this.velocityX + deltaVelocityX) <= this.maximumSpeed) {
            this.velocityX += deltaVelocityX;
        }
    }

    addVelocityY(deltaVelocityY) {

        if (Math.abs(this.velocityY + deltaVelocityY) <= this.maximumSpeed) {
            this.velocityY += deltaVelocityY;
        }
    }

    equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other)
            && this.maximumSpeed === other.maximumSpeed
            && this.gravity === other.gravity
            && this.friction === other.friction;
    }

    toString() {
        return "[" +
            this.maximumSpeed + ", " +
            this.gravity + +", " +
            this.friction + ", " +
            this.velocityX + ", " +
            this.velocityY +
        "]";
    }

    clone() {
        return new Body(
            this.maximumSpeed, 
            this.gravity, 
            this.friction
        );
    }
}