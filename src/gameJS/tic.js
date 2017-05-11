"use strict";
var mycanvas, canvas, ctx;
var board = [];
var waiting = 0;

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

function draw() {
    for (var i = 1; i < 3; i++) {
	ctx.beginPath();
	ctx.moveTo((i/3)*canvas.width, 0);
	ctx.lineTo((i/3)*canvas.width, canvas.height);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, (i/3)*canvas.height);
	ctx.lineTo(canvas.width, (i/3)*canvas.height);
	ctx.stroke();
    }
}

function checkWin1() {
    for (var i = 0; i < 3; i++) {
	if (board[i][0] == 1 && board[i][1] == 1 && board[i][2] == 1) return 1;
	if (board[0][i] == 1 && board[1][i] == 1 && board[2][i] == 1) return 1;
    }
    if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1) return 1;
    if (board[0][2] == 1 && board[1][1] == 1 && board[2][0] == 1) return 1; 
    return 0;
}

function checkWin2() {
    for(var i = 0; i <3; i++) {
	if (board[i][0]== 2 &&board[i][1] == 2 && board[i][2] == 2) return 1;
        if (board[0][i] == 2 && board[1][i] == 2 && board[2][i] == 2) return 1;
    }
    if (board[0][0] == 2 && board[1][1] == 2 && board[2][2] == 2)return 1;
    if (board[0][2] == 2 && board[1][1] == 2 &&board[2][0] == 2) return 1;
    return 0;
}

function checkFull() {
    for (var i = 0; i < 3; i++) {
	for (var k = 0; k < 3; k++) {
	    if (board[i][k] == 0) return 0;
	}
    }
    return 1;
}

function pick() {
    var temp = [];
    for (var i = 0; i < 3; i++) {
	for (var k = 0; k < 3; k++) {
	    if (board[i][k] == 0) { 
		temp.push([i, k]);
	    }
	}
    }
    var pick = Math.floor(Math.random()*temp.length);
    board[temp[pick][0]][temp[pick][1]] = 1;
}

function pick2() {
    for (var i = 0; i < 3; i++) {
        for (var k = 0; k < 3; k++) {
            if (board[i][k] == 0) {
                board[i][k] = 2;
		return 0;
            }
        }
    }
}

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    console.log(keyCode);
    if (waiting == 1) {
	if (keyCode > 48 && keyCode < 58) {
	    board[Math.floor((keyCode-49)/3)][(keyCode-49)%3] = 2;
	    waiting = 0;
	}
    }

}

function text() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    for (var i = 0; i < 3; i++) {
	for (var k = 0; k < 3; k++) {
	    if (board[i][k] == 1) {
		ctx.fillText("O", (i/3)*canvas.width+(canvas.width/6), (k/3)*canvas.height+(canvas.height/6));
	    }
	    if (board[i][k] == 2) {
		ctx.fillText("X", (i/3)*canvas.width+(canvas.width/6), (k/3)*canvas.height+(canvas.height/6));
	    }
	}
    }
}

function begin() {
    for (var i = 0; i < 3; i++) {
	var temp = [];
	for (var k = 0; k < 3; k++) {
	    temp.push(0);
	}
	board.push(temp);
    }

    var bool;
    if (Math.random() * 100 < 50) bool = 0;
    else bool = 1;

    while (!checkWin1() && !checkWin2() && !checkFull()) {
	if (bool%2 == 0) {
	    pick();
	    text();
	}
	else {
	    waiting = 1;
	    //while (waiting){console.log('waiting');};
	    pick2();
	    text();
	}
	bool++;
    }
    if (checkWin1()) ctx.fillText("You Lose", canvas.width/2-50, canvas.height/2+canvas.width/12);
    else if (checkWin2()) ctx.fillText("You Win", canvas.width/2-50, canvas.height/2+canvas.width/12);
    else if (checkFull()) ctx.fillText("Cats Game", canvas.width/2-50, canvas.height/2+canvas.width/12);
}

init();
ctx.font = "45px Arial";
draw();
begin();