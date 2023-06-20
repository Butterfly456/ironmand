var ironman,ironmanImg;
var citybackgroundImg;
var stone1, stone2, stone3, stone4, stone5, stone6,stone1Img, stone2Img, stone3Img, stone4Img, stone5Img, stone6Img;
var alien, alien2, alien3, alien4, alien5, alienImg;
var invisble_block1, invisble_block2, invisble_block3, invisble_block4;
var lives = 3;
var thanos, thanosImg;
var randX, randY;
var bullet, bulletImg;
var fireball,fireballImg;
var backgroundImg
var gameState = "START"

function preload(){
    ironmanImg = loadImage("ironman.png");
    stone1Img = loadImage("1.png");
    stone2Img = loadImage("2.png");
    stone3Img = loadImage("3.png");
    stone4Img = loadImage("4.png");
    stone5Img = loadImage("5.png");
    stone6Img = loadImage("6.png");
    alienImg = loadImage("alien.png");
    thanosImg = loadImage("thanos.png");
    bulletImg = loadImage("bullet.png");
    fireballImg = loadImage("fireball.png");
    backgroundImg = loadImage("background.png")
}

function setup() {
    //creating the canvas for the game
    createCanvas(1200,800);
    //creating edges 
    edges = createEdgeSprites();

    //random positioning of Thanos
    var randX =  Math.round(random(1,1200));
    var randY =  Math.round(random(1,750));

    //creating all the sprites
    ironman = createSprite(640,750,10,10);
    ironman.addImage(ironmanImg);
    ironman.scale = 0.2;
    

    //creating sprites for the infinity stones
    stone1 = createSprite(990, 720, 10, 10);
    stone1.addImage(stone1Img);
    stone1.scale = 0.2;
    stone2 = createSprite(20, 670, 10, 10);
    stone2.addImage(stone2Img);
    stone2.scale = 0.2;
    stone3 = createSprite(292, 180, 10, 10);
    stone3.addImage(stone3Img);
    stone3.scale = 0.2;
    stone4 = createSprite(995, 180, 10, 10);
    stone4.addImage(stone4Img);
    stone4.scale = 0.3;
    stone5 = createSprite(640, 30, 10, 10);
    stone5.addImage(stone5Img);
    stone5.scale = 0.15;

    stone6 = createSprite(640, 420, 10, 10);
    stone6.addImage(stone6Img);
    stone6.scale = 0.15;

    //all aliens being made
    alien = createSprite(200,670,10,10);
    alien.addImage(alienImg);
    alien.scale = 0.17;
    alien.velocityX = 6;
    alien2 = createSprite(290,200,10,10);
    alien2.addImage(alienImg);
    alien2.scale = 0.17;
    alien2.velocityY = 6;
    alien3 = createSprite(990,40,10,10);
    alien3.addImage(alienImg);
    alien3.scale = 0.17;
    alien3.velocityY = 6;
    alien4 = createSprite(990,800,10,10);
    alien4.addImage(alienImg);
    alien4.scale = 0.17;
    alien4.velocityY = 6;
    alien5 = createSprite(140,125,10,10);
    alien5.addImage(alienImg);
    alien5.scale = 0.17;
    alien5.velocityX = 6;

    //creating the blocks for aliens to bounce off of the aliens
    invisble_block1 = createSprite(300,100, 600, 10);
    invisble_block1.visible = false;
    invisble_block2 = createSprite(300,460, 600, 10);
    invisble_block2.visible = false;

    //thanos being made :)
    thanos = createSprite(randX, randY, 10,10);
    thanos.addImage(thanosImg);
    thanos.scale = 0.2;
    thanos.velocityX = 3;


}
function draw() {
    //game background image
    background(backgroundImg);

    //spawning the bullets ever 40 frames coming out of thanos
    if (frameCount % 40 === 0) {
        bullet = createSprite(thanos.x, thanos.y, 10,10);
        bullet.addImage(bulletImg);
        bullet.scale = 0.1;
        bullet.velocityY = -6;
    }
    
    //moving ironman in different directions based on keys :)
    if(keyDown("right_arrow")){
        ironman.x += 5;
    }
    if(keyDown("up_arrow")){
        ironman.y -= 5;
    }
    if(keyDown("down_arrow")){
        ironman.y += 5;
    }
    if(keyDown("left_arrow")){
        ironman.x -= 5;
    }

    fireball = createSprite(ironman.x, ironman.y, 10,10);

    //creating fireballs (that go different directions)from 
    //ironmans position using arrow keys
    if (keyDown("a")) {
        fireball.addImage(fireballImg);
        fireball.scale = 0.1;
        fireball.velocityX = -6; 
    }
    if (keyDown("w")) {
        fireball.addImage(fireballImg);
        fireball.scale = 0.1;
        fireball.velocityY = -6;  
    }
    if (keyDown("s")) {
        fireball.addImage(fireballImg);
        fireball.scale = 0.1;
        fireball.velocityX = 6;  
    }
    if (keyDown("z")) {
        fireball.addImage(fireballImg);
        fireball.scale = 0.1;
        fireball.velocityY = 6;
    }
    
   
    alien.bounceOff(edges);
    alien2.bounceOff(invisble_block1);
    alien2.bounceOff(invisble_block2);
    alien3.bounceOff(edges);
    alien4.bounceOff(edges);
    alien5.bounceOff(edges);
    thanos.bounceOff(edges);

    if(ironman.isTouching(alien||alien2||alien3||alien4||alien5)){
        lives -= 1
    }
    if(ironman.isTouching(thanos)){
        ironman.remove();
        thanos.remove();
        alien1.remove();
        alien2.remove();
        alien3.remove();
        alien4.remove();
        background("black");
    }
    if(thanos.isTouching(fireball)){
        thanos.remove();
        alien.velocityX *= 0.5;
        alien2.velocityY *= 0.5;
        alien3.velocityY *= 0.5;
        alien4.velocityY *= 0.5;
        alien5.velocityX *= 0.5;
    }

    drawSprites();
}