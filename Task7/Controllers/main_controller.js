MYAPP.controllers.mainController = (function () {
    var getColor,
        saveToJson,
        loadFromJson,
        initializeIt,
        selectedToEdit = -1,
        selectedFigureIndex = -1,
        _shape,
        _rectangle,
        _line,
        _ellipse,
        _mainController,
        _mainView,
        _angleToRadian;

    initializeIt = function () {
        $(document).ready(function () {
            canvas = document.getElementById('canvas'),
            context = document.getElementById('canvas').getContext('2d'),
            canvasCoordinates = canvas.getBoundingClientRect(),
            canvas.width = 1520,
            canvas.height = 490,            
            _shape = MYAPP.models.shape,
            _rectangle = MYAPP.models.rectangle,
            _line = MYAPP.models.line,
            _ellipse = MYAPP.models.ellipse,
            _mainController = MYAPP.controllers.mainController,        
            _mainView = MYAPP.views.mainView,
            _angleToRadian=MYAPP.utils.angleToRadian;
              
            _mainView.draw();
            setInterval(_mainView.draw, 100);

            canvas.addEventListener("mousedown", function (e) {
                initialX = e.pageX - canvasCoordinates.left,
                initialY = e.pageY - canvasCoordinates.top;                

                try {
                    figureType = $('#figure-type > .marked')[0].innerHTML;
                    selectedToEdit = figureArray.length;
                    selectedFigureIndex = figureArray.length;

                    figureArray.forEach(function (item, index) {
                        item.resetSelected();
                    });

                    switch (figureType) {
                        case "Rectangle":
                            var figure = new _rectangle.Rectangle(initialX, initialY, initialX, initialY, getColor());
                            figure.setUniqueNumber();                            
                            figureArray.push(figure);
                            break;
                        case "Ellipse":
                            var figure = new _ellipse.Ellipse(initialX, initialY, initialX, initialY, getColor());
                            figure.setUniqueNumber();
                            figureArray.push(figure);
                            break;
                        case "Line":
                            var figure = new _line.Line(initialX, initialY, initialX, initialY, getColor());
                            figure.setUniqueNumber();
                            figureArray.push(figure);
                        default:
                            break;                            
                    }
                }
                catch (ex) {               
                    selectedToEdit = -1;
                    selectedFigureIndex = -1;  

                    for (var selectionIndex = figureArray.length - 1; selectionIndex >= 0; selectionIndex--) {
                        if (figureArray[selectionIndex].containsPoint(initialX, initialY)) {
                            figureArray[selectionIndex].setSelected();
                            selectedFigureIndex = selectionIndex;
                            selectedToEdit = selectionIndex;
                            document.getElementById("color-input").value = figureArray[selectionIndex].color;
                        }
                        else {
                            figureArray[selectionIndex].resetSelected();
                        }
                    }
                }
            });

            canvas.addEventListener("mousemove", function (e) {
                var canvasCoordinates = this.getBoundingClientRect(),
                    x = e.pageX - canvasCoordinates.left,
                    y = e.pageY - canvasCoordinates.top;

                if (figureType) {
                    var figure = figureArray[figureArray.length - 1];
                    figure.x2 = x;
                    figure.y2 = y;
                }
                else if (selectedFigureIndex > -1) {
                    var figure = figureArray[selectedFigureIndex];

                    figure.x1 = figure.x1 + (x - initialX),
                    figure.x2 = figure.x2 + (x - initialX),
                    figure.y1 = figure.y1 + (y - initialY),
                    figure.y2 = figure.y2 + (y - initialY);
                    initialX = x;
                    initialY = y;
                }
            });

            canvas.addEventListener("mouseup", function (e) {
                if (figureType) {                  
                    selectedToEdit = figureArray.length - 1;
                    selectedFigureIndex = - 1;
                    figureType = undefined;
                }
                else {
                    selectedFigureIndex = -1;
                }
            });
                       
            $(document).keyup(function (eventObject) {
                if (eventObject.which == 46) {
                    if (selectedToEdit > -1) {

                        if (selectedToEdit < figureArray.length - 1) {
                            for (var k = selectedToEdit; k < figureArray.length - 1; k++) {
                                figureArray[k] = figureArray[k + 1];
                            }
                        }

                        figureArray.length--;
                        selectedFigureIndex = -1;
                        selectedToEdit = -1;
                    }
                }
            });

            document.getElementById('saveToJson').onclick = function () {
                $('#json-area > textarea').prop("value", "");
                $('#json-area > textarea').prop("value", JSON.stringify(figureArray));
            };

            document.getElementById('loadFromJson').onclick = function () {
                var temporaryArr = JSON.parse($('#json-area > textarea').prop("value"));
                figureArray = [];
                selectedFigureIndex = -1;
                selectedToEdit = -1;
                temporaryArr.forEach(function (item, index) {
                    switch (item.Type) {
                        case "Rectangle":
                            var figure = new _rectangle.Rectangle(item.x1, item.y1, item.x2, item.y2, item.color);
                            figure.resetSelected();
                            figureArray.push(figure);
                            break;
                        case "Ellipse":
                            var figure = new _ellipse.Ellipse(item.x1, item.y1, item.x2, item.y2, item.color);
                            figure.resetSelected();
                            figureArray.push(figure);
                            break;
                        case "Line":
                            var figure = new _line.Line(item.x1, item.y1, item.x2, item.y2, item.color);
                            figure.resetSelected();
                            figureArray.push(figure);
                            break;
                        default:
                            break;
                    }
                });
            };
            
            document.getElementById('recolor-button').onclick = function () {
                if (selectedToEdit > -1) {
                    var recoloredFigure = figureArray[selectedToEdit];
                    recoloredFigure.color = getColor();
                }
            };
                          
            document.getElementById('figure-type').onclick = function (event) {
                var parent = event.target.parentNode,
                    elem = event.target,
                    siblings = parent.children,
                    siblingsNumber = siblings.length,
                    siblingIndex,
                    markRegex = /(?:^|\s)marked(?!\S)/;
                               

                if (elem.className == null) {
                    for (siblingIndex = 0; siblingIndex < siblingsNumber; siblingIndex++) {
                        siblings[siblingIndex].className = siblings[siblingIndex].className.replace(markRegex, '');
                    }

                    elem.className = "marked";
                }
                else
                    if (elem.className.indexOf("marked") === -1) {
                        for (siblingIndex = 0; siblingIndex < siblingsNumber; siblingIndex++) {
                            siblings[siblingIndex].className = siblings[siblingIndex].className.replace(markRegex, '');
                        }

                        elem.className += " marked";
                    }
                    else {
                        elem.className = elem.className.replace(markRegex, '');
                    }
            };

        })
    };
    
    getColor = function () {
        return document.getElementById("color-input").value;
    }    

    getAngle = function () {
        return document.getElementById("angle-input").value;
    }

    return {  
        getColor: getColor,
        getAngle: getAngle,
        saveToJson: saveToJson,
        loadFromJson: loadFromJson,
        initializeIt: initializeIt
    }
}());