MYAPP.controllers.rectangleController = function () {
    _rectangleController = MYAPP.controllers.rectangleController;
    
    MYAPP.controllers.rectangleController.containsPoint = function (rectangle, x, y) {
        if (!rectangle instanceof _rectangle) {
            return false;
        }

        if (rectangle.x1 < rectangle.x2) {
            if (x > rectangle.x1 && x < rectangle.x2) {
                if (rectangle.y1 < rectangle.y2) {
                    if (y > rectangle.y1 && y < rectangle.y2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (y > rectangle.y2 && y < rectangle.y1) {
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
            if (x > rectangle.x2 && x < rectangle.x1) {
                if (rectangle.y1 < rectangle.y2) {
                    if (y > rectangle.y1 && y < rectangle.y2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (y > rectangle.y2 && y < rectangle.y1) {
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
}

