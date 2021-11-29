// Find the element on our page that has the id main_canvas,
// and store it in a variable
//
// This will allow us to make changes to the canvas
let canvas = document.getElementById("main_canvas");

// Access the 2D context of our canvas - this allow us to 
// draw to our canvas in 2D
//
// We can think of context as the way in which we draw to the 
// canvas - it is essentially our paint brush
let context = canvas.getContext("2d");

/** Draw a Line */

context.beginPath();            // Tell the canvas that we want to draw a line

context.lineWidth = 8;          // Tell the canvas that we want our line to have a thickness of 8
context.strokeStyle = "green";  // Tell that canvas that we want our line to be green

context.moveTo(100, 100);       // Tell the canvas to move our pen to (50, 100)
context.lineTo(250, 250);       // Tell the canvas that we want to draw a line from (50, 100) to (250, 100)

context.stroke();               // Tell the canvas to draw the line

context.closePath();            // Tell the canvas to stop drawing

/** Draw another Line */

context.beginPath();            // Tell the canvas that we want to draw a line

context.lineWidth = 8;          // Tell the canvas that we want our line to have a thickness of 8
context.strokeStyle = "green";  // Tell that canvas that we want our line to be green

context.moveTo(250, 250);       // Tell the canvas to move our pen to (50, 100)
context.lineTo(400, 100);       // Tell the canvas that we want to draw a line from (50, 100) to (250, 100)

context.stroke();               // Tell the canvas to draw the line

context.closePath();            // Tell the canvas to stop drawing

// Create a function to speed up the process of drawing a line
function drawLine(width, style, startX, startY, endX, endY) {
    context.beginPath();
    context.lineWidth = width;
    context.strokeStyle = style;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
}

// Use the function to draw a line
drawLine(8, "pink", 100, 150, 200, 450);

// Create a new function that accepts two vectors as a parameter, which each represent 
// a point in space (startPoint and endPoint)
function drawLineVectors(width, style, startPoint, endPoint) {
    context.beginPath();
    context.lineWidth = width;
    context.strokeStyle = style;
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.stroke();
    context.closePath();
}

// Now, let's use our new Vector2 class to create a line
drawLineVectors(8, "red", new Vector2(150, 300), new Vector2(300, 150));

// Create a rect object
let r1 = new Rect(100, 100, new Vector2(50, 50));

// Draw rect to canvas
r1.draw(context, 8, "blue");

// Create another rect object
let r2 = new Rect(200, 150, new Vector2(50, 50));

// Draw rect to canvas
r2.draw(context, 8, "green");

// Clone rect
let r3 = r2.clone();

// Draw rect to canvas
r3.draw(context, 4, "red");

// Begin our path
context.beginPath();

// Create an arc
context.arc(240, 150, 50, 0, Math.PI);

// Set up the line width
context.lineWidth = 8;

// Set the stroke style
context.strokeStyle = "blue";

// Draw the line
context.stroke();

// Close the path
context.closePath();

// PI Radians = 180 Degrees
// 2 PI Radians = 360 Degrees
// PI / 2 Radians = 90 Degrees
// 3 * PI / 2 Radians = 270 Degrees

// We can use Math.toRadians(x) to convert a value x from degrees to radians
function drawArc(
    lineWidth, 
    strokeStyle, 
    fillStyle, 
    position, 
    radius, 
    startAngleInRads, 
    endAngleInRads, 
    drawCounterClockwise
    ) {

    context.beginPath();

    context.lineWidth = lineWidth;
    
    context.arc(position.x, position.y, radius, startAngleInRads,
        endAngleInRads, drawCounterClockwise);    

    if (fillStyle != null) {
        context.fillStyle = fillStyle;
        context.fill();
    }
    
    if (strokeStyle != null) {
        context.strokeStyle = strokeStyle;
        context.stroke();
    }

    context.closePath();
}

drawArc(8, "purple", null, new Vector2(400, 200), 70, 0, Math.PI * 2, false);

context.clearRect(0, 0, 640, 480);

context.beginPath();

// Face
context.moveTo(400, 240);
context.arc(320, 240, 80, 0, Math.PI * 2);

// Left Eye
context.moveTo(290, 200);
context.arc(280, 200, 10, 0, Math.PI * 2);

// Right Eye
context.moveTo(370, 200);
context.arc(360, 200, 10, 0, Math.PI * 2);

// Smile
context.moveTo(380, 240);
context.arc(320, 240, 60, 0, Math.PI);

context.strokeStyle = "black";
context.stroke();

context.closePath();



