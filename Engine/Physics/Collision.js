/**
 * Provides functions relating to CD/CR
 * @author
 * @version 1.0
 * @class Collision
 */
const CollisionLocationType = {
    Top: 0,
    Right: 1,
    Bottom: 2,
    Left: 3
};

class Collision {

    // Used to determine on what side we collides with spriteB - normally only used for platforms
    static GetCollisionLocationType(spriteA, spriteB) {

        let boundingBoxA = new Rect(
            spriteA.transform.boundingBox.x + spriteA.body.velocityX,
            spriteA.transform.boundingBox.y + spriteA.body.velocityY,
            spriteA.transform.boundingBox.width,
            spriteA.transform.boundingBox.height
        );

        let boundingBoxB = spriteB.transform.boundingBox;

        // Get the vectors to check against
        let vX = boundingBoxA.center.x - boundingBoxB.center.x;
        let vY = boundingBoxA.center.y - boundingBoxB.center.y;

        // Add the half widths and half heights of the objects
        let hWidths = (boundingBoxA.width + boundingBoxB.width) / 2;
        let hHeights = (boundingBoxA.height + boundingBoxB.height) / 2;

        let collisionLocationType = null;

        // If the x and y vector are less than the half width or half height, 
        // they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {

            // Figures out on which side we are colliding (top, bottom, left, or right)
            let oX = Math.ceil(hWidths - Math.abs(vX));
            let oY = Math.ceil(hHeights - Math.abs(vY));

            if (oX >= oY) {

                if (vY > 0) {
                    collisionLocationType = CollisionLocationType.Top;
                } else {
                    collisionLocationType = CollisionLocationType.Bottom;
                }
            } else {
                
                if (vX > 0) {
                    collisionLocationType = CollisionLocationType.Left;
                } else {
                    collisionLocationType = CollisionLocationType.Right;
                }
            }
        }

        return collisionLocationType;
    }
}