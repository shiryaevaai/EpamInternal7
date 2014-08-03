MYAPP.controllers.lineController = (function () {
    _lineController = MYAPP.controllers.lineController;

    var containsPoint;

    containsPoint = function (line, x, y) {

        if (!line instanceof MYAPP.models.line.Line) {
            return false;
        }
        
        var k = (line.y2 - line.y1) / (line.x2 - line.x1),
       b = line.y1 - line.x1 * k;

        if (!isFinite(k) && x >= line.x1 - 2 && x <= line.x1 + 2) {
            if (line.y1 <= line.y2) {
                if (y >= line.y1 && y <= line.y2) {
                    return true;
                }
                else return false;
            }
            else {
                if (y <= line.y1 && y >= line.y2) {
                    return true;
                }
                else return false;
            }
        }
        else if (y >= k * x + b - 2 && y <= k * x + b + 2) {
            if (line.x1 <= line.x2) {
                if (x >= line.x1 && x <= line.x2) {
                    if (line.y1 <= line.y2) {
                        if (y >= line.y1 && y <= line.y2) {
                            return true;
                        }
                        else return false;
                    }
                    else {
                        if (y <= line.y1 && y >= line.y2) {
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
                if (x <= line.x1 && x >= line.x2) {
                    if (line.y1 <= line.y2) {
                        if (y >= line.y1 && y <= line.y2) {
                            return true;
                        }
                        else return false;
                    }
                    else {
                        if (y <= line.y1 && y >= line.y2) {
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

    return {
        containsPoint: containsPoint
    }
}());

