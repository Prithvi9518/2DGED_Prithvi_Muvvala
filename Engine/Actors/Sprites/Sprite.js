/**
 * Represents a drawn entity within our game.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Sprite
 */
class Sprite extends Actor2D {

    get artist() {
        return this._artist;
    }

    set artist(artist) {
        this._artist = artist;
    }

    /**
     * 
     * @param {*} id 
     * @param {*} transform 
     * @param {*} actorType 
     * @param {*} collisionType 
     * @param {*} statusType 
     * @param {*} artist 
     * @param {*} scrollSpeedMultiplier 
     * @param {*} layerDepth 
     */
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
        super(id, transform, actorType, collisionType, statusType);

        this.artist = artist;
        this.scrollSpeedMultiplier = scrollSpeedMultiplier;
        this.layerDepth = layerDepth;
    }

    /**
     * 
     * @param {GameTime} gameTime 
     */
    update(gameTime, camera) {

        //   0011 3 (Drawn | Updated)
        // & 0010
        //   0010

        //   0010   (Updated)   <- this.statusType
        // & 0010   (Updated)
        //   0010

        //   0001   (Drawn)     <- this.statusType
        // & 0010   (Updated)
        //   0000
        if ((this.statusType & StatusType.Updated) != 0) {
            this.artist.update(gameTime, this, camera);
        }

        super.update(gameTime, camera);
    }

    /**
     * 
     * @param {GameTime} gameTime 
     */
    draw(gameTime, camera) {
        if ((this.statusType & StatusType.Drawn) != 0) {
            this.artist.draw(gameTime, this, camera);
        }
    }

    /**
     * 
     * @returns 
     */
    clone() {
        let clone = new Sprite(
            this.id + " - Clone",
            this.transform.clone(),
            this.actorType,
            this.collisionType,
            this.statusType,
            this.artist.clone(),
            this.scrollSpeedMultiplier,
            this.layerDepth
        );

        // Clone all of the actor's attached behaviors
        for (let controller of this.controllers) {
            clone.attachController(controller.clone());
        }

        // Clone collision primitive (if present)
        if (this.collisionPrimitive) {
            clone.collisionPrimitive = this.collisionPrimitive.clone();
        }

        return clone;
    }
}