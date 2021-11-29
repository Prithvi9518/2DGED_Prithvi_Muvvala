class GameTime {

    get startTimeInMs() {
        return this._startTimeInMs;
    }
    get totalElapsedTimeInMs() {
        return this._totalElapsedTimeInMs;
    }
    get lastAnimationFrameTime() {
        return this._lastAnimationFrameTime;
    }
    get elapsedTimeInMs() {
        return this._elapsedTimeInMs;
    }

    set startTimeInMs(value) {
        this._startTimeInMs = value;
    }
    set totalElapsedTimeInMs(value) {
        this._elapsedTimeInMs = value;
    }
    set lastAnimationFrameTime(value) {
        this._lastAnimationFrameTime = value;
    }
    set elapsedTimeInMs(value) {
        this._elapsedTimeInMs = value;
    }
    
    constructor() {
        
        // What time the game was started (in ms)
        this.startTimeInMs = 0;

        // The time since the game was started (in ms)
        this.totalElapsedTimeInMs = 0;

        // What time the last frame took place (in ms)
        this.lastAnimationFrameTime = 0;

        // The amount of time since the last frame occured (in ms)
        this.elapsedTimeInMs = 0;

    }

    update(now) {

        // Set the start time if not already set
        if (!this.startTimeInMs) {
            this.startTimeInMs = now;
        }

        // Calculate total time since the game was started
        this.totalElapsedTimeInMs = now - this.startTimeInMs;

        // Calculate the time since last animation frame
        // Typically 16ms, 14ms, 8ms, etc.
        this.elapsedTimeInMs = now - this.lastAnimationFrameTime;

        // Update last frame time
        // Allows us to keep track of when the last frame took place
        this.lastAnimationFrameTime = now;
    }
}