MYAPP.views.rectangleView = (function () {
    var _rectangle = MYAPP.models.rectangle;
    var draw;

    draw = function (rectangle) {
        if (rectangle instanceof _rectangle.Rectangle) {
            context.fillStyle = rectangle.color;
            context.strokeStyle = rectangle.color;
            context.scale(1, 1);
            context.fillRect(rectangle.x1, rectangle.y1, rectangle.x2 - rectangle.x1, rectangle.y2 - rectangle.y1);
        }        
    }

    return {
        draw: draw
    }
}())

