/**
 * Represents a drawn player character or non-player character within a game with position information 
 * (e.g. player, enemy) and, most importantly, a physics Body instance which can be used to apply gravity and
 * friction.
 * 
 * Use this class when you create a PC or Non-PC that needs to include these forces.
 * See SamPlayerBehavior classes in each game for sample code showing how the body is used.
 * 
 * @author niall mcguinness
 * @version 1.0
 * @class CollidableSprite
 */
class CollidableSprite extends Sprite {

    get body() {
        return this._body;
    }

    set body(body) {

        // Set default if not defined
        this._body = body || new Body();
    }

    constructor(
        id, 
        actorType, 
        statusType, 
        transform, 
        artist, 
        layerDepth = 1
    ) {
        super(
            id, 
            actorType, 
            statusType, 
            transform, 
            artist, 
            layerDepth
        );
        
        body = new Body();
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
        let clone = new CollidableSprite(
            this.id,
            this.actorType,
            this.statusType,
            this.transform.clone(),
            this.artist.clone(),
            this.layerDepth
        );

        // Now clone all the attached controllers
        for (let controller of this.controllers) {

            clone.attachController(controller.clone());
        }

        if (this.collisionPrimitive) {

            clone.collisionPrimitive = this.collisionPrimitive.clone();
        }

        return clone;
    }
}