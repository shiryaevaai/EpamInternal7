var MYAPP = {
    controllers: {
        mainController:null,
        rectangleController: null,
        lineController: null,
        ellipseController: null,
    },
    models: {
        shape: null,
        rectangle: null,
        line: null,
        ellipse: null,
    },
    views: {
        rectangleView: null,
        lineView: null,
        ellipseView: null,
    },
    utils: {
        canvasHelper: null,
        guidHelper:null,
    }
};

var canvas,
context,
canvasCoordinates,
initialX = 0,   //coords of mouse ckick in canvas
initialY = 0,
a = [], //array for figures 
selectedFigureIndex = -1,
selectedToEdit = -1,
figureType, //identifies whether the figure must be drown and its type
_shape = MYAPP.models.shape,
_rectangle = MYAPP.models.rectangle,
_line = MYAPP.models.line,
_ellipse = MYAPP.models.ellipse,
_mainController = MYAPP.controllers.mainController,
_rectangleController = MYAPP.controllers.rectangleController,
_ellipseController = MYAPP.controllers.ellipseController,
_lineController = MYAPP.controllers.lineController,
_mainView = MYAPP.views.mainView,
_rectangleView = MYAPP.views.rectangleView,
_lineView = MYAPP.views.lineView,
_ellipseView = MYAPP.views.ellipseView;
