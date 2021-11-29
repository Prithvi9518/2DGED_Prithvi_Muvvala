/**
 * Represents any entity within a game with position information (e.g. camera, sprite, menu element)
 * This class contains a collisionPrimitive object which stores either a rect or circle collision primitive type.
 * This means that we can choose which primitive best suits the shape or CD/CR requirements for the actor it will be used with.
 *
 * @author Niall McGuinness
 * @version 1.1
 * @class Actor2D
 */
class Actor2D {

    get id() {
        return this._id;
    }
    get transform() {
        return this._transform;
    }
    get actorType() {
        return this._actorType;
    }
    get statusType() {
        return this._statusType;
    }

    get controllers() {
        return this._controllers;
    }
    get collisionPrimitive() {
        return this._collisionPrimitive;
    }

    set id(id) {
        this._id = id;
    }
    set transform(transform) {
        this._transform = transform;
    }
    set actorType(actorType) {
        this._actorType = actorType;
    }
    set statusType(statusType) {
        this._statusType = statusType;
    }
    set controllers(controllers) {
        this._controllers = controllers;
    }
    set collisionPrimitive(collisionPrimitive) {
        this._collisionPrimitive = collisionPrimitive;
    }

    constructor(id, transform, actorType, collisionType, statusType) {
        this.id = id;
        this.transform = transform;
        
        this.actorType = actorType;
        this.collisionType = collisionType;
        this.statusType = statusType;

        this.controllers = [];
        this.collisionPrimitive = null;
    }

    /**
     * Use to add a controller instance to the array of controllers executed for this actor.
     *
     * @param {*} controller
     * @memberof Actor2D
     */
    attachController(controller) {
        if (this.controllers == undefined) {
            this.controllers = [];
        }

        this.controllers.push(controller);
    }

    /**
     * Use to remove a controller instance, by id, from the array of controllers executed for this actor.
     *
     * @param {string} id
     * @memberof Actor2D
     */
    detachControllerByID(id) {
        for (let i = 0; i < this.controllers.length; i++) {
            if (this.controllers[i].id.equals(id)) {
                this.controllers.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Updates state information and executes attached controller(s)
     *
     * @param {GameTime} gameTime
     * @see ObjectManager::Update()
     * @memberof Actor2D
     */
    update(gameTime) {
        if (this.controllers == undefined) return;

        for (let i = 0; i < this.controllers.length; i++) {

            this.controllers[i].update(gameTime, this);
        }
    }

    equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other) && (
            this.id === other.id &&
            this.actorType === other.ActorType &&
            this.transform.equals(other.transform)
        );
    }

    clone() {

        // Clone the actor
        let clone = new Actor2D(
            this.id + " - Clone",
            this.transform.clone(),
            this.actorType,
            this.collisionType,
            this.statusType
        );

        // Clone all of the actor's attached behaviors
        for (let controller of this.controllers) {
            clone.attachController(controller.clone());
        }

        // Clone collision primitive (if present)
        if (this.collisionPrimitive) {
            clone.collisionPrimitive = this.collisionPrimitive.clone();
        }

        // Return cloned actor
        return clone;
    }

    toString() {
        return (
            "[" +
            this.id +
            "," +
            this.transform.toString() +
            "," +
            this.actorType +
            "," +
            this.collisionType +
            ", " +
            this.statusType +
            "]"
        );
    }
}