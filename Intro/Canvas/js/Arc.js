class Arc {

    constructor(position, radius, startAngleInRads, endAngleInRads) {
        this.position = position;
        this.radius = radius;
        this.startAngleInRads = startAngleInRads;
        this.endAngleInRads = endAngleInRads;
    }

    draw(context, lineWidth, strokeStyle, fillStyle, drawCounterClockwise) {
        context.beginPath();

        context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            this.startAngleInRads,
            this.endAngleInRads,
            drawCounterClockwise
        );
        
        context.lineWidth = lineWidth;

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

    // Create a deep copy of our arc
    clone() {
        return new Arc(this.position, this.radius, 
            this.startAngleInRads, this.endAngleInRads);
    }

    // Check if two arcs are equal
    equal(other) {
        if (other == null
            || other == undefined
            || other.constructor.name != this.constructor.name
        ) {
            return false;
        }

        return (
            this.position == other.position
            && this.radius == other.radius
            && this.startAngleInRads == other.startAngleInRads
            && this.endAngleInRads == other.endAngleInRads
        )
    }
    
}