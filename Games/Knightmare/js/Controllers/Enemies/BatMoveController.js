class BatMoveController {

   constructor(notificationCenter, objectManager, minY, maxY, xVel, yVel)
   {
       this.notificationCenter = notificationCenter;
       this.objectManager = objectManager;
       this.minY = minY;
       this.maxY = maxY;
       this.xVel = xVel;
       this.yVel = yVel;
   }

   handleOutOfBounds(parent)
   {
       // If bat goes out of bounds, remove it from the object manager.
        if(parent.transform.translation.x > canvas.clientWidth + 200 || parent.transform.translation.x < -200)
        {
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sprite,
                    NotificationAction.Remove,
                    [parent]
                )
            );
        }
   }

   update(gameTime, parent)
   {
       if(parent.transform.translation.y >= this.maxY || parent.transform.translation.y <= this.minY)
       {
           this.yVel = -this.yVel;
       }

       parent.transform.translateBy(new Vector2(this.xVel*gameTime.elapsedTimeInMs, this.yVel*gameTime.elapsedTimeInMs));
   }

}