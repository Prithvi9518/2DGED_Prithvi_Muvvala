class SlimeMoveController {

    constructor(
        objectManager,
        moveVelocity,
        intervalBetweenInMs,
        moveDirection
    )
    {
        this.objectManager = objectManager;
        this.moveVelocity = moveVelocity;
        this.intervalBetweenInMs = intervalBetweenInMs;
        this.moveDirection = moveDirection;
        

        // Internal variables
        this.timeSinceLastMoveInMs = 0;

    }

    update(gameTime,parent)
    {
        this.followPlayer(parent);

        // if enough time has passed since sprite last moved
        if(this.timeSinceLastMoveInMs >= this.intervalBetweenInMs)
        {
            let translateBy = Vector2.MultiplyScalar(this.moveVelocity, this.moveDirection);

            parent.transform.translateBy(translateBy);

            this.timeSinceLastMoveInMs = 0;
        }

        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
        this.timeSinceLastInvert += gameTime.elapsedTimeInMs;

    }

    clone() {

        return new SlimeMoveController(
            this.moveVelocity,
            this.intervalBetweenInMs,
            this.moveDirection
        );

    }

    invertDirection() {
        this.moveDirection = -this.moveDirection;
    }

    followPlayer(parent)
    {
        let player = objectManager.get(ActorType.Player)[0];
        console.log(player);
        let difference = (player.transform.translation.x - parent.transform.translation.x);
        this.moveDirection = difference / Math.abs(difference);
    }


}