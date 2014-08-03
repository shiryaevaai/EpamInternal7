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

    Rectangle.prototype.setUniqueNumber = function () {
        this.uniqueNumber = MYAPP.utils.guidHelper.guid();        
    }

    return {
        Rectangle: Rectangle
    }

    //Rectangle.prototype.setUniqueNumber = Shape.setUniqueNumber;

    //Rectangle.prototype.getUniqueNumber = function () {
    //    return this.uniqueNumber;
    //}

    //this.setSelected = function () {
    //    this.isSelected = true;
    //}

    //this.resetSelected = function () {
    //    this.isSelected = false;
    //}

    //Rectangle.prototype.containsPoint = function (x, y) {
    //    if (this.x1 < this.x2) {
    //        if (x > this.x1 && x < this.x2) {
    //            if (this.y1 < this.y2) {
    //                if (y > this.y1 && y < this.y2) {
    //                    return true;
    //                }
    //                else {
    //                    return false;
    //                }
    //            }
    //            else {
    //                if (y > this.y2 && y < this.y1) {
    //                    return true;
    //                }
    //                else {
    //                    return false;
    //                }
    //            }
    //        }
    //        else {
    //            return false;
    //        }
    //    }
    //    else {
    //        if (x > this.x2 && x < this.x1) {
    //            if (this.y1 < this.y2) {
    //                if (y > this.y1 && y < this.y2) {
    //                    return true;
    //                }
    //                else {
    //                    return false;
    //                }
    //            }
    //            else {
    //                if (y > this.y2 && y < this.y1) {
    //                    return true;
    //                }
    //                else {
    //                    return false;
    //                }
    //            }
    //        }
    //        else {
    //            return false;
    //        }
    //    }
    //}

    //Rectangle.prototype.draw = function () {
    //    try {
    //        context.fillStyle = this.color;
    //        context.strokeStyle = this.color;
    //    }
    //    catch (ex) {
    //        context.fillStyle = "#222222";
    //        context.strokeStyle = "#222222";
    //    }

    //    context.scale(1, 1);
    //    context.fillRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    //}
}());

