MYAPP.models.line = (function () {
    var _shape = MYAPP.models.shape,
        _line = MYAPP.models.line;

    var Line = function (x1, y1, x2, y2, color) {
        this.Type = "Line";
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

    Line.prototype = new _shape.Shape();      

    Line.prototype.containsPoint = function (x, y) {
        var k = (this.y2 - this.y1) / (this.x2 - this.x1),
            b = this.y1 - this.x1 * k,
            centerX = this.x1 + (this.x2 - this.x1) / 2,
            centerY = this.y1 + (this.y2 - this.y1) / 2,           
            x0 = x - centerX,
            y0 = y - centerY;

            x = x0 * Math.cos(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + y0 * Math.sin(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + centerX,
            y = -x0 * Math.sin(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + y0 * Math.cos(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + centerY;


        if (!isFinite(k) && x >= this.x1 - 2 && x <= this.x1 + 2) {
            if (this.y1 <= this.y2) {
                if (y >= this.y1 && y <= this.y2) {
                    return true;
                }
                else return false;
            }
            else {
                if (y <= this.y1 && y >= this.y2) {
                    return true;
                }
                else return false;
            }
        }
        else if (y >= k * x + b - 2 && y <= k * x + b + 2) {
            if (this.x1 <= this.x2) {
                if (x >= this.x1 && x <= this.x2) {
                    if (this.y1 <= this.y2) {
                        if (y >= this.y1 && y <= this.y2) {
                            return true;
                        }
                        else return false;
                    }
                    else {
                        if (y <= this.y1 && y >= this.y2) {
                            return true;
                        }
                        else return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                if (x <= this.x1 && x >= this.x2) {
                    if (this.y1 <= this.y2) {
                        if (y >= this.y1 && y <= this.y2) {
                            return true;
                        }
                        else return false;
                    }
                    else {
                        if (y <= this.y1 && y >= this.y2) {
                            return true;
                        }
                        else return false;
                    }
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

    Line.prototype.draw = function () {
        try {
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
        }
        catch (ex) {
            context.fillStyle = "#222222";
            context.strokeStyle = "#222222";
        }

        if (this.isSelected) {
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
        
        function inRad(num) {
            return num * Math.PI / 180;
        }

        var centerX = this.x1 + (this.x2 - this.x1) / 2, centerY = this.y1 + (this.y2 - this.y1) / 2, deltaX = this.x2 - this.x1, deltaY = this.y2 - this.y1;

        context.save();
        context.translate(centerX, centerY);
        context.rotate(inRad(this.rotateAngle));
        context.scale(1, 1);
        context.beginPath();              
       
        context.moveTo(-deltaX/2, -deltaY/2);
        context.lineTo(deltaX/2, deltaY/2);

        context.restore();

        context.fill();
        context.stroke();
    }

    return {
        Line: Line
    }
}());

