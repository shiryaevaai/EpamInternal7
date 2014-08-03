MYAPP.views.lineView = (function () {
    var _line = MYAPP.models.line;
    var draw;

    draw = function (line) {
        if (line instanceof _line.Line) {
            try {
                context.fillStyle = line.color;
                context.strokeStyle = line.color;
            }
            catch (ex) {
                context.fillStyle = "#222222";
                context.strokeStyle = "#222222";
            }

            if (line.isSelected) {
                context.shadowOffsetX =5;
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

            context.scale(1, 1);
            context.beginPath();
            context.moveTo(line.x1, line.y1);
            context.lineTo(line.x2, line.y2);
            context.fill();
            context.stroke();
        }
    }

    return {
        draw: draw
    }
}())