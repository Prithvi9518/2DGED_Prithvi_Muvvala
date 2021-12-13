/**
 * Renders a rectangle primitive for the parent sprite.
 * 
 * @author
 * @version 1.0
 * @class RectangleSpriteArtist
 */
 class RectangleSpriteArtist extends Artist {

    get alpha() {
        return this._alpha;
    }
    get lineWidth() {
        return this._lineWidth;
    }
    get strokeStyle() {
        return this._strokeStyle;
    }
    get fillStyle() {
        return this._fillStyle;
    }
    get fixedPosition() {
        return this._fixedPosition;
    }

    set alpha(alpha) {
        this._alpha = (alpha > 1 || alpha < 0) ? 1 : alpha;
    }
    set lineWidth(lineWidth) {
        this._lineWidth = lineWidth;
    }
    set strokeStyle(strokeStyle) {
        this._strokeStyle = strokeStyle;
    }
    set fillStyle(fillStyle) {
        this._fillStyle = fillStyle;
    }
    set fixedPosition(fixedPosition) {
        this._fixedPosition = fixedPosition;
    }

    constructor(
        context,
        alpha,
        lineWidth,
        strokeStyle,
        fillStyle,
        fixedPosition = false
    ) {
        super(context, alpha);

        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;

        this.fixedPosition = fixedPosition;
    }

    /**
     * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @param {Camera2D} activeCamera 
     * @memberof RectangleSpriteArtist
     */
    update(gameTime, parent, camera) {

    }

    /**
     * Renders rectangle to canvas
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof RectangleSpriteArtist
     */
    draw(gameTime, parent, activeCamera) {

        // Save whatever context settings were used before this (color, line, text styles)
        this.context.save();

        // If the position of this sprite is not fixed in place
        if (!this.fixedPosition) {

            // Apply the camera transformations to the scene 
            // (i.e. to enable camera zoom, pan, rotate)
            activeCamera.setContext(this.context);
        }

        // Access the transform for the parent that this artist is attached to
        let transform = parent.transform;

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.strokeStyle;
        this.context.fillStyle = this.fillStyle;

        this.context.strokeRect(
            transform.translation.x,
            transform.translation.y,
            transform.dimensions.x * transform.scale.x,
            transform.dimensions.y * transform.scale.y
        );

        this.context.fillRect(
            transform.translation.x,
            transform.translation.y,
            transform.dimensions.x * transform.scale.x,
            transform.dimensions.y * transform.scale.y
        );

        this.context.restore();
    }

    equals(other) {
        return super.equals(other)
            && this.alpha === other.alpha
            && this.lineWidth === other.lineWidth
            && this.strokeStyle === other.strokeStyle
            && this.fillStyle === other.fillStyle
            && this.fixedPosition === other.fixedPosition
    }

    clone() {
        return new RectangleSpriteArtist(
            this.context,
            this.alpha,
            this.lineWidth,
            this.strokeStyle,
            this.fillStyle,
            this.fixedPosition
        );
    }

    toString() {
        return "[" +
            this.lineWidth + "," +
            this.strokeStyle + "," +
            this.fillStyle + "," +
            this.alpha + "," +
            this.fixedPosition +
            "]";
    }
}