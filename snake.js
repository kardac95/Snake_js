var canvas = document.getElementById("board"); //document.querySelector('canvas');

//set size of canvas.
canvas.width = 400; //window.innerWidth
canvas.height = 400; //window.innerHeight

var tileSize = 20; 
var nrBlocks = 400/(tileSize);
var x = 0, y = 0;
var tail = [];
var cp = {x:nrBlocks/2, y: nrBlocks/2}

var score = 0;
var foodPos = {x: randInt(nrBlocks), y: randInt(nrBlocks) };

//init snake game
document.addEventListener("keydown", keyPress);
setInterval(gameloop, 1000/10);

function setBackground(color) {
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function writeBlock(color, pos) {	
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(pos.x*tileSize, pos.y*tileSize, tileSize, tileSize);
}

function renderSnake() {
	writeBlock("green", cp);
	for (var i = 0; i < tail.length; i++) {
		writeBlock("green", tail[i]);
	}
}

function move() {
	cp.x += x;
	cp.y += y;
}

function restart() {
	x = 0, y = 0;
	cp = {x:nrBlocks/2, y: nrBlocks/2}
	tail = [];
	score = 0;
	printScore();
}

function printScore() {
	document.getElementById("scoreboard").innerHTML = "Score: " + score;
}

function gameloop() {
	setBackground("black");
	renderSnake();
	var snakeSize = 0;
	if(gameOver(cp)) {
		restart();
		console.log("GAME OVER!!")
	}

	if(cp.x == foodPos.x && cp.y == foodPos.y) {
		snakeSize += 1;
		score += 1;
		printScore();
		foodPos = {x: randInt(nrBlocks), y: randInt(nrBlocks)}
	}
	writeBlock("red", foodPos);
	tail.unshift({x:cp.x, y:cp.y});
	move();

	if(snakeSize == 0) {
		tail.pop();
	}
}

function gameOver(cp) {
	if (cp.x > canvas.width/tileSize || cp.x < 0 || cp.y > canvas.height/tileSize || cp.y < 0)
		return true;
	for (var i = 0; i < tail.length; i++) {
		if(tail[i].x == cp.x && tail[i].y == cp.y)
			return true;
	}
	return false;
}

function keyPress(e) {
	switch(e.keyCode) {
		case 38:
			// up arrow	
			x = 0; y = -1;
			break;

		case 40:
			// down arrow
			x = 0; y = 1;
			break;

		case 37:
			// left arrow
			x = -1; y = 0;
			break;

		case 39:
			x = 1; y = 0;
			break;
	}
}

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
