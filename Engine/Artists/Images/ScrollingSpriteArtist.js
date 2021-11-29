/**
 * Renders multiple (left, centre, right) copies of an image that enable HORIZONTAL scrolling
 * @author
 * @version 1.0
 * @class ScrollingSpriteArtist
 */
class ScrollingSpriteArtist extends Artist {

    get spritesheet() {
        return this._spritesheet;
    }
    get sourcePosition() {
        return this._sourcePosition;
    }
    get sourceDimensions() {
        return this._sourceDimensions;
    }

    set spritesheet(spritesheet) {
        this._spritesheet = spritesheet;
    }
    set sourcePosition(sourcePosition) {
        this._sourcePosition = sourcePosition;
    }
    set sourceDimensions(sourceDimensions) {
        this._sourceDimensions = sourceDimensions;
    }

    constructor(
        context,
        spriteSheet,
        alpha,
        sourcePosition,
        sourceDimensions,
        screenWidth,
        screenHeight,
    ) {
        super(context, spriteSheet, alpha);

        this.sourcePosition = sourcePosition;
        this.sourceDimensions = sourceDimensions;

        // Allows us to know when we have scrolled past the 
        // LEFT/RIGHT of the centre image.
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    /**
     * Resets the translation offset on the parent so that when the user passes to the LEFT/RIGHT of the centre image
     * the parentTranslationOffsetX (in the case of horizontal scrolling) is reset. If we did not reset this value
     * then we when we pass to the LEFT/RIGHT we would see the edge of the LEFT/RIGHT image.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @memberof ScrollingSpriteArtist
     */
    update(gameTime, parent, activeCamera) {

        // Reset horizontal scroll
        this.updateHorizontalScrolling(parent, activeCamera);

        // Reset vertical scroll
        this.updateVerticalScrolling(parent, activeCamera);
    }

    /**
     * Checks if the player has scrolled HORIZONTALLY more than 1 complete SCALED sprite WIDTH and, 
     * if true, resets the translation offset.
     * 
     * The effect of this is to allow the background to scroll infinitely along the horizontal.
     *
     * @param {Sprite} parent
     * @memberof ScrollingSpriteArtist
     */
    updateHorizontalScrolling(parent, activeCamera) {

        // TO DO ...
    }

    /**
     * Checks if the player has scrolled VERTICALLY more than 1 complete SCALED sprite HEIGHT and, 
     * if true, resets the translation offset.
     * 
     * The effect of this is to allow the background to scroll infinitely along the vertical.
     *
     * @param {Sprite} parent
     * @memberof ScrollingSpriteArtist
     */
    updateVerticalScrolling(parent) {

        // TO DO ...
    }

    /**
     * Renders the pixel data from spritesheet THREE times to allow left and right HORIZONTAL scrolling.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof ScrollingSpriteArtist
     */
    draw(gameTime, parent, activeCamera) {

        // Save whatever context settings were used before this (color, line, text styles)
        this.context.save();

        // Apply the camera transformations to the scene 
        // (i.e. to enable camera zoom, pan, rotate)
        activeCamera.setContext(this.context);

        // Access the transform for the parent that this artist is attached to
        let transform = parent.transform;

        // Add additional translation to create parallax effect across background layers 
        this.context.translate(
            -activeCamera.transform.translation.x * parent.scrollSpeedMultiplier,
            -activeCamera.transform.translation.y * parent.scrollSpeedMultiplier
        );

        // Draw sprite
        this.context.drawImage(
            this.spriteSheet,
            this.sourcePosition.x,
            this.sourcePosition.y,
            this.sourceDimensions.x,
            this.sourceDimensions.y,
            transform.translation.x,
            transform.translation.y,
            transform.dimensions.x * transform.scale.x,
            transform.dimensions.y * transform.scale.y
        );

        // Add duplicate to left
        this.context.drawImage(
            this.spriteSheet,
            this.sourcePosition.x,
            this.sourcePosition.y,
            this.sourceDimensions.x,
            this.sourceDimensions.y,
            transform.translation.x - transform.dimensions.x,
            transform.translation.y,
            transform.dimensions.x * transform.scale.x,
            transform.dimensions.y * transform.scale.y
        );

        // Add duplicate to right
        this.context.drawImage(
            this.spriteSheet,
            this.sourcePosition.x,
            this.sourcePosition.y,
            this.sourceDimensions.x,
            this.sourceDimensions.y,
            transform.translation.x + transform.dimensions.x,
            transform.translation.y,
            transform.dimensions.x * transform.scale.x,
            transform.dimensions.y * transform.scale.y
        );

        this.context.restore();
    }

    equals(other) {
        return super.equals(other)
            && this.spriteSheet === other.spriteSheet
            && this.sourcePosition === other.sourcePosition
            && this.sourceDimensions === other.sourceDimensions;
    }

    clone() {
        return new ScrollingSpriteArtist(
            this.context,
            this.spriteSheet,
            this.alpha,
            this.sourcePosition.clone(),
            this.sourceDimensions.clone(),
            this.screenWidth,
            this.screenHeight,
        );
    }

    toString() {
        return "[" + 
            this.spriteSheet + "," + 
            this.sourcePosition + "," + 
            this.sourceDimensions + 
        "]";
    }
}