var MYAPP = {
    controllers: {
        mainController:null,
        rectangleController: null,
        lineController: null,
        ellipseeController: null,
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
figureType; //identifies whether the figure must be drown and its type

