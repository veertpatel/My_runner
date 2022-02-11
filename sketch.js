var dogImg,backgroundImg,runnerImg, carImg,glassImg,coneImg,car1Img,car2Img,car3Img,car4Img,stopDogImg,fallImg,birdImg;
var scene,dog,car,water,cone,block;
var lane1;
var y;
var score = 0;
var count = 0;
var cars;
var CT; 
var CV; 
var lane2;
var lane2middle;
var gameState = "play";
function preload(){
    backgroundImg = loadImage("/assets/images/background.jpg");

    dogImg = loadImage("/assets/images/dog2.gif");
    runnerImg = loadImage("/assets/images/runner.gif");
    car1Img = loadImage("/assets/images/car_1.gif");
    car2Img = loadImage("/assets/images/car_2.gif");
    car3Img = loadImage("/assets/images/car_3.gif");
    stopDogImg = loadImage("/assets/images/stopdog.jpg")
    fallImg = loadImage("/assets/images/fall.png")

    glassImg = loadImage("/assets/images/glass.png");
    coneImg = loadImage("/assets/images/cone.png");
    birdImg = loadImage("/assets/images/birds1.gif");
    cars = new Group()



}

function setup() {
    createCanvas(windowWidth, windowHeight);
    road = Math.round((360 * windowHeight)/480);
    lane2 = Math.round((410 * windowHeight)/480);
    lane2middle = Math.round((385 * windowHeight)/480);
    backgroundImg.resize(windowWidth,windowHeight)
    scene = createSprite(windowWidth/2,windowHeight/2);
    scene.addImage(backgroundImg);
    
    dog = createSprite(100,height);
    dog.setCollider("rectangle",dog.width/3,0,dog.width, dog.height,0 );
    runner = createSprite(300,200);
    block = createSprite(width/2,lane2,width + 50,50)
    block.visible = false;
    resetGame();
}

function resetGame()
{
    cdog.addImage(dogImg);
    dog.scale = 0.1;
    dog.x = 100;
    runner.x = 300;
    dog.y = lane2middle - (dog.height * dog.scale) / 2 ;
    dog.mirrorX(-1);
    dog.setCollider("rectangle",dog.width/3,0,dog.width, dog.height,0 );
    runner.addImage(runnerImg);
    runner.scale = 0.5;
    runner.rotation = 0;
    runner.y = lane2middle - (runner.height*runner.scale)/2;
    runner.setCollider("rectangle",0,0,runner.width - Math.round(runner.width/3), runner.height - Math.round(runner.height/10),0 );
    count = 0;
    cars.destroyEach();
    gameState = "play";
}

function draw() {
    background("black")
    
    if(gameState == "play") {
        spawnCars();

        if( keyDown("SPACE")  && runner.y >= windowHeight * 0.2 )  {
            runner.velocityY = -30;
            

        }
        if(cars.isTouching(dog))
        {

            dog.y = Math.round((160 * windowHeight)/480);
        }
        count++;
        score = Math.round(count/30);
        runner.velocityY = runner.velocityY + 4;
        dog.velocityY = dog.velocityY + 2;

        if(cars.isTouching(runner)) {
            gameState = "end"
            runner.velocityY = 0;
            dog.velocityY = 0;
            runner.y =  lane2middle - (runner.height*runner.scale)/2;
            dog.y =  lane2middle - (dog.height*dog.scale)/2;    
        }
    

    }

    
      if(gameState === "end")   {
          cars.setVelocityXEach(0);
          runner.addImage(fallImg);
          runner.rotation = -90;
          dog.depth = runner.depth + 1;
          
          dog.addImage(stopDogImg)
          dog.x =  runner.x - Math.round(runner.width/2);
      }
   dog.collide(block);
   runner.collide(block);

 drawSprites();

 textSize(20);
 fill("black")
 text("Score: "+ score,30,30);
 if(gameState === "end")
 {
     textSize(40)
    text("GAME OVER \n Click to Play Again",windowWidth/2, windowHeight/2);
 }
}

function mousePressed()
{

    if(gameState === "end")
        resetGame();
}

function spawnCars()    {
    if(frameCount%320 === 0)
    {
        var  birds = createSprite(windowWidth+10,0);
        birds.addImage(birdImg);
        birds.scale = .5;
        birds.y = 5 + Math.round(birds.height * 0.5)/2;
        birds.velocityX = -4
    } 
    if(frameCount%90 === 0) {
        CT = Math.round(random(1,3));
        CV = Math.round(random(1,2));
        var  car = createSprite(windowWidth+10,windowHeight);
        var scale = 1;        


        if(CT == 1) {
            car.addImage(car1Img);
            car.scale = 0.15;
            scale = 0.15;
            car.mirrorX(-1);
            
            
        }
        if(CT == 2) {
            car.addImage(car2Img);
            car.scale = 0.4;
            scale = 0.4;
        }
        if(CT == 3) {
            car.addImage(car3Img);
            car.scale = 0.3;
            scale = 0.3;
        }
        if(CV == 1) {
            car.y = Math.round(road - (car.height * scale)/2);
            car.velocityX = -16;
            console.log("road =" + road);
        }
        else
        {
            var ypos = Math.round(lane2 - (car.height * scale)/2);
            car.y = ypos;
            car.velocityX = -25;
            
        }
        cars.add(car)
    }
}   

