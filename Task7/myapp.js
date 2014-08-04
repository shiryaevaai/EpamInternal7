var MYAPP = {
    controllers: {
        mainController:null,        
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
        angleToRadian: null,
        guidHelper: null,
    }
};

var canvas,
context,
canvasCoordinates,
initialX = 0,   //coords of mouse ckick in canvas
initialY = 0,
figureArray = [], //array for figures 
selectedFigureIndex = -1,
selectedToEdit = -1,
figureType, //identifies whether the figure must be drown and its type
_shape = MYAPP.models.shape,
_rectangle = MYAPP.models.rectangle,
_line = MYAPP.models.line,
_ellipse = MYAPP.models.ellipse,
_mainController = MYAPP.controllers.mainController,
_mainView = MYAPP.views.mainView;
