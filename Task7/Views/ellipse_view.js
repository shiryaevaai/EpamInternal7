MYAPP.views.ellipseView = (function () {
    var _ellipse = MYAPP.models.ellipse;
    var draw;

    draw = function (ellipse) {
        if (ellipse instanceof _ellipse.Ellipse) {
            var centerX = ellipse.x1 + (ellipse.x2 - ellipse.x1) / 2,
                centerY = ellipse.y1 + (ellipse.y2 - ellipse.y1) / 2,
                radiusX = Math.abs((ellipse.x2 - ellipse.x1) / 2),
                radiusY = Math.abs((ellipse.y2 - ellipse.y1) / 2);

            try {
                context.fillStyle = ellipse.color;
                context.strokeStyle = ellipse.color;
            }
            catch (ex) {
                context.fillStyle = "#222222";
                context.strokeStyle = "#222222";
            }

            context.save();
            context.beginPath();
            context.translate(centerX, centerY);
            context.scale(radiusX / radiusY, 1);
            context.arc(0, 0, radiusY, 0, Math.PI * 2, true);
           
            context.restore();
            context.closePath();
            //context.stroke();           
            
            context.fill();
        }
    }

    return {
        draw: draw
    }
}())