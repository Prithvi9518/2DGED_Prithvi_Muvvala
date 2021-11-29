class PlayerMoveController {

    constructor(keyboardManager, moveSpeed) {
        this.keyboardManager = keyboardManager;
        this.moveSpeed = moveSpeed;
    }

    update(gameTime, parent) {
        
        // If the A key is pressed
        if (this.keyboardManager.isKeyDown(Keys.A)) {
            
            // Move left
            parent.transform.translateBy(
                Vector2.MultiplyScalar(Vector2.Left, gameTime.elapsedTimeInMs * this.moveSpeed)
            );
        }

        // If the D key is pressed
        else if (this.keyboardManager.isKeyDown(Keys.D)) {

            // Move right
            parent.transform.translateBy(
                Vector2.MultiplyScalar(Vector2.Right, gameTime.elapsedTimeInMs * this.moveSpeed)
            );
        }
    }
}