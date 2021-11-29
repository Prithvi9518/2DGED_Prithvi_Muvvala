/**
 * Like the real thing, you can start and stop a stopwatch, and you can find out the elapsed time the stopwatch has been running. After you stop
 * a stopwatch, it's GetElapsedTime() method returns the elapsed time between the start and stop.
 * @author
 * @version 1.0
 * @class Stopwatch
 */
class Stopwatch {

    constuctor() {
        this.startTime = 0;
        this.running = false;
        this.elapsed = undefined;

        this.paused = false;
        this.startPause = 0;
        this.totalPausedTime = 0;
    }

    get running() {
        return this._running;
    }
    get paused() {
        return this._paused;
    }

    start(gameTime) {
        this.startTime = gameTime ? gameTime.TotalElapsedTimeInMs : +new Date();
        this.elapsedTime = undefined;
        
        this.running = true;
        this.totalPausedTime = 0;
        this.startPause = 0;
    }

    stop(gameTime) {
        if (this.paused) {
            this.unpause();
        }

        this.elapsed = (gameTime ? gameTime.TotalElapsedTimeInMs : +new Date()) - this.startTime - this.totalPausedTime;
        this.running = false;
    }

    pause(gameTime) {
        if (this.paused) {
            return;
        }

        this.startPause = gameTime ? gameTime.totalElapsedTimeInMs : +new Date();
        this.paused = true;
    }

    unpause(gameTime) {
        if (!this.paused) {
            return;
        }

        this.totalPausedTime += (gameTime ? gameTime.totalElapsedTimeInMs : +new Date()) - this.startPause;
        this.startPause = 0;
        this.paused = false;
    }

    getElapsedTime(gameTime) {
        if (this.running) {
            return (gameTime ? gameTime.totalElapsedTimeInMs : +new Date()) - this.startTime - this.totalPausedTime;
        } else {
            return this.elapsed;
        }
    }

    reset(gameTime) {
        this.elapsed = 0;
        this.startTime = gameTime ? gameTime.totalElapsedTimeInMs : +new Date();
        this.elapsedTime = undefined;
        this.running = false;
    }
};