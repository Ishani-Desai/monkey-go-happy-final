var bananagroup, bananaimage;
var obstaclegroup, obstacleimage;

var monkey, monkey_running;
var ground;

var backdrop,backdrop1;

var score = 0;

var survivalTime = 0;


function preload() {
  backdrop1 = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("stone.png");
  
   bgimg = loadImage("jungle.jpg");

  bananaimg = loadImage("banana.png");

  obsimg = loadImage("stone.png");
  
  collided = loadImage("Monkey_05.png");

}

function setup() {
  createCanvas(600, 400);
  
  backdrop=createSprite(200, 150);
  backdrop.addImage("backdrop", bgimg);
  backdrop.scale = 2.5
 // backdrop.velocityX = -3;
  //backdrop.x = backdrop.width / 2;

  monkey=createSprite( 60, 320, 10, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.2;

  ground=createSprite(300, 380, 600, 10 );
  ground.visibility = false;
  
  bananagroup=new Group();
  obstaclegroup=new Group();
}

function draw() {


  if (keyWentDown("space")) {
    monkey.velocityY = -15;
  }

  if (bananagroup.isTouching(monkey)) {
    bananagroup.destroyEach();
    score = score + 2
  }

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }
  if (obstaclegroup.isTouching(monkey)) {
    monkey.scale = 0.2
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  if (backdrop.x < 0) {
    backdrop.x = backdrop.width / 2;
  }


  createBananas();
  createObstacles();
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white")
  text("score: " + score, 300, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / 60);
  text("Survival Time: " + survivalTime, 100, 50);
}

function createBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 150);
    banana.addImage("Banana",bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -5;

   // banana.y = Math.random(120, 200);
    banana.lifetime = 300;

    monkey.depth = banana.depth + 1;
    bananagroup.add(banana);
  }
}

function createObstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(400, 370);
    obstacle.addImage("Stone", obstacleimage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;

   // obstacle.x = Math.round(random());
    obstacle.lifetime = 300;

    obstaclegroup.add(obstacle);
  }
}