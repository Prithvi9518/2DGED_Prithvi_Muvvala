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

    get animationData() {
        return this._animationData;
    }
    get frameRatePerSec() {
        return this._frameRatePerSec;
    }
    get fixedPosition() {
        return this._fixedPosition;
    }

    set animationData(animationData) {
        this._animationData = animationData;
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
    set fixedPosition(fixedPosition) {
        this._fixedPosition = fixedPosition;
    }

    /**
     *  Constructs an artist which will cycle through (animate) a set of image frames
     *
     * @param {CanvasRenderingContext2D} context Handle to the canvas' context
     * @param {Array} frames Array of frames (see GameConstants) defining the animation sequence
     * @param {Array} animationData
     * @param {boolean} fixedPosition Boolean representing whether this sprite is fixed in place
     */
    constructor(context, alpha, animationData, fixedPosition = false) {
        super(context, alpha);

        this.animationData = animationData;
        this.fixedPosition = fixedPosition;

        this.frameRatePerSec = 0;
        this.frameIntervalInMs = 0;

        this.frames = [];
        this.startFrameIndex = 0;
        this.endFrameIndex = 0;
        this.currentFrameIndex = 0;
        this.currentTakeName = "";
    }

    /**
     * 
     * @param {string} takeName 
     */
    setTake(takeName) {

        // If the take exists
        if (this.animationData.takes[takeName]) {

            // If the take isn't already our current take
            if (takeName != this.currentTakeName) {

                // Retrieve the take
                let take = this.animationData.takes[takeName];

                // Update our internal variables based on the values 
                // contained within 'take'. This allows us to 'play' 
                // the current take.

                // Essentially, we are just changing the values of
                // this object which control what take is played, to
                // match the values of the take that was provided to
                // this function

                // We set this.frames equal to the take's frame
                // We set this.frameRatePerSec equal to the take's
                // frameRatePerSec etc, etc.

                // This allows us to create a flexible sprite artist
                // class, which can play several different animations
                // (based on what take is currently set), rather than
                // just one animation (which was previously passed to
                // the class as an argument)

                this.currentTakeName = takeName;

                this.timeSinceLastFrameInMs = 0;

                this.frameRatePerSec = take.frameRatePerSec;
                this.frameIntervalInMs = 1000.0 / this.frameRatePerSec;

                this.frames = take.frames;

                this.startFrameIndex = take.startFrameIndex;
                this.endFrameIndex = take.endFrameIndex;

                this.maxLoopCount = take.maxLoopCount;

                this.currentFrameIndex = this.startFrameIndex;
            }
        }

        // Otherwise
        else {

            // Throw error
            throw takeName + " does not exist!";
        }
    }

    // To access the current take of the arist
    getCurrentTake()
    {
        return this.currentTakeName;
    }

    getBoundingBoxByTakeName(takeName) {

        // If the take exists
        if (this.animationData.takes[takeName]) {

            // Return the take's bounding box dimensions
            return this.animationData.takes[takeName].boundingBoxDimensions;
        }

        // Otherwise
        else {

            // Throw error
            throw takeName + " does not exist!";
        }
    }


    /**
     * Pauses animation
     *
     * @memberof AnimatedSpriteArtist
     */
    pause() {

        this.paused = true;
    }

    /**
     * Unpauses animation
     *
     * @memberof AnimatedSpriteArtist
     */
    unpause() {

        this.paused = false;
    }

    /**
     * Resets animation
     *
     * @memberof AnimatedSpriteArtist
     */
    reset() {

        // Reset variables
        this.paused = false;
        this.currentCellIndex = this.startCellIndex;
        this.timeSinceLastFrameInMs = 0;
        this.currentTakeIndex = -1;
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

        // If paused, exit function
        if (this.paused) return;

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

            // TO DO: Modify this class to handle 0 loops, N loops, or infinite looping ...
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

        // If the position of this sprite is not fixed in place
        if (!this.fixedPosition) {
        
            // Apply the camera transformations to the scene 
            // (i.e. to enable camera zoom, pan, rotate)
            activeCamera.setContext(this.context);
        }

        // Access the transform for the parent that this artist is attached to
        let transform = parent.transform;

        // Set transparency
        this.context.globalAlpha = this.alpha;

        // Retrieve the current animation frame
        let frame = this.frames[this.currentFrameIndex];

        // Draw current animation frame
        this.context.drawImage(
            this.animationData.spriteSheet,
            frame.x,
            frame.y,
            frame.width,
            frame.height,
            transform.translation.x - transform.origin.x,
            transform.translation.y - transform.origin.y,
            frame.width * transform.scale.x,
            frame.height * transform.scale.y
        );

        // Restore context to previous state
        this.context.restore();
    }

    clone() {
        return new AnimatedSpriteArtist(
            this.context,
            this.alpha,
            this.animationData,
            this.fixedPosition
        );
    }
}