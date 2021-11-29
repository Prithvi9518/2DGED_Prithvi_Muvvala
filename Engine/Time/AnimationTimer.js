class AnimationTimer {

    constructor(duration, easingFunction) {
        this.easingFunction = easingFunction;

        if (duration !== undefined) {

            this.duration = duration;
        } 
        else {

            this.duration = 1000;
        } 

        this.stopwatch = new Stopwatch();
        this.percentComplete = 0;
    }

    start(gameTime) {
        this.stopwatch.start(gameTime);
    }

    stop(gameTime) {
        this.stopwatch.stop(gameTime);
    }

    pause(gameTime) {
        this.stopwatch.pause(gameTime);
    }

    unpause(gameTime) {
        this.stopwatch.unpause(gameTime);
    }

    isPaused() {
        return this.stopwatch.isPaused();
    }

    getElapsedTime(gameTime) {
        let elapsedTime = this.stopwatch.getElapsedTime(gameTime);

        this.percentComplete = elapsedTime / this.duration;
        
        if (this.easingFunction === undefined || this.percentComplete == 0 || this.percentComplete > 1) {
            return elapsedTime;
        }

        return elapsedTime * (this.easingFunction(this.percentComplete) / this.percentComplete);
    }

    isRunning() {
        return this.stopwatch.isRunning;
    }

    isExpired(gameTime) {
        return this.stopwatch.getElapsedTime(gameTime) > this.duration;
    }

    reset(gameTime) {
        this.stopwatch.reset(gameTime);
    }

    static MakeEaseOutEasingFunction(strength) {
        return function (percentComplete) {
            return  1 - Math.pow(1 - percentComplete, strength * 2);
        };
    }

    static MakeEaseInEasingFunction(strength) {
        return function (percentComplete) {
            return Math.pow(percentComplete, strength * 2);
        };
    }

    static MakeEaseOutInEasingFunction() {
        return function (percentComplete) {
            return percentComplete + Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI);
        };
    }

    static MakeEaseInOutEasingFunction() {
        return function (percentComplete) {
            return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI);
        };
    }

    static MakeLinearEasingFunction() {
        return function (percentComplete) {
            return percentComplete;
        };
    }
}