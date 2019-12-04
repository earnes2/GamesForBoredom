// This Breakout game was adapted from a build-your-own tutorial provided by the Mozilla Developer's Network. 
// Preexisting or endemic variables, color schemes, speeds, and other elements have been altered to reflect 
// my vision for the game and other elements have been added by myself to make the game my own. The comments
// below have been added by myself to assist with understanding and tracking the code more efficiently.


// **************************************************
//UNLOADING OUR GAME PIECES: Reference the 2D Canvas
// **************************************************
var canvas = document.getElementById("breakoutCanvas");
var ctx = canvas.getContext("2d");
var orbRadius = 8;
var orbRadius2 = 8;
var x = canvas.width/4;
var y = canvas.height-50;
var dx = 1; //the increments added to the 'x' and 'y' values will make the orb appear as if it is moving
var dy = -6;
var shieldHeight = 10;
var shieldWidth = 55;
var shieldX = (canvas.width-shieldWidth)/2;
var rightPressed = false; //establishing our command and control variables
var leftPressed = false;
//obstacle variables: Asteroid Field
var rockRowCount = 7;
var rockColumnCount = 3;
var rockWidth = 20;
var rockHeight = 20;
var rockPadding = 55;
var rockOffsetTop = 30;
var rockOffsetLeft = 100;
//lives and score variables
var score = 0;
var lives = 3;

//Asteroid Field 2D Array
var rock = [];
for(var c=0; c<rockColumnCount; c++) {
    rock[c] = [];
  for(var r=0; r<rockRowCount; r++) {
    rock[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//**********************************************************
// EVENT HANDLERS FOR INTERACTIVE FEATURES: KEYBOARD & MOUSE
//**********************************************************
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    shieldX = relativeX - shieldWidth/2;
  }
}

//*****************************************
// REMOVE ROCKS THAT HAVE BEEN STRUCK
//*****************************************
function collisionDetection() {
  for(var c=0; c<rockColumnCount; c++) {
    for(var r=0; r<rockRowCount; r++) {
      var b = rock[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+rockWidth && y > b.y && y < b.y+rockHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == rockRowCount*rockColumnCount) {
            alert("ALL OBSTACLES REMOVED!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// ***************
// DRAWING THE ORB
// ***************
function drawOrb() {
  ctx.beginPath();
  ctx.arc(x, y, orbRadius, 0, Math.PI*2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();
}

// *******************
// DRAWING THE SHIELD
// *******************
function drawshield() {
  ctx.beginPath();
  ctx.rect(shieldX, canvas.height-shieldHeight, shieldWidth, shieldHeight);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.closePath();
}

// *****************************
// DRAWING THE ASTEROID FIELD
// *****************************
function drawRocks() {
  for(var c=0; c<rockColumnCount; c++) {
    for(var r=0; r<rockRowCount; r++) {
      if(rock[c][r].status == 1) {
        var rockX = (r*(rockWidth+rockPadding))+rockOffsetLeft;
        var rockY = (c*(rockHeight+rockPadding))+rockOffsetTop;
        rock[c][r].x = rockX;
        rock[c][r].y = rockY;
        ctx.beginPath();
        ctx.rect(rockX, rockY, rockWidth, rockHeight);
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
//************************
// SCORE/LIVES TRACKER
//************************
function drawScore() {
  ctx.font = 'Press Start 2P, cursive';
  ctx.fillStyle = "chartreuse";
  ctx.fillText("Score: "+score, 25, 575);
}
function drawLives() {
  ctx.font = "30px, Press Start 2P, cursive";
  ctx.fillStyle = "red";
  ctx.fillText("Shield Level: "+lives, canvas.width-795, 25);
}

//***********************************
// ADDING THE DRAWINGS TO THE CANVAS
//***********************************
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRocks();
  drawOrb();
  drawshield();
  drawScore();
  drawLives();
  collisionDetection();


//******************************************************************************
// KEEPING THE ORB WITHIN THE CONFINES OF THE CANVAS BY REVERSING BALL MOVEMENT: 
//******************************************************************************
  if(x + dx > canvas.width-orbRadius || x + dx < orbRadius) {
    dx = -dx;
  }
  if(y + dy < orbRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-orbRadius) {
    if(x > shieldX && x < shieldX + shieldWidth) {
      dy = -dy * 1.12;
    }

    // ESTABLISH PARAMETERS FOR END OF GAME
    else {
      lives--;
      if(!lives) {
        alert("YOUR SHIELDS HAVE FAILED");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        shieldX = (canvas.width-shieldWidth)/2;
      }
    }
  }

// *******************
// MOVING THE SHIELD
// *******************
  if(rightPressed && shieldX < canvas.width-shieldWidth) {
    shieldX += 7;
  }
  else if(leftPressed && shieldX > 0) {
    shieldX -= 7;
  }

//These add the updated increments to the orb on each drawing interval
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();