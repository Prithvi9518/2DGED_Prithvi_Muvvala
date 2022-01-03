class SlimeMoveController {

    constructor(
        moveVelocity,
        intervalBetweenInMs,
        moveDirection
    )
    {
        this.moveVelocity = moveVelocity;
        this.intervalBetweenInMs = intervalBetweenInMs;
        this.moveDirection = moveDirection;

        // Internal variables
        this.timeSinceLastMoveInMs = 0;

    }

    update(gameTime,parent)
    {
        // if enough time has passed since sprite last moved
        if(this.timeSinceLastMoveInMs >= this.intervalBetweenInMs)
        {
            let translateBy = Vector2.MultiplyScalar(this.moveVelocity, this.moveDirection);

            parent.transform.translateBy(translateBy);

            this.timeSinceLastMoveInMs = 0;
        }

        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }

    clone() {

        return new SlimeMoveController(
            this.moveVelocity,
            this.intervalBetweenInMs,
            this.moveDirection
        );

    }


}