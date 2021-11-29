
/**
 * Moves the parent sprite over and back, then down the screen for Space Invaders game.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class CycleMoveDescendController
 */
class CycleMoveDescendController {

    /**
     * 
     * @param {*} moveVector 
     * @param {*} maxMoveIncrements 
     * @param {*} intervalBetweenInMs 
     * @param {*} descendVector 
     */
    constructor(moveVector, maxMoveIncrements, intervalBetweenInMs, descendVector) {
        this.moveVector = moveVector;
        this.maxMoveIncrements = maxMoveIncrements;
        this.intervalBetweenInMs = intervalBetweenInMs;
        this.descendVector = descendVector;

        // Internal variables
        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
        this.moveDirection = 1;
    }

    /**
     * 
     * @param {*} gameTime 
     * @param {*} parent 
     */
    update(gameTime, parent) {

        // If enough time has passed since the sprite last moved
        if (this.timeSinceLastMoveInMs >= this.intervalBetweenInMs) {

            // If the sprite has not reached the edge of the screen
            if (this.currentMoveIncrement <= this.maxMoveIncrements) {

                // Calculate movement vector
                let translateBy = Vector2.MultiplyScalar(
                    this.moveVector,
                    this.moveDirection
                );

                // Move sprite
                parent.transform.translateBy(translateBy);

                // Reset time
                this.timeSinceLastMoveInMs = 0;
            }

            // Otherwise
            else {

                // Invert move direction
                this.moveDirection *= -1;

                // Move sprite down
                parent.transform.translateBy(this.descendVector);

                // Reset move increment
                this.currentMoveIncrement = 0;

                // Reduce time to account for downwards movement
                this.timeSinceLastMoveInMs = -this.intervalBetweenInMs;
            }

            // Increase move incremenets
            this.currentMoveIncrement++;
        }

        // Increase time based on gameTime
        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new CycleMoveDescendController(
            this.moveVector,
            this.maxMoveIncrements,
            this.intervalBetweenInMs,
            this.descendVector
        );
    }
};
