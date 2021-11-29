/**
 * Primitive to support drawing rectangles
 */
 class Rect {

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get position() {
        return this._position;
    }

    set width(value) {
        this._width = value > 0 ? value : 0;
    }
    set height(value) {
        this._height = value > 0 ? value : 0;
    }
    set position(value) {
        this._position = value;
    }

    constructor(width, height, position) {
        this._width = width;
        this._height = height;
        this._position = position;
    }

    draw(context, lineWidth, strokeStyle) {

        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        
        context.strokeRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    clone() {
        return new Rect(this.width, this.height, this.position);
    }
}