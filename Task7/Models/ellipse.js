MYAPP.models.ellipse = (function () {
    var _shape = MYAPP.models.shape,
        _ellipse = MYAPP.models.ellipse;

    var Ellipse = function (x1, y1, x2, y2, color) {
        this.Type = "Ellipse";
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

    Ellipse.prototype = new _shape.Shape();
    
    Ellipse.prototype.containsPoint = function (x, y) {
        var centerX = this.x1 + (this.x2 - this.x1) / 2,
        centerY = this.y1 + (this.y2 - this.y1) / 2,
        radiusX = Math.abs((this.x2 - this.x1) / 2),
        radiusY = Math.abs((this.y2 - this.y1) / 2),
         x0 = x - centerX,
         y0 = y - centerY;

        x = x0 * Math.cos(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) - y0 * Math.sin(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + centerX,
        y = x0 * Math.sin(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + y0 * Math.cos(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle)) + centerY;


        if (Math.pow(x - centerX, 2) / Math.pow(radiusX, 2) + Math.pow(y - centerY, 2) / Math.pow(radiusY, 2) <= 1) {
            return true;
        }
        else {
            return false;
        }
    }

    Ellipse.prototype.draw = function () {

        var centerX = this.x1 + (this.x2 - this.x1) / 2,
        centerY = this.y1 + (this.y2 - this.y1) / 2,
        radiusX = Math.abs((this.x2 - this.x1) / 2),
        radiusY = Math.abs((this.y2 - this.y1) / 2);

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
  
        context.save();
        context.beginPath();
        context.translate(centerX, centerY);
        context.rotate(MYAPP.utils.angleToRadian.angleToRadian(this.rotateAngle));

        context.scale(radiusX / radiusY, 1);        
        context.arc(0, 0, radiusY, 0, Math.PI * 2, true);
       
        context.restore();
        context.closePath();
        context.fill();
    }

    return {
        Ellipse: Ellipse
    }
}());

