
var monkey , monkey_running,ground,invisiblegrnd;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score,gs=1,PLAY=1,END=0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(400,400);
  score=0;
  monkey=createSprite(50,270);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.09;
  ground=createSprite(200,300,400,10);
  ground.shapeColor="gray";
  ground.x=ground.width/2;
 // monkey.debug=true;
  monkey.setCollider("circle",0,0,320);
  
  
  
  foodGroup = new Group();
  obstacleGroup= new Group(); 
  edges=createEdgeSprites();
} 
function draw() {
 background("lightblue");
  fill(0);
  textSize(12);
  text("Survival Time: "+score,200,20);
  if(gs===PLAY){
  score=score+Math.round((getFrameRate()/60));
  ground.velocityX=-3;
  if(keyDown("space") && monkey.y>200){
    monkey.velocityY=-10;
  }
  //add gravity
  monkey.velocityY=monkey.velocityY+0.5;
  if(ground.x<ground.width/2)
    {
      ground.x=200;
    }
  monkey.collide(ground);
  if(monkey.isTouching(obstacleGroup))
    {
      gs=END;   
    }
  
  bananas();
  obstacles();
  }
  if(gs===END){
    score=0;
      ground.velocityX=0;
    monkey.velocityY=0;
      foodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
  }
 drawSprites(); 
}
function bananas(){
  if((frameCount%80)===0){
  banana=createSprite(400,300);
  banana.addImage(bananaImage);
  banana.y=Math.round(random(120,200));
  banana.velocityX=-5;
  banana.scale=0.09;
  banana.lifetime=150;
    monkey.depth = banana.depth + 1;
       // banana.debug=true;
    banana.setCollider("circle",0,0,250);
  foodGroup.add(banana);
  }
}
function obstacles(){
  if((frameCount%300)===0){
  obstacle=createSprite(400,268);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-5;
  obstacle.scale=0.15;
  obstacle.lifetime=150;
   // obstacle.debug=true;
    obstacle.setCollider("circle",0,0,200);
  obstacleGroup.add(obstacle);
  }
}






