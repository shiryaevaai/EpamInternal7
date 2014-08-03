MYAPP.controllers.ellipseController = (function () {
    _ellipseController = MYAPP.controllers.ellipseController;

    var containsPoint;

    containsPoint = function (ellipse, x, y) {

        if (!ellipse instanceof MYAPP.models.ellipse.Ellipse) {
            return false;
        }        
        var centerX = ellipse.x1 + (ellipse.x2 - ellipse.x1) / 2,
        centerY = ellipse.y1 + (ellipse.y2 - ellipse.y1) / 2,
        radiusX = Math.abs((ellipse.x2 - ellipse.x1) / 2),
        radiusY = Math.abs((ellipse.y2 - ellipse.y1) / 2);

        if (Math.pow(x - centerX, 2) / Math.pow(radiusX, 2) + Math.pow(y - centerY, 2) / Math.pow(radiusY, 2) <= 1) {
            return true;
        }
        else {
            return false;
        }
        
    }

    return {
        containsPoint: containsPoint
    }
}());

