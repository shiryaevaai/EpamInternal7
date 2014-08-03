MYAPP.models.rectangle = (function () {
    var _shape = MYAPP.models.shape,       
        _rectangle = MYAPP.models.rectangle;    

    var Rectangle = function (x1, y1, x2, y2, color) {
        this.Type = "Rectangle";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;

        this.isSelected = false;
        this.isFinished = false;
        this.uniqueNumber;        
    }    

    Rectangle.prototype = new _shape.Shape();
    
    return {
        Rectangle: Rectangle
    }    
}());

