MYAPP.models.rectangle = (function () {
    var _shape = MYAPP.models.shape,       
        _rectangle = MYAPP.models.rectangle;

    var Rectangle = function (x1, y1, x2, y2, color) {
        this.Type = "Rectangle";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.rotateAngle = 0;
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

    Rectangle.prototype.containsPoint = function (x, y) {
        var centerX = this.x1 + (this.x2 - this.x1) / 2,
            centerY = this.y1 + (this.y2 - this.y1) / 2,            
            x0 = x - centerX,
            y0 = y - centerY;

        x = x0 * Math.cos(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + y0 * Math.sin(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + centerX,
        y = -x0 * Math.sin(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + y0 * Math.cos(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + centerY;

        if (this.x1 < this.x2) {
            if (x > this.x1 && x < this.x2) {
                if (this.y1 < this.y2) {
                    if (y > this.y1 && y < this.y2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (y > this.y2 && y < this.y1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        else {
            if (x > this.x2 && x < this.x1) {
                if (this.y1 < this.y2) {
                    if (y > this.y1 && y < this.y2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (y > this.y2 && y < this.y1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
    }

    Rectangle.prototype.draw = function () {
        try {
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
        }
        catch (ex) {
            context.fillStyle = "#222222";
            context.strokeStyle = "#222222";
        }

        if (this.isSelected === true) {
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.shadowBlur = 4;
            context.shadowColor = 'black';
            this.rotateAngle = document.getElementById("angle").value;
        }
        else {
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 0;
            context.shadowColor = 'white';
        }        

        var rectX = this.x1, rectY = this.y1, rectW = this.x2 - this.x1, rectH = this.y2 - this.y1;

        context.save();
        context.scale(1, 1);                 
        context.translate(rectX + rectW / 2, rectY + rectH / 2);
        context.rotate(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle));
        context.fillRect(-rectW / 2, -rectH / 2, rectW, rectH);
        context.restore();
    }

    return {
        Rectangle: Rectangle
    }    
}());

