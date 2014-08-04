MYAPP.views.mainView = (function () {
    var draw,      
   _shape,
   _rectangle,
   _line,
   _ellipse,
   _mainController,
   _mainView;

    canvas = document.getElementById('canvas'),
    context = document.getElementById('canvas').getContext('2d'),            
    canvas.width = 720,
    canvas.height = 390,
    
    ClearCanvas = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw = function () { 
        ClearCanvas();
        figureArray.forEach(function (item, index) {
            item.draw();
        });
    };
    return {
        draw: draw,       
    }

}());



