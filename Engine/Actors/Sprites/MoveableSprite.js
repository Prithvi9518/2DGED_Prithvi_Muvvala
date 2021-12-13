/**
 * Represents a drawn player character or non-player character within a game with position information 
 * (e.g. player, enemy)
 * 
 * @author
 * @version 1.0
 * @class PlayerSprite
 */
 class MoveableSprite extends Sprite {

    get body() {
        return this._body;
    }

    set body(body) {

        // Set default if not defined
        this._body = body || new Body();
    }

    constructor(
        id,
        transform,
        actorType,
        collisionType,
        statusType,
        artist,
        scrollSpeedMultiplier,
        layerDepth
    ) {
        super(
            id,
            transform,
            actorType,
            collisionType,
            statusType,
            artist,
            scrollSpeedMultiplier,
            layerDepth
        );

        this.body = new Body();
    }

    equals(other) {
        return super.equals(other) && this.body.equals(other.body);
    }

    toString() {
        
        // Add a class-specific method here later...
        // For now, we are being lazy by just calling the parent's toString method!
        return super.toString();
    }

    clone() {

        // Make a clone of the actor
        let clone = new MoveableSprite(
            this.id,
            this.transform.clone(),
            this.actorType,
            this.collisionType,
            this.statusType,
            this.artist.clone(),
            this.scrollSpeedMultiplier,
            this.layerDepth
        );

        // Now, clone all of the actor's attached controllers
        for (let controller of this.controllers) {
            clone.attachController(controller.clone());
        }

        // Lastly, return the cloned actor
        return clone;
    }
}