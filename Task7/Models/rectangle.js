MYAPP.models.rectangle = (function () {
    var _shape = MYAPP.models.shape,       
        _rectangle = MYAPP.models.rectangle;    

    var Rectangle = function (x1, y1, x2, y2, color) {
        this.Type = "Rectangle";
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

    Rectangle.prototype = new _shape.Shape();

    Rectangle.prototype.setUniqueNumber = function () {
        this.uniqueNumber = MYAPP.utils.guidHelper.guid();
    }

    Rectangle.prototype.getUniqueNumber = function () {
        return this.uniqueNumber;
    }

    Rectangle.prototype.setSelected = function () {
        this.isSelected = true;
    }

    Rectangle.prototype.resetSelected = function () {
        this.isSelected = false;
    }
    
    return {
        Rectangle: Rectangle
    }    
}());

