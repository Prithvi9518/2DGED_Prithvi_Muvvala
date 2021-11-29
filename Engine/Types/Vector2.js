/**
 * Represents a 2D vector within the game engine.
 * @author Niall McGuinness
 * @version 1.0
 * @class Vector2
 */
class Vector2 {

    static get Zero() {
        return new Vector2(0, 0);
    }
    static get One() {
        return new Vector2(1, 1);
    }
    static get UnitX() {
        return new Vector2(1, 0);
    }
    static get UnitY() {
        return new Vector2(0, 1);
    }

    static get Up() {
        return new Vector2(0, -1);
    }
    static get Down() {
        return new Vector2(0, 1);
    }
    static get Left() {
        return new Vector2(-1, 0);
    }
    static get Right() {
        return new Vector2(1, 0);
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get isDirty() {
        return this._isDirty;
    }

    set x(x) {
        this._x = x;
        this.isDirty = true;
    }
    set y(y) {
        this._y = y;
        this.isDirty = true;
    }
    set isDirty(isDirty) {
        this._isDirty = isDirty;
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.isDirty = true;
    }

    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    subtract(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
    }

    multiply(otherVector) {
        this.x *= otherVector.x;
        this.y *= otherVector.y;
    }

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
    }

    divide(otherVector) {
        this.x /= otherVector.x;
        this.y /= otherVector.y;
    }

    divideScalar(s) {
        if (s !== 0) {
            this.x /= s;
            this.y /= s;
        }
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y;
    }

    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    angleInRadiansBetween(otherVector) {
        return Math.acos(
            this.dot(otherVector) / (this.length() * otherVector.length())
        );
    }

    distance(otherVector) {
        return Math.sqrt(
            Math.pow(this.x - otherVector.x, 2) + Math.pow(this.y - otherVector.y, 2)
        );
    }

    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    }

    round(precision) {
        this.x = GDMath.ToFixed(this.x, precision, 10);
        this.y = GDMath.ToFixed(this.y, precision, 10);
    }

    normalize() {
        let len = this.length();

        if (len == 0) {
            throw "Error: Divide by zero error on Normalize()! Is the vector non-zero?";
        }

        this.x /= len;
        this.y /= len;
    }

    equals(otherVector) {
        return (
            GDUtility.IsSameTypeAsTarget(this, otherVector) &&
            this.x === otherVector.x &&
            this.y === otherVector.y
        );
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    toString() {
        return "[" + this.x + "," + this.y + "]";
    }

    static Add(vector1, vector2) {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static Subtract(vector1, vector2) {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static Multiply(vector1, vector2) {
        return new Vector2(vector1.x * vector2.x, vector1.y * vector2.y);
    }

    static MultiplyScalar(vector, scalar) {
        return new Vector2(vector.x * scalar, vector.y * scalar);
    }

    static Divide(vector1, vector2) {
        if (vector2.x == 0 || vector2.y == 0) throw "Error: Cannot divide by zero!";

        return new Vector2(vector1.x / vector2.x, vector1.y / vector2.y);
    }

    static DivideScalar(vector, scalar) {
        if (scalar == 0) throw "Error: Cannot divide by zero!";

        return new Vector2(vector.x / scalar, vector.y / scalar);
    }

    static Normalize(vector) {
        let len = vector.length();

        if (len == 0) {
            throw "Error: Divide by zero error on Normalize()! Is the vector non-zero?";
        }

        return new Vector2(vector.x / len, vector.y / len);
    }

    static Distance(vector1, vector2) {
        return vector1.distance(vector2);
    }

    static Abs(vector) {
        return new Vector2(Math.abs(vector.x), Math.abs(vector.y));
    }

    static Transform(vector, matrix) {
        let x = vector.x * matrix.a11 + vector.y * matrix.a21 + matrix.a31;
        let y = vector.x * matrix.a12 + vector.y * matrix.a22 + matrix.a32;
        return new Vector2(x, y);
    }

    static Round(vector, precision) {
        return new Vector2(
            GDMath.ToFixed(vector.x, precision, 10),
            GDMath.ToFixed(vector.y, precision, 10)
        );
    }
}