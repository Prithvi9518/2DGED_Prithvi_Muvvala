/**
 * Stores all the transformations applied to a 2D element (e.g. a sprite, a menu button, a Camera2D)
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Transform2D
 */

class Transform2D {

    static get Zero() {
        return new Transform2D(Vector2.Zero, 0, Vector2.Zero);
    }

    get boundingBox() {

        // If this transform object has changed in any way, create an updated 
        // bounding box.
        
        // We set the isDirty flag to true each time a value is changed (this
        // is done in our setter functions). The isDirty flag indicates whether
        // a change has been applied to our transform. If the isDirty flag is
        // true, then we need to update our bounding box calculation. Once we
        // have updated our bounding box calculation, we set the isDirty flag
        // to false. As such, we should not need to re-calculate the bounding
        // box the next time this function is called (unless of course some
        // change has been applied to our transform, which would have set our
        // isDirty flag to true.
        
        // If this object is dirty
        if (this.isDirty) {

            // Create a new Rect object
            this._boundingBox = Rect.Zero;

            // Update the Rect object to match the position and size that is 
            // described by this transform

            // View the transform function of the Rect class to find out more
            // about how this works
            this._boundingBox.transform(this);

            // If an explode value has been set
            // Explode allows us to make our bounding box bigger or smaller
            // relative to the size of the sprite
            if (this.explodeBoundingBoxInPixels != 0) {

                // Explode our bounding box
                this._boundingBox.explode(this.explodeBoundingBoxInPixels);
            }

            // Reset isDirty flag
            this.isDirty = false;
        }

        // Return boundingBox
        return this._boundingBox;
    }

    get translation() {
        return this._translation;
    }
    get rotationInRadians() {
        return this._rotationInRadians;
    }
    get scale() {
        return this._scale;
    }
    get origin() {
        return this._origin;
    }
    get dimensions() {
        return this._dimensions;
    }
    get isDirty() {
        return this._isDirty;
    }

    set boundingBox(boundingBox) {
        this._boundingBox = boundingBox;
        this._isDirty = true;
    }
    set translation(translation) {
        this._translation = translation.clone();
        this.isDirty = true;
    }
    set rotationInRadians(rotationInRadians) {
        this._rotationInRadians = rotationInRadians;
        this.isDirty = true;
    }
    set scale(scale) {
        this._scale = scale.clone();
        this.isDirty = true;
    }
    set origin(origin) {
        this._origin = origin.clone();
        this.isDirty = true;
    }
    set dimensions(dimensions) {
        this._dimensions = dimensions.clone();
        this.isDirty = true;
    }
    set isDirty(isDirty) {
        this._isDirty = isDirty;
    }

    /**
     * Creates an instance of Transform2D.
     *
     * @param {Vector2} translation Vector2 with the position of the sprite on the screen
     * @param {number} rotationInRadians Floating-point angle in radians to rotate the sprite (+ve = CW, -ve=CCW)
     * @param {Vector2} scale Vector2 with the scale of the sprite on the screen
     * @param {Vector2} origin Vector2 centre of rotation for the image between (0,0) and (w,h) of the original image
     * @param {Vector2} dimensions Vector2 original dimensions of the sprite in the image 
     * @memberof Transform2D
     */
    constructor(translation, rotationInRadians, scale, origin, dimensions) {
        this.translation = translation;
        this.rotationInRadians = rotationInRadians;
        this.scale = scale;
        this.origin = origin;
        this.dimensions = dimensions;

        // Currently internal - will expose later
        this.explodeBoundingBoxInPixels = 0;

        // Entirely internal
        this.boundingBox = null;
        this.isDirty = true;
        
        // Used by the reset method
        this.originalTranslation = translation.clone();
        this.originalRotationInRadians = rotationInRadians;
        this.originalScale = scale.clone();
        this.originalOrigin = origin.clone();
        this.originalDimensions = dimensions.clone();
    }

    /**
     * Sets the translation of the sprite to a user-defined value. Sets the isDirty flag to
     * indicate to the CollisionPrimitive that the sprite has changed a property that will
     * affect its bounding primitive.
     *
     * @param {Vector2} translation
     * @memberof Transform2D
     */
    setTranslation(translation) {
        this.translation = translation.clone();
        this.isDirty = true;
    }

    /**
     * Increases/decreases the Vector2 translation of the sprite. We can use
     * this method to move the sprite on-screen. Sets the isDirty flag to indicate to the
     * CollisionPrimitive that the sprite has changed a property that will affect its bounding primitive.
     *
     * @param {Vector2} translateBy Vector2 value used to increment/decrement the translation.
     * @memberof Transform2D
     */
    translateBy(translateBy) {
        this.translation.add(translateBy);
        this.isDirty = true;
    }

    /**
     * Sets the rotation value (in radians) for the sprite.
     *
     * @param {number} rotationInRadians Floating-point rotation value in radians
     * @memberof Transform2D
     */
    setRotationInRadians(rotationInRadians) {
        this.rotationInRadians = rotationInRadians;
        this.isDirty = true;
    }

    /**
     * Increases/decreases the rotation value (in radians) for the sprite.
     *
     * @param {number} rotationInRadians Floating-point rotation value in radians
     * @memberof Transform2D
     */
    rotateBy(rotationInRadiansBy) {
        this.rotationInRadians += rotationInRadiansBy;
        this.isDirty = true;
    }

    /**
     * Sets the scale values for the sprite.
     *
     * @param {Vector2} scale Vector2 representing the scale (x,y) values
     * @memberof Transform2D
     */
    setScale(scale) {
        this.scale = scale.clone();
        this.isDirty = true;
    }

    /**
     * Increases/decreases the scale values for the sprite.
     *
     * @param {Vector2} scale Vector2 representing the scale (x,y) values
     * @memberof Transform2D
     */
    scaleBy(scaleBy) {
        this.scale.add(scaleBy);
        this.isDirty = true;
    }

    /**
     * Reset to original state
     */
    reset() {
        this.translation = this.originalTranslation.clone();
        this.rotationInRadians = this.originalRotationInRadians;
        this.scale = this.originalScale.clone();
        this.origin = this.originalOrigin.clone();
        this.dimensions = this.originalDimensions.clone();
    }

    equals(other) {
        return (
            GDUtility.IsSameTypeAsTarget(this, other) &&
            this.translation.equals(other.translation) &&
            this.rotationInRadians === other.rotationInRadians &&
            this.scale.equals(other.scale) &&
            this.origin.equals(other.origin) &&
            this.dimensions.equals(other.dimensions)
        );
    }

    clone() {
        return new Transform2D(
            this.translation.clone(),
            this.rotationInRadians,
            this.scale.clone(),
            this.origin.clone(),
            this.dimensions.clone()
        );
    }

    toString() {
        return (
            "[" +
            this.translation.toString() +
            "," +
            this.rotationInRadians +
            "," +
            this.scale.toString() +
            "," +
            this.origin.toString() +
            "," +
            this.dimensions.toString() +
            "]"
        );
    }
}