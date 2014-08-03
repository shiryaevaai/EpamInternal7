MYAPP.views.rectangleView = (function () {
    var _rectangle = MYAPP.models.rectangle;
    var draw;

    draw = function (rectangle) {
        if (rectangle instanceof _rectangle.Rectangle) {
            if (rectangle.isSelected===true) {
                context.shadowOffsetX = 5;
                context.shadowOffsetY = 5;
                context.shadowBlur = 4;
                context.shadowColor = 'black';
            }
            else {
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 0;
                context.shadowColor = 'white';
            }

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

