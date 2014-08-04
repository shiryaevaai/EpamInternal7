MYAPP.models.shape = (function () {
    var _shape = MYAPP.models.shape,
        _rectangle = MYAPP.models.rectangle;

    var Shape;

    Shape = function () {
        this.Type = "Shape";
        this.isSelected = false;
        this.isFinished = false;
        this.uniqueNumber;
        this.rotateAngle = 0;
    }    

    Shape.prototype.setUniqueNumber = function () {
        this.uniqueNumber = MYAPP.utils.guidHelper.guid();
    }

    Shape.prototype.getUniqueNumber = function () {
        return this.uniqueNumber;
    }

    Shape.prototype.setSelected = function () {
        this.isSelected = true;
    }

    Shape.prototype.resetSelected = function () {
        this.isSelected = false;
    }

    Shape.prototype.setRotateAngle = function (value) {
        this.rotateAngle = value;
    }

    return {
        Shape: Shape
    }
    //function guid() {
    //    function s4() {
    //        return Math.floor((1 + Math.random()) * 0x10000)
    //                   .toString(16)
    //                   .substring(1);
    //    }
    //    return function () {
    //        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    //               s4() + '-' + s4() + s4() + s4();
    //    };
    //};
}());