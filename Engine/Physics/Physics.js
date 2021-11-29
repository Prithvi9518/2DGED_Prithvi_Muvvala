/**
 * Represents the physical properties of a sprite (e.g. mass, velocity, friction)
 * @author niall mcguinness
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
        this.setVelocityX(velocity.x);
        this.setVelocityY(velocity.y);
    }

    setVelocityX(velocityX) {
        if (velocityX <= this.maximumSpeed) {

            this.velocityX = velocityX;
        }
    }

    setVelocityY(velocityY) {
        if (velocityY <= this.maximumSpeed) {

            this.velocityY = velocityY;
        }
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
        return new Body(this.maximumSpeed, this.gravity, this.friction);
    }
}

/**
 * Parent class for the two types of collision primitive (circle or box) used by a Sprite for CD/CR.
 * @author niall mcguinness
 * @version 1.0
 * @class CollisionPrimitive
 */
class CollisionPrimitive {

    get transform() {
        return this._transform;
    }
    get isDirty() {
        return this._isDirty;
    }

    set transform(transform) {
        this._transform = transform;
    }
    set isDirty(isDirty) {
        this._isDirty = isDirty;
    }

    constructor(transform) {
        this.transform = transform;
        isDirty = true;
    }

    getBoundingPrimitive() {
        throw "Error: Base class is never directly instanciated - " +
        "Create RectCollisionPrimitive or CircleCollisionPrimitive for your Sprite";
    }

    /**
     * Called by the DebugDrawer to draw the collision surface to the canvas. In normal 
     * gameplay, this method is never called because the DebugDrawer is disabled.
     *
     * @param {Context} context
     * @param {number} alpha
     * @param {number} lineWidth
     * @param {string} strokeStyle
     * @memberof CircleCollisionPrimitive
     */
    debugDraw(context, alpha, lineWidth, strokeStyle) {
        context.globalAlpha = alpha;
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
    }

    toString() {
        throw "Error: Base class is never directly instanciated - " +
        "Create RectCollisionPrimitive or CircleCollisionPrimitive for your Sprite";
    }

    clone() {
        return new CollisionPrimitive(this.transform.clone());
    }
}

/**
 * Creates a collision primitive based on a rectangle used by a Sprite for CD/CR.
 * This class provides the Intersect() method to test for collisions.
 * 
 * @author niall mcguinness
 * @version 1.0
 * @class RectCollisionPrimitive
 */
class RectCollisionPrimitive extends CollisionPrimitive {

    constructor(transform, explodeRectBy) {
        super(transform);

        if (explodeRectBy % 2 == 0) {

            this.explodeRectBy = explodeRectBy;
        }
        else if (explodeRectBy % 2 == 1) {

            this.explodeRectBy = null;

            throw "Error: explodeBy value must be an even integer value since we ue it to expand/collapse the rectangle primitive!";
        }

        // Call once to set the first time in
        this.getBoundingPrimitive();
    }

    move(x, y) {
        this.boundingRectangle.move(x, y);
    }

    /**
     * Returns the appropriate bounding primitive (e.g. rect or circle) for the class type.
     * This method is optimized to ONLY calculate a new Rect IF the associated transform changes OR if the explodeBy value changes
     *
     * @returns Rect describing the bounding surface
     * @memberof RectCollisionPrimitive
     */
    getBoundingPrimitive() {

        // Check associated Transform2D dirty flag and check local flag which indicates changes to explodeRectBy 
        if (this.transform.isDirty || this.isDirty) {

            let w = this.transform.scale.x * this.transform.dimensions.x;
            let h = this.transform.scale.y * this.transform.dimensions.y;
            let x = this.transform.translation.x - this.transform.origin.x * this.transform.scale.x;
            let y = this.transform.translation.y - this.transform.origin.y * this.transform.scale.y;

            // Expand/collapse if necessary
            if (this.explodeRectBy != 0) {

                let explodeByHalf = this.explodeRectBy / 2;

                // Make wider and taller and move (x,y) up and left based on the explodeBy value
                x -= explodeByHalf;
                y -= explodeByHalf;
                w += this.explodeRectBy;
                h += this.explodeRectBy;
            }

            // Set the new bounding box
            this.boundingRectangle = new Rect(x, y, w, h);

            // Set associated Transform2D dirty flag to false until translation, 
            // rotation, scale, or origin change again
            this.transform.isDirty = false;

            // Set local dirty flag to false
            this.isDirty = false;
        }

        return this.boundingRectangle;
    }

    /**
     * Called by the DebugDrawer to draw the collision surface to the canvas. In normal gameplay this method is never called
     * because the DebugDrawer is disabled.
     *
     * @param {Context} context
     * @param {number} alpha
     * @param {number} lineWidth
     * @param {string} strokeStyle
     * @memberof CircleCollisionPrimitive
     */
    debugDraw(context, alpha, lineWidth, strokeStyle) {

        super.debugDraw(context, alpha, lineWidth, strokeStyle);

        context.strokeRect(
            this.boundingRectangle.x,
            this.boundingRectangle.y,
            this.boundingRectangle.width,
            this.boundingRectangle.height
        );
    }

    toString() {
        return this.boundingRectangle.toString();
    }

    clone() {
        return new RectCollisionPrimitive(this.transform.clone(), this.explodeRectBy);
    }
}

/**
 * Creates a collision primitive based on a circle used by a Sprite for CD/CR.
 * This class provides the Intersect() method to test for collisions.
 * @author niall mcguinness
 * @version 1.0
 * @class RectCollisionPrimitive
 */
class CircleCollisionPrimitive extends CollisionPrimitive {

    constructor(transform2D, radius) {
        super(transform2D);

        this.radius = radius;

        // Call once to set the first time in
        this.getBoundingPrimitive();
    }

    move(x, y) {
        this.boundingCircle.Move(x, y);
    }

    /**
     * Returns the appropriate bounding primitive (e.g. rect or circle) for the class type.
     * This method is optimized to ONLY calculate a new Rect IF the associated transform changes OR if the radius value changes
     *
     * @returns Circle describing the bounding surface
     * @memberof CircleCollisionPrimitive
     */
    getBoundingPrimitive() {

        // Check associated transform dirty flag and check local flag which indicates changes to radius 
        if (this.transform.isDirty || this.isDirty) {

            // Set the new bounding circle
            this.boundingCircle = new Circle(this.transform.translation, this.radius);

            // Set associated Transform2D dirty flag to false until translation, rotation, scale, or origin change again
            this.transform.isDirty = false;

            // Set local dirty flag to false
            this.isDirty = false;
        }

        return this.boundingCircle;
    }

    /**
     * Called by the DebugDrawer to draw the collision surface to the canvas. In normal gameplay 
     * this method is never called because the DebugDrawer is disabled.
     *
     * @param {Context} context
     * @param {number} alpha
     * @param {number} lineWidth
     * @param {string} strokeStyle
     * @memberof CircleCollisionPrimitive
     */
    debugDraw(context, alpha, lineWidth, strokeStyle) {

        context.beginPath();

        super.debugDraw(context, alpha, lineWidth, strokeStyle);

        context.arc(
            this.boundingCircle.center.x,
            this.boundingCircle.center.y,
            this.radius,
            0,
            2 * Math.PI
        );

        context.stroke();
    }

    toString() {
        return this.boundingCircle.ToString();
    }

    clone() {
        return new CircleCollisionPrimitive(this.transform2D.Clone(), this.radius);
    }
}

/**
 * Represents the 4 possible directions that a collision can take place between two actors. We retun this type from the
 * GetIntersectsLocation method which is normally called when testing for collisions between an actor and architecture.
 * Why? Because when we collide with architecture we need to see in what direction the collision has taken place so that
 * we can set the velocity in that direction to 0.
 *
 * @class Collision
 */
const CollisionLocationType = {
    Top: 1,         //0001
    Right: 2,       //0010
    Bottom: 4,      //0100
    Left: 8         //1000
};

/**
 * Represents the 3 possible options for a collision primitive for an actor (i.e. 
 * non-collidable with None, and collidable with a Rectangle or Circle collision surface).
 * 
 * @see MyConstants and collisionProperties found in a number of objects in this file
 * @class Collision
 */
const CollisionPrimitiveType = {
    None: 1,
    Rectangle: 2,
    Circle: 4,

    // Possible future types...
    // Capsule : 8,
    // Line: 16
};

/**
* Provides Intersects and GetIntersectsLocation methods used by Sprites to determine if a collision has occured.
* @author niall mcguinness
* @version 1.0
* @class Collision
*/
class Collision {

    /**
     * Test for intersection between two actors. If one or more of the actors have a body then this method will predict if the actors WILL collide. 
     * This predictive collision detection prevents the actors from colliding and then being locked together (because the collision response blocks any further movement)
     *
     * @static
     * @param {Actor2D} actorA A collider representing an actor testing for collision against a collidee (e.g. a player (collider) against a wall (collidee))
     * @param {Actor2D} actorB A collidee representing the actor being testing for collision against
     * @returns True if intersection, otherwise false
     * @memberof Collision
     */
    static Intersects(actorA, actorB) {

        // If same (e.g. player testing against themself then return false)
        if (actorA === actorB) {

            return false;
        }

        if (actorA.collisionPrimitive == null || actorB.collisionPrimitive == null) {

            throw "One or more sprites ["
            + actorA.id + "," + actorB.id +
            "] does not have a valid collision primitive!";
        }


        // Get bounding primitives for the two actors
        let boundingPrimitiveA = actorA.collisionPrimitive.getBoundingPrimitive();
        let boundingPrimitiveB = actorB.collisionPrimitive.getBoundingPrimitive();

        // If A has a body (i.e. it moves) then project the bounding primitive to where it 
        // WOULD be if the move was applied
        if (actorA.body != null) {

            boundingPrimitiveA = actorA.collisionPrimitive.getBoundingPrimitive().clone();

            // Predictive collision
            boundingPrimitiveA.move(actorA.body.velocityX, actorA.body.velocityY);
        }

        // If B has a body (i.e. it moves) then project the bounding primitive to where it 
        // WOULD be if the move was applied
        if (actorB.body != null) {

            boundingPrimitiveB = actorB.collisionPrimitive.getBoundingPrimitive().clone();

            // Predictive collision
            boundingPrimitiveB.move(actorB.body.velocityX, actorB.body.velocityY);
        }

        if (
            actorA.collisionPrimitive instanceof CircleCollisionPrimitive &&
            actorB.collisionPrimitive instanceof RectCollisionPrimitive
        ) {
            return Collision.IntersectsCircleRect(boundingPrimitiveA, boundingPrimitiveB);
        }

        else if (
            actorA.collisionPrimitive instanceof RectCollisionPrimitive &&
            actorB.collisionPrimitive instanceof CircleCollisionPrimitive
        ) {
            return Collision.IntersectsCircleRect(boundingPrimitiveB, boundingPrimitiveA);
        }

        else {
            return boundingPrimitiveA.intersects(boundingPrimitiveB);
        }
    }

    /**
    * Test for intersection between two actors. If one or more of the actors have a body then this method will predict if the actors WILL collide. 
    * This predictive collision detection prevents the actors from colliding and then being locked together (because the collision response blocks any further movement)
    * 
    * 
    * @static
    * @param {Actor2D} actorA A collider representing an actor testing for collision against a collidee (e.g. a player (collider) against a wall (collidee))
    * @param {Actor2D} actorB A collidee representing the actor being testing for collision against
    * @returns CollisionLocationType indicating the direction of the intersection, otherwise null
    * @memberof Collision
    */
    static GetIntersectsLocation(actorA, actorB) {

        let collisionLocationType = null;

        // If the x and y vector are less than the half width or half height, they
        // must be inside the object, causing a collision
        if (Collision.Intersects(actorA, actorB)) {

            let boundingBoxA = actorA.collisionPrimitive.getBoundingPrimitive();
            let boundingBoxB = actorB.collisionPrimitive.getBoundingPrimitive();

            // If B has a body (i.e. it moves) then project the bounding primitive to where it 
            // WOULD be if the move was applied
            if (actorA.body != null) {

                boundingBoxA = actorA.collisionPrimitive.getBoundingPrimitive().clone();
                boundingBoxA.move(actorA.body.velocityX, actorA.body.velocityY);
            }

            // If B has a body (i.e. it moves) then project the bounding primitive to where it 
            // WOULD be if the move was applied
            if (actorB.body != null) {

                boundingBoxB = actorB.collisionPrimitive.getBoundingPrimitive().clone();
                boundingBoxB.move(actorB.body.velocityX, actorB.body.velocityY);
            }

            let hWidths = 0;
            let hHeights = 0;

            if (boundingBoxA instanceof Rect && boundingBoxB instanceof Rect) {
                hWidths = (boundingBoxA.width + boundingBoxB.width) / 2;
                hHeights = (boundingBoxA.height + boundingBoxB.height) / 2;
            }

            else if (boundingBoxA instanceof Rect && boundingBoxB instanceof Circle) {
                hWidths = (boundingBoxA.width + boundingBoxB.radius) / 2;
                hHeights = (boundingBoxA.height + boundingBoxB.radius) / 2;
            }

            else if (boundingBoxA instanceof Circle && boundingBoxB instanceof Rect) {
                hWidths = (boundingBoxA.radius + boundingBoxB.width) / 2;
                hHeights = (boundingBoxA.radius + boundingBoxB.height) / 2;
            }

            else {
                hWidths = (boundingBoxA.radius + boundingBoxB.radius) / 2;
                hHeights = (boundingBoxA.radius + boundingBoxB.radius) / 2;
            }

            let vX = boundingBoxA.center.x - boundingBoxB.center.x;
            let vY = boundingBoxA.center.y - boundingBoxB.center.y;

            // Figures out on which side we are colliding (top, bottom, left, or right)
            let oX = Math.ceil(hWidths - Math.abs(vX));
            let oY = Math.ceil(hHeights - Math.abs(vY));

            if (oX >= oY) {

                if (vY > 0) {
                    collisionLocationType = CollisionLocationType.Top;
                } else {
                    collisionLocationType = CollisionLocationType.Bottom;
                }
            }

            else {

                if (vX > 0) {
                    collisionLocationType = CollisionLocationType.Left;
                } else {
                    collisionLocationType = CollisionLocationType.Right;
                }
            }
        }

        return collisionLocationType;
    }

    /**
     * Test for intersection between two actor collision primitives where the collider is a circle and the collidee is a rect.
     * 
     * @static
     * @param {CollisionPrimitive} circle CollisionPrimitive representing a circular collision surface
     * @param {CollisionPrimitive} rect CollisionPrimitive representing a rectangular collision surface
     * @returns True if intersection, otherwise false
     * @see Collision::Intersects(actorA, actorB) 
     * @tutorial https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
     * @author https://yal.cc/rectangle-circle-intersection-test/
     * @memberof Collision
     */
    static IntersectsCircleRect(circle, rect) {

        let deltaX = circle.center.x - Math.max(rect.x, Math.min(circle.center.x, rect.x + rect.width));
        let deltaY = circle.center.y - Math.max(rect.y, Math.min(circle.center.y, rect.y + rect.height));

        return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius);
    }
}

/**
 * This component allows us to draw debug information to the screen (e.g. sprite and camera bounding boxes, fps etc)
 * @author niall mcguinness
 * @version 1.0
 * @class DebugDrawer
 */
class DebugDrawer {

    static BOUNDING_PRIMITIVE_COLOR = "red";
    static BOUNDING_PRIMITIVE_LINE_WIDTH = 2;
    static BOUNDING_PRIMITIVE_LINE_ALPHA = 1;
    
    constructor(id, statusType, context, objectManager) {
        this.id = id;
        this.statusType = statusType;
        this.context = context;
        this.objectManager = objectManager;
    }

    update(gameTime) { }

    draw(gameTime) {

        if ((this.statusType & StatusType.Drawn) != 0) {
            this.drawCollisionPrimitives();
        }
    }

    setContext(transform) {

        this.context.translate(transform.translation.x, transform.translation.y);
        this.context.scale(transform.scale.x, transform.scale.y);
        this.context.rotate(transform.rotationInRadians);
        this.context.translate(-transform.translation.x, -transform.translation.y);
    }

    drawCollisionPrimitives() {
        
        let sprites = objectManager.findAll();

        if (sprites) {

            // For each of the keys in the sprites array (e.g. keys could be ActorType.Enemy, 
            // ActorType.Player)
            for (let key of Object.keys(sprites)) {
                
                // For the sprites inside the array for the current key call update
                for (let sprite of sprites[key]) {

                    if (sprite.collisionPrimitive) {
                        
                        this.context.save();

                        this.setContext(sprite.transform);

                        sprite.collisionPrimitive.debugDraw(
                            this.context, 
                            DebugDrawer.BOUNDING_PRIMITIVE_LINE_WIDTH,
                            DebugDrawer.BOUNDING_PRIMITIVE_LINE_ALPHA,
                            DebugDrawer.BOUNDING_PRIMITIVE_COLOR
                        );
                        
                        this.context.restore();
                    }
                }
            }
        }
    }
}