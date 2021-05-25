var allSpots = [];
var allTreeSpots = [];
var allBranches = [];
var allFood = [];
var alldirtyFood = [];
var hearts = 3;
var reset;
var allSpaceBetween = [600];
var speed = 5;
var moveRight = 1;
var squirrelX = 250,
  squirrelY = 340;
var moveDown = 0;
var armStart, armEnd;
var squirrelJump = false;
var jumpSteps;
var jumpDown = false;
var whileJump = 0;
var moveMeter = 0;
var finishedJump = true;
var firstStart = true;
var firstTouchgame = false;
var toLeft = false,
  toRight = false,
  overHalf = false;
var scores = 0;
var cameraCorrecting = 0;
var canvas;
var gamePage = false;
var playerNameInGame;

function setup() {
  canvas = createCanvas(500, 680);

  for (let i = 0; i < 10; i++) {
    let oneSpot = new spots(random(width), random(height));
    allSpots.push(oneSpot);
  }

  for (let i = 0; i < 1; i++) {
    let oneFood = new food(random(width), random(height));
    allFood.push(oneFood);
  }

  for (let i = 0; i < 1; i++) {
    let onedirtyFood = new dirtyFood(random(width), random(height));
    alldirtyFood.push(onedirtyFood);
  }

  for (let i = 0; i < 60; i++) {
    let oneSpot = new spots(width / 2 - width / 10 / 2, random(height));
    allTreeSpots.push(oneSpot);
  }

  while (allBranches.length < 7) {
    let randomSpacebetween = random(height);
    let drawBranches = 0;
    for (let j in allSpaceBetween) {
      if (
        randomSpacebetween < allSpaceBetween[j] - 50
        || randomSpacebetween > allSpaceBetween[j] + 50
      ) {
        drawBranches++;
      }
    }
    if (drawBranches == allSpaceBetween.length) {
      let oneBranch = new branches(randomSpacebetween);
      allBranches.push(oneBranch);
      allSpaceBetween.push(randomSpacebetween);
    }
  }

  armStart = PI + 3 * QUARTER_PI;
  armEnd = PI;

  reset = createButton("Play Again");
  reset.mousePressed(restart);
  reset.style("display:none");
  reset.style("width:150px");
  reset.style("height:50px");
  reset.style("font-size:20px");
  reset.style("background:rgb(204, 171, 88)");

  logOut = createButton("Log Out");
  logOut.mousePressed(logOutHere);
  logOut.style("display:none");
  logOut.style("width:150px");
  logOut.style("height:50px");
  logOut.style("font-size:20px");
  logOut.style("background:rgb(204, 171, 88)");
}

function keyPressed() {
  if (gamePage) {

    if (firstStart) {
      moveMeter = 6;
      firstStart = false;
    }
  }
}

function mousePressed() {
  if (firstTouchgame && gamePage) {

    if (firstStart) {
      moveMeter = 6;
      firstStart = false;
    }
    if (mouseX < squirrelX) {
      toLeft = true;
    }
    if (mouseX > squirrelX) {
      toRight = true;
    }
  }
  firstTouchgame = true;
}

function mouseReleased() {
  toLeft = false;
  toRight = false;
}

function goLeft() {
  if (toLeft) {
    squirrelX -= speed;
    moveRight = 1;
    armStart = PI + 3 * QUARTER_PI;
    armEnd = PI;
  }
}

function goRight() {
  if (toRight) {
    squirrelX += speed;
    moveRight = -1;
    armStart = 0;
    armEnd = PI + QUARTER_PI;
  }
}

function draw() {

  canvas.center("horizontal");
  reset.position(windowWidth / 2 - 170, height / 2 + 40);
  logOut.position(windowWidth / 2 + 30, height / 2 + 40);

  if (moveMeter < 0 && overHalf) {
    for (let i in allSpaceBetween) {
      allSpaceBetween[i] =
        allSpaceBetween[i] - moveMeter * 2 + cameraCorrecting;
    }
  }

  if (squirrelY < height / 3) {
    cameraCorrecting = 1;
  } else {
    cameraCorrecting = 0;
  }
  for (let i = 0; i < allSpots.length; i++) {
    if (allSpots[i].y > height) {
      allSpots.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < allTreeSpots.length; i++) {
    if (allTreeSpots[i].y > height) {
      allTreeSpots.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < allFood.length; i++) {
    if (allFood[i].y > height) {
      allFood.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < alldirtyFood.length; i++) {
    if (alldirtyFood[i].y > height) {
      alldirtyFood.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < allBranches.length; i++) {
    if (allBranches[i].y > height) {
      allBranches.splice(i, 1);
      allSpaceBetween.splice(i + 1, 1);
      break;
    }
  }

  if (allSpots.length < 15) {
    let oneSpot = new spots(random(width), random(height * 2) - height * 2);
    allSpots.push(oneSpot);
  }

  if (allFood.length < 1) {
    let oneFood = new food(random(width), random(height * 2) - height * 2);
    allFood.push(oneFood);
  }
  if (alldirtyFood.length < 1) {
    let onedirtyFood = new dirtyFood(
      random(width),
      random(height * 2) - height * 2
    );
    alldirtyFood.push(onedirtyFood);
  }

  if (allTreeSpots.length < 90) {
    let oneSpot = new spots(
      width / 2 - width / 10 / 2,
      random(height * 2) - height * 2
    );
    allTreeSpots.push(oneSpot);
  }

  if (allBranches.length < 21) {
    let randomSpacebetween = random(height * 2) - height * 2;
    let drawBranches = 0;
    for (let j in allSpaceBetween) {
      if (
        randomSpacebetween < allSpaceBetween[j] - 50
        || randomSpacebetween > allSpaceBetween[j] + 50
      ) {
        drawBranches++;
      }
    }
    if (drawBranches == allSpaceBetween.length) {
      let oneBranch = new branches(randomSpacebetween);
      allBranches.push(oneBranch);
      allSpaceBetween.push(randomSpacebetween);
    }
  }

  background("#296C36");
  goLeft();
  goRight();
  //Green Spots
  noStroke();
  fill("#9BCB3D");
  for (let i in allSpots) {
    allSpots[i].show();
  }
  //tree body
  fill(204, 171, 88);
  rect(width / 2 - width / 10 / 2, 0, width / 10, height);

  //Branches
  fill(204, 171, 88);
  stroke(204, 171, 88);
  for (let i in allBranches) {
    allBranches[i].show();
  }
  for (let i in allBranches) {
    allBranches[i].jump();
  }

  //tree spots
  fill(140, 106, 18);
  stroke(140, 106, 18);
  strokeWeight(1);
  for (let i in allTreeSpots) {
    allTreeSpots[i].showTree();
  }
  noStroke();
  if (keyIsDown(LEFT_ARROW)) {
    squirrelX -= speed;
    moveRight = 1;
    armStart = PI + 3 * QUARTER_PI;
    armEnd = PI;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    squirrelX += speed;
    moveRight = -1;
    armStart = 0;
    armEnd = PI + QUARTER_PI;
  }

  if (squirrelJump) {
    if (whileJump < 50) {
      whileJump += 3;
    }

    moveMeter = -4;
    if (overHalf == false) {
      moveMeter = -6;
    }

    let steps;
    if (overHalf) {
      steps = 125;
    } else {
      steps = 300;
    }
    jumpSteps += cameraCorrecting;
    if (squirrelY < jumpSteps - steps) {
      squirrelJump = false;
      jumpDown = true;
      finishedJump = true;
      overHalf = false;
    }
  }

  if (jumpDown) {
    moveMeter = +6;
    if (whileJump > 0) {
      whileJump -= 3;
    }
  }
  squirrelY += moveMeter + cameraCorrecting;
  squirrel(squirrelX, squirrelY);

  textSize(50);
  text(scores, 30, 50);

  stroke(1);
  strokeWeight(1);
  for (let i in allFood) {
    allFood[i].show();
  }
  for (let i in allFood) {
    allFood[i].taking();
  }

  for (let i in alldirtyFood) {
    alldirtyFood[i].show();
  }
  for (let i in alldirtyFood) {
    alldirtyFood[i].taking();
  }

  textSize(20);
  text("🖤", 400, 45);
  text("🖤", 430, 45);
  text("🖤", 460, 45);

  for (let i = 0; i < hearts; i++) {
    text("💗", 400 + i * 30, 45);
  }

  if (squirrelY > height || hearts < 1) {
    push();
    strokeWeight(1);
    textSize(70);
    stroke("#e66910");

    fill(0);
    text("Game Over", width / 7, height / 2);

    reset.style("display:block");
    logOut.style("display:block");

    pop();

  }

  document.getElementById
}

function squirrel(x, y) {
  //the body
  fill(50);
  ellipse(x, y, 40, 70);
  fill("#e66910");
  //head
  ellipse(x - 5 * moveRight, y - 40, 35, 30);
  strokeWeight(20);
  noFill();
  stroke("#e66910");
  //tail
  bezier(
    x + 20 * moveRight,
    y + 15,
    x + 70 * moveRight,
    y,
    x + (whileJump + 10) * moveRight,
    y - 20 + whileJump,
    x + (whileJump + 40) * moveRight,
    y - 50 + whileJump
  );
  stroke("#e66910");
  fill("#e66910");
  strokeWeight(1);
  //leg
  ellipse(x, y + 15, 50, 40);
  rect(x - 20, y + 25, 35, 10);
  //foot
  arc(x - 20 * moveRight, y + 30, 20, 10, 0, PI, OPEN);

  stroke("#e66910");
  fill("#e66910");
  //arm
  arc(x - 20 * moveRight, y - 10, 25, 10, armStart, armEnd, PIE);
  strokeWeight(7);
  stroke(0);
  //eye
  point(x - 8 * moveRight, y - 45);
  stroke("#a86d32");
  strokeWeight(7);
  //nose
  point(x - 24 * moveRight, y - 40);
  strokeWeight(1);
  noStroke();
  //ear
  triangle(x, y - 50, x + 10 * moveRight, y - 45, x + 5 * moveRight, y - 70);
}

class spots {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    let amount = [];
    for (let i = 10; i < 50; i++) {
      amount.push(i);
    }
    this.spots = random(amount);
    this.spaceBetweenX = [];
    this.spaceBetweenY = [];
    this.spotSize = [];
    this.treeSpotSizeW = [];
    this.treeSpotSizeH = [];
    for (let i = 0; i < this.spots; i++) {
      this.spaceBetweenX.push(random(i));
      this.spaceBetweenY.push(random(i));
      this.spotSize.push(random(i / 1.5));
      this.treeSpotSizeW.push(random(i / 3));
      this.treeSpotSizeH.push(random(i / 2));
    }
  }

  show() {
    if (moveMeter < 0 && overHalf) {
      this.y = this.y - moveMeter * 2 + cameraCorrecting;
    }
    for (let i = 0; i < this.spots; i++) {
      circle(
        this.x + this.spaceBetweenX[i],
        this.y + this.spaceBetweenY[i],
        this.spotSize[i]
      );
    }
  }

  showTree() {
    if (moveMeter < 0 && overHalf) {
      this.y = this.y - moveMeter * 2 + cameraCorrecting;
    }
    for (let i = 0; i < this.spots; i++) {
      rect(
        this.x + this.spaceBetweenX[i],
        this.y + this.spaceBetweenY[i],
        this.treeSpotSizeW[i],
        this.treeSpotSizeH[i]
      );
    }
  }
}

class branches {
  constructor(y) {
    this.y = y;
    this.leftOrRight = random([true, false]);
    this.x2 = random(20);
    this.x3 = random(20, 40);
    this.x4 = random(40, 150);
    this.y2 = random(30);
    this.y3 = random(10);
    this.y4 = random(20);
    this.thickness = random(10, 20);
    this.firstTouch = true;
  }

  show() {
    if (moveMeter < 0 && overHalf) {
      this.y = this.y - moveMeter * 2 + cameraCorrecting;
    }
    strokeWeight(this.thickness);
    if (this.leftOrRight) {
      bezier(
        width / 2 + width / 10 / 2,
        this.y,
        width / 2 + width / 10 / 2 + this.x2,
        this.y - this.y2,
        width / 2 + width / 10 / 2 + this.x3,
        this.y + this.y3,
        width / 2 + width / 10 / 2 + this.x4,
        this.y - this.y4
      );
    } else {
      bezier(
        width / 2 - width / 10 / 2,
        this.y,
        width / 2 - width / 10 - this.x2,
        this.y - this.y2,
        width / 2 - width / 10 - this.x3,
        this.y + this.y3,
        width / 2 - width / 10 - this.x4,
        this.y - this.y4
      );
    }
  }

  jump() {
    if (finishedJump && hearts > 0) {
      if (this.leftOrRight) {
        if (
          squirrelY + 30 < this.y + this.thickness / 2
          && squirrelY + 30 > this.y - this.thickness / 2
          && squirrelX > width / 2 + width / 10 / 2
          && squirrelX < width / 2 + width / 10 / 2 + this.x4
        ) {
          squirrelJump = true;
          jumpSteps = this.y;
          jumpDown = false;
          finishedJump = false;
          if (squirrelY < height / 1.35) {
            overHalf = true;
          }
          if (this.firstTouch) {
            scores++;
            this.firstTouch = false;
          }
        }
      } else {
        if (
          squirrelY + 30 < this.y + this.thickness / 2
          && squirrelY + 30 > this.y - this.thickness / 2
          && squirrelX < width / 2 - width / 10 / 2
          && squirrelX > width / 2 - width / 10 - this.x4
        ) {
          squirrelJump = true;
          jumpSteps = this.y;
          jumpDown = false;
          finishedJump = false;
          if (squirrelY < height / 1.35) {
            overHalf = true;
          }
          if (this.firstTouch) {
            scores++;
            this.firstTouch = false;
          }
        }
      }
    }
  }
}

class food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    if (moveMeter < 0 && overHalf) {
      this.y = this.y - moveMeter * 2 + cameraCorrecting;
    }

    fill(235, 204, 54);

    ellipse(this.x, this.y, 40);
    textSize(30);
    fill(148, 124, 7);
    text("$", this.x - 8, this.y + 10);
  }

  taking() {
    let distance = dist(this.x, this.y, squirrelX, squirrelY);
    if (distance < 40) {
      scores += 5;
      allFood.pop();
    }
  }
}

class dirtyFood {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    if (moveMeter < 0 && overHalf) {
      this.y = this.y - moveMeter * 2 + cameraCorrecting;
    }

    noFill();
    stroke(0);
    strokeWeight(3);
    arc(this.x - 10, this.y - 35, 15, 20, PI / 0.7, PI / 2);
    noFill();
    fill("#d3d69a");
    noStroke();
    arc(this.x, this.y, 20, 60, PI / 3, -PI / 2.3);
    arc(this.x - 7, this.y, 20, 60, PI / 0.7, PI / 1.5);
    fill(143, 3, 3);
    arc(this.x, this.y + 10, 20, 40, PI / 3.5, -PI / 0.76);
    arc(this.x - 7, this.y + 10, 20, 40, PI / 2.2, PI / 1.3);
    arc(this.x + 3, this.y - 12, 20, 40, PI / 0.8, -PI / 2.3);
    arc(this.x - 10, this.y - 12, 20, 40, PI / 0.7, -PI / 5);
    stroke(0);
    point(this.x - 5, this.y - 5);
    point(this.x - 10, this.y + 20);
    point(this.x, this.y);
    strokeWeight(7);
    let xfly = random(-25, 25);
    let yfly = random(-20, 15);
    point(this.x + xfly, this.y - 50 + yfly);
    point(this.x + xfly, this.y - 50 + yfly);
    point(this.x + xfly, this.y - 50 + yfly);

  }

  taking() {
    let distance = dist(this.x, this.y, squirrelX, squirrelY);
    if (distance < 40) {
      hearts -= 1;
      alldirtyFood.pop();
    }
  }
}

function restart() {
if (preScore>scores) {
	scores=preScore;
	}
  gameDb.collection("scoreBoard").doc(userIDgame).set({
    name: playerNameGame,
    score: scores
  }).then(() => {


    gameDb.collection("scoreBoard").get().then((snapShot) => {
      scoreBoardGame = [];

      snapShot.docs.forEach(doc => {
        scoreBoardGame.push(doc.data());
        console.log(scoreBoardGame);
      });

      gameDb.collection("scoreBoard").doc(userIDgame).get().then((doc) => {
        playerNameGame = doc.data().name;
        document.getElementById("playerScore").innerHTML = doc.data().name + " | " + doc.data().score;


      });

      writeSB();

    });
    allSpots = [];
    allTreeSpots = [];
    allBranches = [];
    allFood = [];
    alldirtyFood = [];
    hearts = 3;

    allSpaceBetween = [600];
    speed = 5;
    moveRight = 1;
    squirrelX = 250;
    squirrelY = 340;
    moveDown = 0;
    squirrelJump = false;
    jumpDown = false;
    whileJump = 0;
    moveMeter = 0;
    finishedJump = true;
    firstStart = true;
    firstTouchgame = false;

    toLeft = false;
    toRight = false;
    overHalf = false;
    scores = 0;
    cameraCorrecting = 0;

    reset.style("display:none");
    logOut.style("display:none");

    setup();
  });

}

function logOutHere() {

  restart();

  //gameAuth.signOut();
  gamePage = false;
  document.getElementById("signUp").style.display = "block";
  document.querySelector("canvas").style.display = "none";
  document.getElementById("scoreBorde").style.display = "none";

}

document.getElementById("logInButton").addEventListener("click", function () {
  reset.style("display:none");
  logOut.style("display:none");
});
