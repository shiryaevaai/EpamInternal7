MYAPP.models.line = (function () {
    var _shape = MYAPP.models.shape,
        _line = MYAPP.models.line;

    var Line = function (x1, y1, x2, y2, color) {
        this.Type = "Line";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        if (color === "") {
            this.color = "black";
        }
        else {
            this.color = color;
        }

        this.isSelected = true;     
        this.uniqueNumber;
    }

    Line.prototype = new _shape.Shape();

    return {
        Line: Line
    }
}());

