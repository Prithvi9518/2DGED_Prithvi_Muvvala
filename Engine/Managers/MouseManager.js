class MouseManager {

    get id() {
        return this._id;
    }
    get clickPosition() {
        return this._clickPosition;
    }

    set id(value) {
        this._id = value;
    }
    set clickPosition(value) {
        this._clickPosition = value;
    }

    constructor(id) {
        this.id = id;

        this.clickPosition = null;

        window.addEventListener("mousedown", (event) => {
            this.clickPosition = new Vector2(
                event.offsetX,
                event.offsetY
            );
        });

        window.addEventListener("mouseup", (event) => {
            this.clickPosition = null;
        });
    }
}