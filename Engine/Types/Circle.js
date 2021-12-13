/**
 * Represents a 2D circle (center, radius) which is typically used for collision detection/collision response.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Circle
 */
class Circle {

    static get One() {
        return new Circle(0, 0, 1);
    }
    static get Zero() {
        return new Circle(0, 0, 0);
    }

    get center() {
        return this._center;
    }
    get radius() {
        return this._radius;
    }
    set center(value) {
        this._center = value;
    }
    set radius(value) {
        this._radius = value;
    }

    constructor(center, radius) {
        this.center = center;
        this.radius = radius;

        this.originalRadius = radius;
        this.originalCenter = center.clone();
    }

    reset() {
        this.center = this.originalCenter.clone();
        this.radius = this.originalRadius;
    }

    move(vector) {
        this.center.x += vector.x;
        this.center.y += vector.y;
    }

    move(x, y) {
        this.center.x += x;
        this.center.y += y;
    }

    /**
    *  Used to re-position or re-dimension the Circle object based on the translation, scale, and dimensions 
    *  provided in the Transform2D. This method will most often be used to re-calculate the position of the 
    *  bounding circle for a sprite that is being transformed (e.g. translate, scale, dimension). Note that 
    *  the benefit of a bounding circle is that it is invariant to rotation, unlike a bounding rectangle.
    *
    * @param {*} transform
    * @memberof Circle
    */
    transform(transform) {

        this.radius = Math.round(
            this.originalRadius * transform.scale.Length() * transform.dimensions.x
        );

        this.center.x = transform.origin.x;
        this.center.y = transform.origin.y;
    }

    explode(explodeBy) {

        if (this.radius + explodeBy < 0) {

            throw "Error: Circle cannot have negative radius";
        }

        this.radius += explodeBy;
    }

    contains(other) {

        let max = Math.max(this.radius, other.radius);
        let min = Math.min(this.radius, other.radius);

        return Vector2.Distance(this.center, other.center) + min < max;
    }

    intersects(other) {

        return (Vector2.Distance(this.center, other.center) < this.radius + other.radius);
    }

    equals(other) {

        // If we get here then we have two valid (i.e. non-null, defined, correct type) 
        // and distinct (i.e. separate RAM) objects that we need to test
        return (
            GDUtility.IsSameTypeAsTarget(this, other)
            && this.center.equals(other.center)
            && this.radius === other.radius
        );
    }

    clone() {

        return new Circle(
            new Vector2(this.center.x, this.center.y),
            this.radius
        );
    }

    toString() {

        return ("[" + this.center.toString() + "," + this.radius + "]");
    }

    static Contains(a, b) {

        if (a == null || a == undefined || !a instanceof Rect) {

            throw "Error: One or more objects is null, undefined, or not type " + a.constructor.name;
        }

        return a.contains(b);
    }

    static Intersects(a, b) {

        if (a == null || a == undefined || !a instanceof Rect) {

            throw "Error: One or more objects is null, undefined, or not type " + a.constructor.name;
        }

        return a.intersects(b);
    }

    static Explode(circle, explodeBy) {

        let clone = circle.clone();

        clone.explode(explodeBy);

        return clone;
    }

    static Transform(circle, transform) {

        let clone = circle.clone();

        clone.transform(transform);

        return clone;
    }
}