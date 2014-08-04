MYAPP.utils.angleToRadian = (function () {
    var angleToRadian;

    angleToRadian = function (num) {
        return num * Math.PI / 180;
    }

    return {
        angleToRadian: angleToRadian
    }
}());