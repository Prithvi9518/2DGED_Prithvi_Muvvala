/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in the 
 * current cell index of an array of cells.
 * 
 * The array of cells indicate the (x, y, width, height) data for each cell in the animation.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class AnimatedSpriteArtist
 */
class AnimatedSpriteArtist extends Artist {

    get frameRatePerSec() {
        return this._frameRatePerSec;
    }

    set frameRatePerSec(framesPerSecond) {
        this._frameRatePerSec = framesPerSecond;

        // Imagine that we are running at 2 frames per second
        // The below equation would be evaluated as 500 (1000 / 2 = 500)
        this.frameIntervalInMs = Math.ceil(1000 / framesPerSecond);

        // Why is this important?
        // Well, 2 frames per second is equal to 1 frame every half second
        // And since 1 second equals 1000 ms, then one half second must equal 500 ms
        // So what we have calculated is the amount of time between each frame (500 ms)
        // i.e. the frameInterval

        // If we scale this up to picture a scenario where we're running at 60fps
        // Then the amount of time between each frame would be 1000 / 60 or ~16ms

        // The frame interval is used to determine how much time is between each frame
        // so that we can update our animation accordingly
    }

    /**
     *  Constructs an artist which will cycle through (animate) a set of image frames
     *
     * @param {CanvasRenderingContext2D} context Handle to the canvas' context
     * @param {Image} spriteSheet Image containing frames for the animation
     * @param {Array} frames Array of frames (see GameConstants) defining the animation sequence
     * @param {Number} startFrameIndex Zero-based index of first animation frame in the sequence
     * @param {Number} endFrameIndex Zero-based index of last animation frame in the sequence
     * @param {Number} frameRatePerSec Integer number of frames to play per second
     */
    constructor(
        context,
        spriteSheet,
        alpha,
        frames,
        startFrameIndex,
        endFrameIndex,
        frameRatePerSec
    ) {
        super(context, spriteSheet, alpha);

        this.frames = frames;
        this.startFrameIndex = startFrameIndex;
        this.endFrameIndex = endFrameIndex;

        this.frameRatePerSec = frameRatePerSec;

        // Internal variables
        this.frameIntervalInMs = Math.ceil(1000 / frameRatePerSec);

        this.currentFrameIndex = 0;
        this.timeSinceLastFrameInMs = 0;
    }

    /**
     * Advances animation to the next frame based on elapsed time since last frame
     *
     * @param {GameTime} gameTime
     * @param {Sprite} parent Sprite that this Artist is attached to
     * 
     * @memberof AnimatedSpriteArtist
     */
    update(gameTime, parent) {

        // Calculate time since last frame
        this.timeSinceLastFrameInMs += Math.round(gameTime.elapsedTimeInMs);

        // Check if time since last frame exceeds the frame interval for this sprite
        // i.e., check if we should move onto the next frame of the animation because
        // enough time has passed between frames
        if (this.timeSinceLastFrameInMs > this.frameIntervalInMs) {

            // Advance sprite to the next frame
            this.advance();

            // Reset time since last frame
            this.timeSinceLastFrameInMs = 0;
        }
    }

    /**
     * Increments the current cell index and wraps if > length
     *
     * @memberof AnimatedSpriteArtist
     */
    advance() {

        // If not at the end frame, then advance frame by 1
        if (this.currentFrameIndex < this.endFrameIndex) {

            this.currentFrameIndex++;
        }

        // If at the end frame, loop back to the start frame
        else {

            this.currentFrameIndex = this.startFrameIndex;
        }
    }

    /**
     * Renders pixel data from spritesheet to canvas on a frame by frame basis
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent Sprite that this Artist is attached to
     * 
     * @memberof AnimatedSpriteArtist
     */
    draw(gameTime, parent, activeCamera) {

        // Save whatever context settings were used before this (color, line, text styles)
        this.context.save();

        // Apply the camera transformations to the scene 
        // (i.e. to enable camera zoom, pan, rotate)
        activeCamera.setContext(this.context);

        // Access the transform for the parent that this artist is attached to
        let transform = parent.transform;

        // Set transparency
        this.context.globalAlpha = this.alpha;

        // Retrieve the current animation frame
        let frame = this.frames[this.currentFrameIndex];

        // Draw current animation frame
        this.context.drawImage(
            this.spriteSheet,
            frame.x,                // What is x/y?
            frame.y,
            frame.width,            // What is width/height?
            frame.height,
            transform.translation.x - transform.origin.x,
            transform.translation.y - transform.origin.y,
            transform.dimensions.x * transform.scale.x,
            transform.dimensions.y * transform.scale.y
        );

        // Restor context to previous state
        this.context.restore();
    }

    clone() {
        return new AnimatedSpriteArtist(

            // Shallow Copy
            this.context,
            this.spriteSheet,
            this.alpha,
            this.frames,

            // Deep Copy
            this.startFrameIndex,
            this.endFrameIndex,
            this.frameRatePerSec
        );
    }
}