/**
 * Represents a pair of numeric values
 */
class Vector2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    
    set x(value) {
        this._x = (value > 0) ? value : 0;
    }
    set y(value) {
        this._y = (value > 0) ? value : 0;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}