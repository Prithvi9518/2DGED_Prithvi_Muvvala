/**
 * This component allows us to draw debug information to the screen (e.g. sprite and camera bounding boxes, fps etc)
 * @author NMCG
 * @version 1.0
 * @class DebugDrawer
 */
 class DebugDrawer {

    static SPRITE_BOUNDING_BOX_COLOR = "red";
    static CAMERA_BOUNDING_BOX_COLOR = "yellow";
    static DEBUG_TEXT_FONT = "18px Arial";
    static DEBUD_TEXT_MAXWIDTH = 200;

    constructor(id, context, objectManager, cameraManager) {
        this.id = id;
        this.context = context;
        this.objectManager = objectManager;
        this.cameraManager = cameraManager;
    }

    update(gameTime) {

    }

    draw(gameTime) {

        // Draw the bounding boxes for the in-view sprites (i.e., the sprites that are inside the 
        // bounding box of the active camera)
        let drawCount = this.drawCollidableSpriteBoundingBoxes(DebugDrawer.SPRITE_BOUNDING_BOX_COLOR);

        // Draw the collision surface (i.e. transform.BoundingBox) around the active camera
        this.drawActiveCameraBoundingBoxes(DebugDrawer.CAMERA_BOUNDING_BOX_COLOR);

        // Draw any additional information to screen
        this.drawDebugText(gameTime, drawCount);
    }

    drawCollidableSpriteBoundingBoxes(boundingBoxColor) {

        // Initialize draw count
        let drawCount = 0;

        // Get sprites from object manager
        let sprites = this.objectManager.sprites;

        // For each 'actorType' sub-array in the parent 'sprites' array
        for (let actorType in sprites) {

            // For each sprite in the 'actorType' sub-array
            for (let sprite of sprites[actorType]) {

                // If the sprite is in the active camera's view
                if (
                    sprite.collisionType === CollisionType.Collidable &&
                    sprite.transform.boundingBox.intersects(
                        this.cameraManager.activeCamera.transform.boundingBox
                    )
                ) {

                    // Draw a bounding box around the sprite
                    this.drawBoundingBox(sprite.transform, boundingBoxColor);

                    // Update draw count
                    drawCount++;
                }
            }
        }

        // Retrun draw count
        return drawCount;
    }

    drawBoundingBox(transform, color) {

        this.context.save();

        this.cameraManager.activeCamera.setContext(this.context);

        this.context.globalAlpha = 1;
        this.context.lineWidth = 2;
        this.context.strokeStyle = color;

        let boundingBox = transform.boundingBox;

        this.context.strokeRect(
            boundingBox.x,
            boundingBox.y,
            boundingBox.width,
            boundingBox.height
        );

        this.context.restore();
    }

    drawActiveCameraBoundingBoxes(boundingBoxColor) {

        this.drawBoundingBox(
            this.cameraManager.activeCamera.transform,
            boundingBoxColor
        );
    }

    drawDebugText(gameTime, drawCount) {

        let x = 10;
        let y = 10;

        let yOffset = 20;

        this.drawText(
            "Debug Info",
            x,
            y + yOffset,
            "white"
        );

        this.drawText(
            "--------------------------",
            x,
            y + 2 * yOffset,
            "white"
        );

        this.drawText(
            "Draw Count: " + drawCount,
            x,
            y + 3 * yOffset,
            "white"
        );

        this.drawText(
            "FPS: " + gameTime.fps + " ms",
            x,
            y + 4 * yOffset,
            "white"
        );
    }

    drawText(text, x, y, color) {

        this.context.save();

        // Uncomment the below line and see what happens to the debug text when you move 
        // camera using numpad 4 - 6
        // this.cameraManager.activeCamera.setContext(this.context);
        
        this.context.font = DebugDrawer.DEBUG_TEXT_FONT;
        this.context.fillStyle = color;
        this.context.textBaseline = "top";
        this.context.globalAlpha = DebugDrawer.DEBUG_TEXT_ALPHA;

        this.context.fillText(
            text, 
            x, 
            y, 
            DebugDrawer.DEBUG_TEXT_MAXWIDTH
        );

        this.context.restore();
    }
}