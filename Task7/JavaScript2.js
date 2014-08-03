var objs = { Ellipse: [], Rectangle: [] },   //array for figures ???
canvas,
context,
canvasCoordinates,
initialX = 0,   //coords of mouse ckick in canvas
initialY = 0,
a = [], //array for figures 
selectedFigureIndex = -1,   
selectedToEdit= -1,
figureType; //identifies whether the figure must be drown and its type

$(document).ready(function () {
    canvas = document.getElementById('canvas');
    context = document.getElementById('canvas').getContext('2d');
    canvasCoordinates = canvas.getBoundingClientRect();
    canvas.width=720;
    canvas.height=390;

    function Draw() {    //view
        ClearCanvas();
        a.forEach(function (item, index) {
            item.draw();
        });
    };

    setInterval(Draw, 100);

    canvas.addEventListener("mousedown", function (e) {        
        initialX = e.pageX - canvasCoordinates.left,
        initialY = e.pageY - canvasCoordinates.top;
        
        try { 
            figureType = $('#figure-type > .marked')[0].innerHTML;

            switch (figureType) {
                case "Rectangle":
                    var figure = new Rectangle(initialX, initialY, initialX, initialY, GetColor());                   
                    a.push(figure);                    
                    break;
                case "Ellipse":
                    var figure = new Ellipse(initialX, initialY, initialX, initialY, GetColor());                   
                    a.push(figure);
                    break;
                case "Line":
                    var figure = new Line(initialX, initialY, initialX, initialY, GetColor());               
                    a.push(figure);
                    
                default:
                    {                       
                        break;
                    }
            }
        }
        catch (ex) {
            //alert("Type of figure isn't selected");

            for (var selectionIndex = a.length - 1; selectionIndex >= 0; selectionIndex--) {
                if (a[selectionIndex].containsPoint(initialX, initialY)) {
                    a[selectionIndex].setSelected();
                    selectedFigureIndex = selectionIndex;
                    selectedToEdit = selectionIndex;
                    break;
                }
                else {
                    a[selectionIndex].resetSelected();                    
                }
            }
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
        var figure = a[a.length - 1];
        selectedFigureIndex = -1;     
        figureType = undefined;
    });
});

function Shape() {
    this.Type = "Shape";
    this.isSelected = false;
    this.isFinished = false;
    this.uniqueNumber;

    this.setUniqueNumber = function () {
       this.uniqueNumber=guid();
    }

    this.getUniqueNumber = function () {
        return this.uniqueNumber;
    }

    this.setSelected = function () {     
        this.isSelected = true;
    }

    this.resetSelected = function () {
        this.isSelected = false;
    }
}

function Rectangle(x1, y1, x2, y2, color) {
    this.Type = "Rectangle";
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
}

Rectangle.prototype = new Shape();

Rectangle.prototype.containsPoint = function (x, y) {
    if (this.x1 < this.x2)
    {
        if (x > this.x1 && x < this.x2)
        {
            if (this.y1 < this.y2)
            {
                if (y > this.y1 && y < this.y2)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                if (y > this.y2 && y < this.y1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        else
        {
            return false;
        }
    }
    else {
        if (x > this.x2 && x < this.x1) {
            if (this.y1 < this.y2) {
                if (y > this.y1 && y < this.y2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (y > this.y2 && y < this.y1) {
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

Rectangle.prototype.draw = function () {
    try {
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
    }
    catch (ex) {
        context.fillStyle = "#222222";
        context.strokeStyle = "#222222";
    }

    context.scale(1, 1);
    context.fillRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);    
}

function Ellipse(x1, y1, x2, y2, color) {
    this.Type = "Ellipse";
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
}
Ellipse.prototype = new Shape();

Ellipse.prototype.containsPoint = function (x, y) {
    var centerX = this.x1 + (this.x2 - this.x1) / 2,
    centerY = this.y1 + (this.y2 - this.y1) / 2,
    radiusX = Math.abs((this.x2 - this.x1) / 2),
    radiusY = Math.abs((this.y2 - this.y1) / 2);

    if (Math.pow(x - centerX, 2) / Math.pow(radiusX, 2) + Math.pow(y - centerY, 2) / Math.pow(radiusY, 2) <= 1) {
        return true;
    }
    else {
        return false;
    }
}

Ellipse.prototype.draw = function () {

    var centerX = this.x1 + (this.x2 - this.x1) / 2,
    centerY = this.y1 + (this.y2 - this.y1) / 2,
    radiusX = Math.abs((this.x2 - this.x1) / 2),
    radiusY = Math.abs((this.y2 - this.y1) / 2);

    try {
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
    }
    catch (ex) {
        context.fillStyle = "#222222";
        context.strokeStyle = "#222222";
    }

    context.save();
    context.beginPath();
    context.translate(centerX, centerY);
    context.scale(radiusX / radiusY, 1);
    context.arc(0, 0, radiusY, 0, Math.PI * 2, true);
    context.restore();
    context.closePath();
    context.stroke();
}

function Line(x1, y1, x2, y2, color) {
    this.Type = "Line";
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
}
Line.prototype = new Shape();

Line.prototype.containsPoint = function (x, y) {
    var k = (this.y2 - this.y1) / (this.x2 - this.x1),
        b = this.y1 - this.x1 * k;

    if (!isFinite(k) && x >= this.x1 - 2 && x <= this.x1 + 2)
    {
        if (this.y1 <= this.y2) {
            if (y >= this.y1 && y <= this.y2) {
                return true;
            }
            else return false;
        }
        else {
            if (y <= this.y1 && y >= this.y2) {
                return true;
            }
            else return false;
        }
    }
    else if (y >= k * x + b - 2 && y <= k * x + b + 2) {
        if (this.x1 <= this.x2)
        {
            if (x>=this.x1 && x<=this.x2)
            {
                if (this.y1<=this.y2)
                {
                    if (y >= this.y1 && y <= this.y2) {
                        return true;
                    }
                    else return false;
                }
                else
                {
                    if (y <= this.y1 && y >= this.y2) {
                        return true;
                    }
                    else return false;
                }
            }
            else {
                return false;
            }
        }
        else
        {
            if (x <= this.x1 && x >= this.x2) {
                if (this.y1 <= this.y2) {
                    if (y >= this.y1 && y <= this.y2) {
                        return true;
                    }
                    else return false;
                }
                else {
                    if (y <= this.y1 && y >= this.y2) {
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

Line.prototype.draw = function () {
    try {
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
    }
    catch (ex) {
        context.fillStyle = "#222222";
        context.strokeStyle = "#222222";
    }

    context.scale(1, 1);
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.fill();
    context.stroke();
}

//function DrawSelectedFigure() {
//    var figureTypes = document.getElementById("figure-type").children,
//    figureColor = document.getElementById("color-input").value;

//    try {
//        //var figureType = $(figureTypes('.marked'));

//        var figureType = $('.marked')[0].innerHTML;

//        switch (figureType) {
//            case "Rectangle":
//                DrawRectangle(context, figureColor, 20, 20, 50, 50);
//                break;
//            case "Ellipse":
//                DrawEllipse(context, figureColor, 100, 100, 120, 150);
//                break;
//            case "Line":
//                DrawLine(context, figureColor, 40, 40, 100, 100);
//                break;
//            default:
//                break;
//        }
//    }
//    catch (ex) {
//        alert(ex.message);
//    };
//};

//function DrawEllipse(context, color, x1, y1, x2, y2) {
//    var centerX = x1 + (x2 - x1) / 2,
//    centerY = y1 + (y2 - y1) / 2,
//    radiusX = Math.abs((x2 - x1) / 2),
//    radiusY = Math.abs((y2 - y1) / 2);

//    context.fillStyle = color;
//    context.strokeStyle = color;

//    // Масштабируем по х. Tеперь нарисованная окружность вытянется в a / b раз  и станет эллипсом                     
//    // Рисуем окружность, которая благодаря масштабированию станет эллипсом       
//    // Восстанавливаем СК и масштаб

//    context.save();
//    context.beginPath();
//    context.translate(centerX, centerY);
//    context.scale(radiusX / radiusY, 1);
//    context.arc(0, 0, radiusY, 0, Math.PI * 2, true);
//    context.restore();
//    context.closePath();
//    context.stroke();
//};

//function DrawRectangle(context, color, x1, y1, x2, y2) {
//    context.fillStyle = color;
//    context.strokeStyle = color;

//    context.scale(1, 1);
//    context.fillRect(x1, y1, Math.abs(this.x2 - this.x1), Math.abs(this.y2 - this.y1));
//};

//function DrawLine(context, color, x1, y1, x2, y2) {
//    context.fillStyle = color;
//    context.strokeStyle = color;

//    context.scale(1, 1);
//    context.beginPath();
//    context.moveTo(x1, y1);
//    context.lineTo(x2, y2);
//    context.fill();
//    context.stroke();
//};

function Mark(elem) {
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


function RecolorSelectedFigure() {
    if (selectedToEdit > -1) {
        var recoloredFigure = a[selectedToEdit];
        recoloredFigure.color = GetColor();
    }
}

function DeleteSelectedFigure() {
    if (selectedToEdit > -1) {

        if (selectedToEdit < a.length - 1) {
            for (var k = selectedToEdit; k < a.length-1; k++) {
                a[k] = a[k+1];
            }            
        }

        a.length--;
    }
}

$(document).keyup(function (eventObject) {
    //var keyCode+=eventObject.which;
    if (eventObject.which==46) {
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

// event.type должен быть keypress
//function getChar(event) {
//       if (event.which == null) {  // IE
//              if (event.keyCode < 32) return null; // спец. символ      
//        return String.fromCharCode(event.keyCode)     
//    }

//    if (event.which != 0 && event.charCode != 0) { // все кроме IE    
//        if (event.which < 32) return null; // спец. символ    
//        return String.fromCharCode(event.which); // остальные
//    }
//    return null; // спец. символ
 
//}


function GetColor() {
    return document.getElementById("color-input").value; 
}

function ClearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }
    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
    };
};


function SaveToJson() {
    $('#json-area > textarea').prop("value", "");
    $('#json-area > textarea').prop("value", JSON.stringify(a));
}

function LoadFromJson() {
    var temporaryArr = JSON.parse($('#json-area > textarea').prop("value"));
    a = [];
    temporaryArr.forEach(function (item, index) {
        switch (item.Type) {
            case "Rectangle":
                var figure = new Rectangle(item.x1, item.y1, item.x2, item.y2,item.color);
                figure.setUniqueNumber();
                a.push(figure);

                break;
            default:
                break;

        }
    });
}