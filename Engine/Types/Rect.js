/**
 * Represents a 2D rectangle (x, y, width, height) which is typically used for collision detection/collision response.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Rect
 */
class Rect {

    static get Zero() {
        return new Rect(0, 0, 1, 1);
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }

    get center() {
        return new Vector2(
            this.x + this.width / 2,
            this.y + this.height / 2
        );
    }

    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    set width(value) {
        this._width = value > 0 ? value : 0;
    }
    set height(value) {
        this._height = value > 0 ? value : 0;
    }

    /**
     * Constructs a Rect object (x,y,w,h)
     * @param {Number} x X-ordinate of the top-left corner of the Rect object
     * @param {Number} y Y-ordinate of the top-left corner of the Rect object
     * @param {Number} width Width in pixels of the Rect object
     * @param {Number} height Height in pixels of the Rect object
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // If we ever change the Rect object (e.g. x, y, w, h) then we may want 
        // to reset it to its original state. So, we store its original values.
        this.originalX = x;
        this.originalY = y;
        this.originalWidth = width;
        this.originalHeight = height;
    }

    /**
     * Resets the Rect object to its original state (x,y,w,h)
     *
     * @memberof Rect
     */
    reset() {
        this.x = this.originalX;
        this.y = this.originalY;

        this.width = this.originalWidth;
        this.height = this.originalHeight;
    }

    /**
     * Move this rect by some distance on the x and y, as
     * defined by x, y
     * 
     * @param {number} x
     * @param {number} y 
     */
    moveBy(x, y) {
        this.x += x;
        this.y += y;
    }

    /**
     * Move this rect by some distance on the x and y, as
     * defined by delta
     * 
     * For example, if delta is the Vector (2, 2), the we 
     * will move this rect by 2 pixels in the x axis, and 
     * 2 pixels in the y axis
     * 
     * @param {Vector2} delta 
     */
    moveByDelta(delta) {
        this.x += delta.x;
        this.y += delta.y;
    }

    /**
     * Move this rect to the x, y position on our cavnas
     * that is defined by the input parameters x, y
     * 
     * @param {number} x
     * @param {number} y 
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Move this rect to the x, y position on our cavnas
     * that is defined by the input Vector 'position'
     * 
     * @param {Vector2} position 
     */
    moveToPosition(position) {
        this.x = position.x;
        this.y = position.y;
    }

    /**
     * Sets the position and size of this Rect object to the
     * position and size of the provided transform
     * 
     * @param {Transform2D} transform 
     */
    transform(transform) {
        this.x = transform.translation.x;
        this.y = transform.translation.y;
        this.width = transform.scale.x * transform.dimensions.x;
        this.height = transform.scale.y * transform.dimensions.y;
    }

    /**
     * Make this Rect object larger or smaller by the provided 
     * explodeBy value. Note that explodeBy is measured in pixels.
     * 
     * @param {number} explodeBy 
     */
    explode(explodeBy) {

        // Check if explode value invalid 
        if (explodeBy % 2 != 0) {

            throw "Error: Explode value must be an even number since we explode (i.e. expand or contract) the rectangle evenly on all sides";
        }

        let explodeHalf = explodeBy / 2;

        this.x -= explodeHalf;
        this.y -= explodeHalf;
        this.width += explodeBy;
        this.height += explodeBy;

        // Check if valid value supplied
        if (this.width < 0 || this.height < 0) {

            throw "Error: Rectangle cannot have negative width or height";
        }
    }


    /**
     * Check if otherRect is contained within this Rect.
     * Useful for checking if items (such as bullets) are currently on screen.
     * 
     * @param {Rect} otherRect 
     * @returns true if otherRect is contained within this Rect.
     */
    contains(otherRect) {
        let enclosingRect = this.getEnclosingRect(otherRect);

        return (
            enclosingRect.width == Math.max(this.width, otherRect.width) &&
            enclosingRect.height == Math.max(this.height, otherRect.height)
        );
    }

    /**
     * Check if otherRect is intersecting this Rect.
     * Useful for checking collision between two Rect objects.
     * 
     * @param {Rect} otherRect 
     * @returns true if otherRect is currently intersecting this Rect. 
     */
    intersects(otherRect) {
        let enclosingRect = this.getEnclosingRect(otherRect);

        return (
            enclosingRect.width <= this.width + otherRect.width &&
            enclosingRect.height <= this.height + otherRect.height
        );
    }

    /**
     * Returns a new rect which encloses both this Rect and otherRect.
     * 
     * @param {Rect} otherRect 
     * @returns a new rect which encloses both this Rect and otherRect.
     */
    getEnclosingRect(otherRect) {
        if (
            otherRect == null ||
            otherRect == undefined ||
            !otherRect instanceof Rect
        ) {
            throw (
                "Error: One or more objects is null, undefined, or not type " +
                this.constructor.name
            );
        }

        let minX = Math.min(this.x, otherRect.x);
        let minY = Math.min(this.y, otherRect.y);

        let width = Math.max(this.x + this.width, otherRect.x + otherRect.width) - minX;
        let height = Math.max(this.y + this.height, otherRect.y + otherRect.height) - minY;

        return new Rect(minX, minY, width, height);
    }

    /**
     * Draw this rect to the canvas
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} lineWidth 
     * @param {String} strokeStyle 
     */
    draw(context, lineWidth, strokeStyle = null, fillStyle = null) {

        context.lineWidth = lineWidth;

        // If a stroke style has been provided
        // Then add a stroke to the rect
        if (strokeStyle !== null) {
            context.strokeStyle = strokeStyle;

            context.strokeRect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        // If a fill style has been provided
        // Then add fill to the rect
        if (fillStyle !== null) {
            context.fillStyle = fillStyle;

            context.fillRect(
                this.x,
                this.y,
                this.width,
                this.height,
            );
        }
    }

    equals(otherRect) {
        return (
            GDUtility.IsSameTypeAsTarget(this, otherRect) &&
            this.x === otherRect.x &&
            this.y === otherRect.y &&
            this.width === otherRect.width &&
            this.height === otherRect.height
        );
    }

    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }

    toString() {
        return (
            "[" + this.x + "," + this.y + "," + this.width + "," + this.height + "]"
        );
    }

    static Contains(rect1, rect2) {
        if (rect1 == null || rect1 == undefined || !rect1 instanceof Rect)
            throw (
                "Error: One or more objects is null, undefined, or not type " +
                rect1.constructor.name
            );

        return rect1.contains(rect2);
    }

    static Intersects(rect1, rect2) {
        if (rect1 == null || rect1 == undefined || !rect1 instanceof Rect)
            throw (
                "Error: One or more objects is null, undefined, or not type " +
                rect1.constructor.name
            );

        return rect1.intersects(rect2);
    }

    static GetEnclosingRect(rect1, rect2) {
        if (rect1 == null || rect1 == undefined || !rect1 instanceof Rect)
            throw (
                "Error: One or more objects is null, undefined, or not type " +
                rect1.constructor.name
            );

        return rect1.getEnclosingRect(rect2);
    }

    static Move(rect, vector) {
        let clone = rect.clone();

        clone.move(vector);

        return clone;
    }

    static Round(rect, precision) {
        return new Rect(
            GDMath.ToFixed(rect.x, precision, 10),
            GDMath.ToFixed(rect.y, precision, 10),
            GDMath.ToFixed(rect.width, precision, 10),
            GDMath.ToFixed(rect.height, precision, 10)
        );
    }
}
