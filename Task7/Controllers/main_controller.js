MYAPP.controllers.mainController = (function () {
    var Mark,
        RecolorSelectedFigure,
        GetColor,
        ClearCanvas,
        SaveToJson,
        LoadFromJson,
        InitializeIt,
        selectedToEdit = -1,
        selectedFigureIndex = -1,
        _shape,
        _rectangle,
        _line,
        _ellipse,
        _mainController,
        _rectangleController,
        _ellipseController,
        _lineController,
        _mainView,
        _rectangleView,
        _lineView,
        _ellipseView;

    InitializeIt = function () {
        $(document).ready(function () {
            canvas = document.getElementById('canvas');
            context = document.getElementById('canvas').getContext('2d');
            canvasCoordinates = canvas.getBoundingClientRect();
            canvas.width = 720;
            canvas.height = 390,
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

            function Draw() {    //view
                ClearCanvas();
                a.forEach(function (item, index) {

                    switch (item.Type) {
                        case "Rectangle":
                            _rectangleView.draw(item);
                            break;
                        case "Ellipse":
                            _ellipseView.draw(item);
                            break;                            
                        case "Line":
                            _lineView.draw(ITEM);
                            break;
                        default:
                            break;
                    }                    
                });
            };

            setInterval(Draw, 100);

            canvas.addEventListener("mousedown", function (e) {
                initialX = e.pageX - canvasCoordinates.left,
                initialY = e.pageY - canvasCoordinates.top;                

                try {
                    figureType = $('#figure-type > .marked')[0].innerHTML;
                    selectedToEdit = a.length;
                    selectedFigureIndex = a.length;

                    switch (figureType) {
                        case "Rectangle":
                            var figure = new _rectangle.Rectangle(initialX, initialY, initialX, initialY, GetColor());
                            figure.setUniqueNumber();
                            //alert(MYAPP.utils.guidHelper.guid());
                            a.push(figure);
                            break;
                        case "Ellipse":
                            var figure = new _ellipse.Ellipse(initialX, initialY, initialX, initialY, GetColor());
                            a.push(figure);
                            break;
                        case "Line":
                            var figure = new _line.Line(initialX, initialY, initialX, initialY, GetColor());
                            a.push(figure);
                        default:
                            break;                            
                    }
                }
                catch (ex) {               
                    selectedToEdit = -1;
                    selectedFigureIndex = -1;

                    for (var selectionIndex = a.length - 1; selectionIndex >= 0; selectionIndex--) {                       
                        switch (a[selectionIndex].Type) {
                            case "Rectangle":
                                //alert(_rectangleController.containsPoint());
                                if (_rectangleController.containsPoint(a[selectionIndex], initialX, initialY)) {
                                    a[selectionIndex].setSelected();
                                    selectedFigureIndex = selectionIndex;
                                    selectedToEdit = selectionIndex;
                                    break;
                                }
                                else {
                                    a[selectionIndex].resetSelected();
                                }
                                break;

                            case "Ellipse":
                                if (_ellipseController.containsPoint(a[selectionIndex], initialX, initialY)) {
                                    a[selectionIndex].setSelected();
                                    selectedFigureIndex = selectionIndex;
                                    selectedToEdit = selectionIndex;
                                    break;
                                }
                                else {
                                    a[selectionIndex].resetSelected();
                                }
                                break;

                            case "Line":
                                if (_lineController.containsPoint(a[selectionIndex], initialX, initialY)) {
                                    a[selectionIndex].setSelected();
                                    selectedFigureIndex = selectionIndex;
                                    selectedToEdit = selectionIndex;
                                    break;
                                }
                                else {
                                    a[selectionIndex].resetSelected();
                                }
                                break;

                            default:
                                break;                               
                        }
                    }


                    //for (var selectionIndex = a.length - 1; selectionIndex >= 0; selectionIndex--) {
                    //    if (a[selectionIndex].containsPoint(initialX, initialY)) {
                    //        a[selectionIndex].setSelected();
                    //        selectedFigureIndex = selectionIndex;
                    //        selectedToEdit = selectionIndex;
                    //        break;
                    //    }
                    //    else {
                    //        a[selectionIndex].resetSelected();
                    //    }
                    //}
                }
            });

            canvas.addEventListener("mousemove", function (e) {
                var canvasCoordinates = this.getBoundingClientRect(),
                    x = e.pageX - canvasCoordinates.left,
                    y = e.pageY - canvasCoordinates.top;

                if (figureType) {
                    var figure = a[a.length - 1];
                    figure.x2 = x;
                    figure.y2 = y;
                }
                else if (selectedFigureIndex > -1) {
                    var figure = a[selectedFigureIndex];

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
                   // var figure = a[a.length - 1];
                    selectedToEdit = a.length - 1;
                    selectedFigureIndex = - 1;
                    figureType = undefined;
                }
                else {
                    selectedFigureIndex = -1;
                }
            });


            //function RecolorSelectedFigure() {
            //    if (selectedToEdit > -1) {
            //        var recoloredFigure = a[selectedToEdit];
            //        recoloredFigure.color = GetColor();
            //    }
            //}

            function DeleteSelectedFigure() {
                if (selectedToEdit > -1) {

                    if (selectedToEdit < a.length - 1) {
                        for (var k = selectedToEdit; k < a.length - 1; k++) {
                            a[k] = a[k + 1];
                        }
                    }

                    a.length--;
                }
            }

            $(document).keyup(function (eventObject) {
                if (eventObject.which == 46) {
                    if (selectedToEdit > -1) {

                        if (selectedToEdit < a.length - 1) {
                            for (var k = selectedToEdit; k < a.length - 1; k++) {
                                a[k] = a[k + 1];
                            }
                        }

                        a.length--;
                    }
                }
            });
        })
    };

    RecolorSelectedFigure = function() {
        if (selectedToEdit > -1) {
            var recoloredFigure = a[selectedToEdit];
            recoloredFigure.color = GetColor();
        }
    }

    Mark = function (elem) {
        var parent = elem.parentNode,
            siblings = parent.children,
            sibIndex;

        if (elem.className == null) {
            for (sibIndex = 0; sibIndex < siblings.length; sibIndex++) {
                siblings[sibIndex].className = siblings[sibIndex].className.replace(/(?:^|\s)marked(?!\S)/, '');
            }

            elem.className = "marked";
        }
        else
            if (elem.className.indexOf("marked") === -1) {
                for (sibIndex = 0; sibIndex < siblings.length; sibIndex++) {
                    siblings[sibIndex].className = siblings[sibIndex].className.replace(/(?:^|\s)marked(?!\S)/, '');
                }

                elem.className += " marked";
            }
            else {
                elem.className = elem.className.replace(/(?:^|\s)marked(?!\S)/, '');
            }
    };

    GetColor = function () {
        return document.getElementById("color-input").value;
    }

    ClearCanvas = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    SaveToJson = function () {
        $('#json-area > textarea').prop("value", "");
        $('#json-area > textarea').prop("value", JSON.stringify(a));
    }

    LoadFromJson = function () {
        var temporaryArr = JSON.parse($('#json-area > textarea').prop("value"));
        a = [];
        temporaryArr.forEach(function (item, index) {
            switch (item.Type) {
                case "Rectangle":
                    var figure = new Rectangle(item.x1, item.y1, item.x2, item.y2, item.color);
                    figure.setUniqueNumber();
                    a.push(figure);

                    break;
                default:
                    break;

            }
        });
    }

    return {
        Mark: Mark,
        RecolorSelectedFigure:RecolorSelectedFigure,
        GetColor: GetColor,
        ClearCanvas: ClearCanvas,
        SaveToJson: SaveToJson,
        LoadFromJson: LoadFromJson,
        InitializeIt: InitializeIt
    }
}());