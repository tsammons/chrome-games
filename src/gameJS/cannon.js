"use strict";
var mycanvas, canvas, ctx, end;
var current = Math.PI;
var balls = [];
var objects = [];
var count = 0;
var deleted = 0;

// create canvas
function init() {
    mycanvas = document.createElement("canvas");
    mycanvas.id = "mycanvas";

    // add styling
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "#mycanvas { position: absolute; top: 0px; left: 0px; z-index: 3; pointer-events: none;}";

    // append to doc
    document.body.appendChild(mycanvas);
    document.body.appendChild(css);
    document.addEventListener("keydown", keyDownTextField, false);

    // set dimensions
    canvas = document.getElementById('mycanvas');
    ctx = mycanvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function score() {
    ctx.fillText(count + "/" + (count+deleted),canvas.width-150,50);
    ctx.fillText(count/(count+deleted), canvas.width-150, 80);
}

function cannon() {
    var y = Math.cos(current);
    var x = Math.sin(current);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2-5,canvas.height-50);
    ctx.lineTo(canvas.width/2-5+(50*x),canvas.height-50+(50*y));
    ctx.stroke();
}

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode == 37) {
	current += 0.1;
	clear();
	drawAll();
	cannon();
    }
    if (keyCode == 39) {
	current -= 0.1;
	clear();
	drawAll();
	cannon();
    }
    if (keyCode == 83) {
	shoot();
    }
}

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function shoot() {
    var temp = [canvas.width/2-5+(50*Math.sin(current)), canvas.height-50+(50*Math.cos(current)), current];
    balls.push(temp);
}

function addObject() {
    var temp = [Math.random()*canvas.width, 0];
    objects.push(temp);
}

function mainLoop() {
    end = setInterval(tick, 25);
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
}

function drawObject(x, y) {
    ctx.beginPath();
    ctx.rect(x,y,20,50);
    ctx.fill();
}

function checkbounds(index) {
    if (balls[index][0] < 0  || balls[index][0] > canvas.width || balls[index][1] < 0 || balls[index][1] > canvas.height) {
	balls.splice(index, 1);
	return 0;
    }
    return 1;
}

function checkboundsObj(index) {
    if (objects[index][0] < 0  || objects[index][0] > canvas.width || objects[index][1] < 0 || objects[index][1] > canvas.height) {
        objects.splice(index, 1);
	deleted++;
        return 0;
    }
    return 1;
}

function drawAll() {
    score();
    for (var i = 0; i < balls.length; i++) {
	drawBall(balls[i][0], balls[i][1]);
    }
    for (i = 0; i < objects.length; i++) {
	drawObject(objects[i][0], objects[i][1]);
    }
}

function checkBall(index) {
    for (var i = 0; i < objects.length; i++) {
	if (balls[index][0] > objects[i][0]-2.5 && balls[index][0] < objects[i][0]+22.5 && balls[index][1] > objects[i][1]-2.5 && balls[index][1] < objects[i][1] + 52.5) {
	    objects.splice(i, 1);
	    balls.splice(index, 1);
	    count++;
	    return 0;
	}
    }
    return 1;
}

function tick() {
    clear();
    score();
    cannon();
    if (Math.random() * 100 < 2) {addObject();}
      
    for (var i = 0; i < balls.length; i++) {
	if (checkbounds(i) == 1) {
	    if (checkBall(i) == 1) {
		balls[i][0] += 5*Math.sin(balls[i][2]);
		balls[i][1] += 5*Math.cos(balls[i][2]);
		drawBall(balls[i][0], balls[i][1]);
	    }
	}
    }
    for (i = 0; i < objects.length; i++) {
	if (checkboundsObj(i) == 1) {
		objects[i][1] += 1;
		drawObject(objects[i][0], objects[i][1]);
	}
    }
}

// begin
init();
ctx.font = "30px Arial";
ctx.lineWidth = 5;
mainLoop();
