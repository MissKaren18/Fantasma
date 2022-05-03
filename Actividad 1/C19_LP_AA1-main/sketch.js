var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //crear grupos
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  //crear animacion de ghost
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300;
  }

  //Movimiento de fantasma izquierda, derecha y saltando
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }

  if(keyDown("space")){
    ghost.velocityY = -5;
  }

  //gravedad para que baje el fantasma
  ghost.velocityY += 0.8;

  //descansar al fantasma si toca las barandillas por arriba
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }

  //perder si el fantasme toca las barandillas desde abajo
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    
  }

    spawnDoors();
    drawSprites();
}


function spawnDoors(){
  // aparecer las puertas y barandillas de la torre cada 240 cuadros
  if(frameCount % 240 === 0){

    //Puertas, crear una variable local para door
    var door = createSprite(200, -50);
    door.addImage(doorImg);

    //Barandillas, crear una variable local para climber
    var climber = createSprite (200,10);
    climber.addImage(climberImg);

    //Barandillas invisibles, crear una variable local para los bloques invisibles
    var invisibleBlock = createSprite (200,15);
    // se le manda el valor del ancho de climber a invisibleBlock
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    //posicion en x de manera aleatoria 
    door.x = Math.round(random(120,400));
    door.velocityY = 1;

    //climber toma la posicion de x de door
    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    //profundidad a los objetos
    ghost.depth = door.depth;
    ghost.depth +=1;

    //asignar tiempo de vida a la variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //agregar cada puerta al grupo
    doorsGroup.add(door);
    climbersGroup.add(climber);

    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);



  }
}
