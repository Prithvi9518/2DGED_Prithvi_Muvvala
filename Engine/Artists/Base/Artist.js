/**
 * Base class for all artists
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Artist
 */
class Artist {

    get context() {
        return this._context;
    }
    get spriteSheet() {
        return this._spriteSheet;
    }
    get alpha() {
        return this._alpha;
    }

    set context(value) {
        this._context = value;
    }
    set spriteSheet(value) {
        this._spriteSheet = value;
    }
    set alpha(value) {
        this._alpha = (value > 1 || value < 0) ? 1 : value;
    }

    /**
     * Constructs the Artist object which is the parent for SpriteArtist(static images) and AnimatedSpriteArtist(animated images)
     * @param {CanvasRenderingContext2D} context Handle to draw context
     * @param {HTMLImageElement} spriteSheet Handle to the image data
     * @param {Number} alpha Floating point value (0-1) indicating sprite transparency
     */
    constructor(context, spriteSheet, alpha) {
        this.context = context;
        this.spriteSheet = spriteSheet;
        this.alpha = alpha;
    }

    /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @memberof Artist
     */
    update(gameTime, parent) {

    }

    /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent
     * @memberof Artist
     */
    draw(gameTime, parent) {

    }

    equals(other) {
        return (
            GDUtility.IsSameTypeAsTarget(this, other) &&
            this.context === other.context &&
            this.spriteSheet === other.spriteSheet &&
            this.alpha === other.alpha
        );
    }

    clone() {
        return new Artist(this.context, this.spriteSheet, this.alpha);
    }

    toString() {
        return "[" + this.context + "," + this.spriteSheet + "," + this.alpha + "]";
    }
}