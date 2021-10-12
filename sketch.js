var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY";
var restartImg;
var invisibleEdge; invisibleEdge2;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png","ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
  spookySound = loadSound("spooky.wav");
  restartImg = loadImage("reset.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(width/2,200);
  tower.addImage("tower",towerImg);
  tower.velocityY = 10;
  tower.scale= 1.5;

  ghost = createSprite (width/2, height/9, 10, 10);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.65;
  ghost.setCollider("circle", -5,10,140); 
  ghost.x = width/2;

    restart = createSprite(windowWidth-800, windowHeight-330, 10, 10);
    restart.addImage(restartImg);
    restart.scale = 0.5;

    invisibleEdge = createSprite(windowWidth-360, windowHeight-330, 10, 10000);
   invisibleEdge.visible = false;
    invisibleEdge2 = createSprite(windowWidth-1162, windowHeight-330, 10, 10000);
    invisibleEdge2.visible = false;

  spookySound.loop();

  doorsGroup = new Group ();
  climbersGroup = new Group ();
  invisibleBlockGroup = new Group ();
}

function draw() {
  background("black");

  ghost.collide(invisibleEdge);
  ghost.collide(invisibleEdge2);

  if (gameState === "PLAY")
  {
  ghost.velocityY = ghost.velocityY + 2

  if(tower.y > 400){
    tower.y = 200;
  }
 restart.visible = false;

  if (keyDown("SPACE"))
  {
   ghost.velocityY = -9
   ghost.changeImage("ghost-jumping.png");
  }
  if (keyDown("LEFT_ARROW"))
  {
   ghost.x = ghost.x -4;
  }

  if (keyDown("RIGHT_ARROW"))
  {
   ghost.x = ghost.x + 4;
  }

  if (climbersGroup.isTouching (ghost))
  {
   ghost.velocityY = 0 
  }

  if (climbersGroup.isTouching (ghost))
  {
   ghost.velocityY = 0 
  }
  spawnDoors ();

  if (invisibleBlockGroup.isTouching(ghost) || ghost.y > windowHeight+40)
 {
   ghost.destroy ();
   gameState = "END";
 }
    drawSprites ();
}
  if (gameState === "END"){
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("Game Over", windowWidth/2.45, windowHeight/2.3);

    stroke("green");
    fill("green");
    textSize(30);
    text("Press Ctrl+R to Restart the Game", windowWidth/2.9, windowHeight/2);

    if(keyDown("ENTER")) {
      reset();
    }
    restart = createSprite(windowWidth-800, windowHeight-330, 10, 10);
    restart.addImage(restartImg);
    restart.scale = 0.5
    restart.visible = true;
    restart = createSprite(windowWidth-800, windowHeight-330, 10, 10);
    restart.addImage(restartImg);
    restart.scale = 0.5
}
}
function spawnDoors ()
{
 if (frameCount % 140 === 0) {
  door = createSprite (300, 50, 10, 10);
  door.addImage("doors",doorImg);
  door.velocityY = 10;
  door.x = Math.round(random(windowWidth/3, windowWidth/2));
  door.lifeTime = 600;
  door.scale = 1.7
  doorsGroup.add (door);
  
  climber = createSprite (300, 150, 10, 10);
  climber.addImage("climber",climberImg);
  climber.velocityY = 10;
  climber.x = door.x;
  climbersGroup.add (climber);
  climber.scale = 1.7
  climber.lifeTime = 600;

  invisibleBlock = createSprite (300, 100, 86, 5);
  invisibleBlock.velocityY = 10;
  invisibleBlockGroup.add (invisibleBlock);
  invisibleBlock.x = climber.x;
  invisibleBlock.y = climber.y+10;
  invisibleBlock.lifeTime = 600
  invisibleBlock.scale = 1.7
  invisibleBlock.visible = false;

 ghost.depth = door.depth;
 ghost.depth +=1;

 } 
}
function reset() {
  gameState ==="PLAY";
}