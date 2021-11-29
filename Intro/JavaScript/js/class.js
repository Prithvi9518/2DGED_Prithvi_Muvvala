class Rectangle {

    constructor(width, height, x, y) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }

    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    set height(height) {
        this._height = height;
    }
    set width(width) {
        this._width = width;
    }   
    set x(x) {
        this._x = (x > 0) ? x : 0;
    }
    set y(y) {
        this._y = (y > 0) ? y : 0;
    }

    area() {
        return this._width * this._height;
    }

    clone() {
        return new Rectangle(this.width, this.height, this.x, this.y);
    }
}
