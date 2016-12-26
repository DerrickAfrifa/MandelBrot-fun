var iterations = 300;
var radius = 2;
var image;
var maxRadiusY = 1.2;
var minRadiusY = -1.2;
var maxRadiusX = 0.8;
var minRadiusX = -1.8;
var selector;
var selectorwidth = 200;
var currentValue = "Default";
var pseudoInfinity = 5;

//((a^2 - b^2) + 2abi) + (a + b)
//        c^2          + c
function mandelbroth(row, col){
    img.loadPixels();

    for(var row=0; row<height; row++){
        for(col=0; col<width; col++){
            var xOnPlane = map(row, 0, height, minRadiusX, maxRadiusX);
            var yOnPlane  = map(col, 0, width, minRadiusY, maxRadiusY);

            var xOnPlaneC = xOnPlane;
            var yOnPlaneC = yOnPlane;

            var i;
            for(i=0; i<iterations; i++){
                var real = Math.pow(xOnPlane,2) - Math.pow(yOnPlane,2);
                var imaginary = 2*xOnPlane*yOnPlane;

                xOnPlane = real + xOnPlaneC;
                yOnPlane = imaginary + yOnPlaneC;

                if(abs(real + imaginary) > pseudoInfinity) break;
            }

            switch(selector.value()){
                case "Default":
                    if(i == iterations){
                        img.set(row, col, color(0, 0, 0));
                    }else {
                        img.set(row, col, color(0, i, i));
                    }
                    break;
                case "Red":
                    if(i == iterations){
                        img.set(row, col, color(0, 0, 0));
                    }else {
                        img.set(row, col, color(i, 0, 0));
                    }
                    break;
                case "Green":
                    if(i == iterations){
                        img.set(row, col, color(0, 0, 0));
                    }else {
                        img.set(row, col, color(0, i, 0));
                    }
                    break;
                case "Blue":
                    if(i == iterations){
                        img.set(row, col, color(0, 0, 0));
                    }else {
                        img.set(row, col, color(0, 0, i));
                    }
                    break;
            }
        }
    }
    img.updatePixels();
}


function setup(){
    createCanvas(650, 650);
    background(255);
    img = createImage(width, height);
    selector = createSelect();
    selector.position(windowWidth-selectorwidth-50, 50);
    selector.option('Default');
    selector.option('Red');
    selector.option('Green');
    selector.option('Blue');
    selector.style('width', "200px");
    mandelbroth();
}

function draw(){
    if(selector.value() != currentValue){
        mandelbroth();
        currentValue = selector.value();
    }
    image(img, 0, 0);
}
