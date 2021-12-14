/**
 * Provides functions relating to CD/CR
 * 
 * @author Niall McGuinnesss
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

    static count = 0;
    // Used to determine on what side spriteA has collided with spriteB
    // Typically only used for collision with geometry
    static GetCollisionLocationType(spriteA, spriteB) {
        
        let collisionLocationType = null;

        // Calculate the bounding boverlapX of sprite A
        let boundingBoxA = new Rect(
            spriteA.transform.boundingBox.x + spriteA.body.velocityX,
            spriteA.transform.boundingBox.y + spriteA.body.velocityY,
            spriteA.transform.boundingBox.width,
            spriteA.transform.boundingBox.height
        );

        // Retrieve the bounding boverlapX of sprite B
        let boundingBoxB = spriteB.transform.boundingBox;

        // Calculate the distance between each object, based on the center
        // point of their bounding boverlapX.

        let distX = Math.round(boundingBoxA.center.x - boundingBoxB.center.x);
        let distY = Math.round(boundingBoxA.center.y - boundingBoxB.center.y);

        // Create an overall bounding boverlapX which surrounds both objects. Then,
        // calcaulte half the width and half the height of that bounding boverlapX.

        let hWidth = (boundingBoxA.width + boundingBoxB.width) / 2;
        let hHeight = (boundingBoxA.height + boundingBoxB.height) / 2;

        // If the x distance between the two objects is less than half the width 
        // of the overall bounding boverlapX, and if the y distance between the two
        // objects is less than half the height of the overall bounding boverlapX, 
        // then a collision must have taken place.

        if (Math.abs(distX) <= hWidth && Math.abs(distY) <= hHeight) {

            // Calculate the delta between where the center point of the two objects
            // was, compared to the distance between them. 
            
            // Consider the below diagram. Two objects which each have a width of 6, 
            // and a height of 3, are colliding on the horizontal plane. Their overall 
            // bounding box has a width of 10, and a height of 3. The x distance between 
            // these two objects is 6, and the y distance between these two objects is 0. 
            // In this case, hWidth would equal 5, hHeight would equal 1.5, distX would
            // equal 6, and distY would equal 0.

            //           5 (hwidth)
            //  - - - - - - - - - - 
            // |       |   |       |
            // |    - -|- -|- -    | 3 (hHeight)
            // |       |   |       |
            //  - - - - - - - - - -

            // The line through the middle (- - - - -) represents the x distance between the 
            // center point of each object. We cannot see a line representing the y distance
            // between each object, because it is 0 (i.e., there is no y distance between the
            // two objects).

            // Now, let's calculate deltaX and deltaY
            
            // deltaX = Math.ceil(hWidth - Math.abs(distX))
            // deltaX = Math.ceil(5 - 6)
            // deltaX = -1

            // deltaY = Math.ceil(hHeight - Math.abs(distY))
            // deltaY = Math.ceil(3 - 0)
            // deltaY = 3

            let deltaX = Math.ceil(hWidth - Math.abs(distX));
            let deltaY = Math.ceil(hHeight - Math.abs(distY));

            // Given the description of our example, we already know that the two object were 
            // colliding with each other on the horizontal plane. What we have now identified 
            // is that deltaX is less than deltaY. So, what this means is that deltaX is less
            // than deltaY, if the collision takes place on the horizontal plane. Otherwise,
            // if deltaX was greater than deltaY, then the collilsion must have taken place on 
            // the vertical plane.

            // If deltaX is greater than deltaY, then the collision must have taken place
            // on the vertical plane (i.e., above or below the sprite)
            if (deltaX > deltaY) {

                // If the collision y distance is greater than 0
                if (distY > 0) {

                    // Then the collision must have taken place above the sprite
                    collisionLocationType = CollisionLocationType.Top;
                }

                // If the collision y distance is less than 0
                else {

                    // Then the collision must have taken place below the sprite
                    collisionLocationType = CollisionLocationType.Bottom;
                }
            }

            // If the deltaX is less than deltaY, then the collision must have taken place
            // on the horizontal plane (i.e., to the left or to the right of the sprite)
            else {

                // If the collision x distance is greater than 0
                if (distX > 0) {
                    
                    // Then the collision must have taken place to the left of the
                    // sprite
                    collisionLocationType = CollisionLocationType.Left;
                }

                // If the collision x distance is greater than 0
                else {
                    
                    // Then the collision must have taken place to the right of the
                    // sprite
                    collisionLocationType = CollisionLocationType.Right;
                }
            }
        }

        // Once a direction has been found, return the answer
        return collisionLocationType;
    }
}