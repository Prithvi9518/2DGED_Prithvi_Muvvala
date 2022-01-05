class BatMoveController {

   constructor(objectManager, minY, maxY, xVel, yVel)
   {
       this.objectManager = objectManager;
       this.minY = minY;
       this.maxY = maxY;
       this.xVel = xVel;
       this.yVel = yVel;
   }

   update(gameTime, parent)
   {
       if(parent.transform.translation.y >= this.maxY || parent.transform.translation.y <= this.minY)
       {
           this.yVel = -this.yVel;
       }

       parent.transform.translateBy(new Vector2(this.xVel, this.yVel));
   }

}