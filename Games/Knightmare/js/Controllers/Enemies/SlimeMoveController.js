class SlimeMoveController {

    constructor(
        objectManager,
        moveVelocity,
        intervalBetweenInMs
    )
    {
        this.objectManager = objectManager;
        this.moveVelocity = moveVelocity;
        this.intervalBetweenInMs = intervalBetweenInMs;
        

        // Internal variables
        this.moveDirection = 1;
        this.timeSinceLastMoveInMs = 0;

    }

    update(gameTime,parent)
    {
        this.followPlayer(parent);

        // if enough time has passed since sprite last moved, move the sprite again
        if(this.timeSinceLastMoveInMs >= this.intervalBetweenInMs)
        {
            let translateBy = Vector2.MultiplyScalar(this.moveVelocity, this.moveDirection);

            parent.transform.translateBy(translateBy);

            this.timeSinceLastMoveInMs = 0;
        }

        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }

    followPlayer(parent)
    {
        let player = objectManager.get(ActorType.Player)[0];

        if(player.statusType == StatusType.Off)
        {
            this.moveDirection = 0;
        }

        // Calculate the different between the positions of player and enemy in x-axis.
        // Divide the difference by its magnitude to get a result of either -1 or 1, and assign this value to moveDirection variable
        let difference = (player.transform.translation.x - parent.transform.translation.x);
        this.moveDirection = difference / Math.abs(difference);
    }


}