//creación figura 3d
let pg;
let romboshader;
let rgbshader;
let angle=0

function preload(){
  romboshader=readShader('new.frag');
  rgbshader=readShader('rgb.frag');
}

function setup() {
  
  createCanvas(400, 400, WEBGL);
  pg = createGraphics(400, 400, WEBGL);

  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(rgbshader);
  
  pg.emitResolution(rgbshader)
  romboshader.setUniform('u_zoom', 3);
  rgbshader.setUniform('u_zoom', 3);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
  trying()
}


function draw() {
  
  rotateY(angle-0.3)
  
  background(0);
  orbitControl();
  angleMode(DEGREES);
  
  /*
  beginShape()
  
  sphere(50,50)
  translate(80,0)
  rotateZ(-90)
  cone(30,70)
  
  translate(0,-160)
  rotateZ(180)
  cone(30,70)
  
  translate(80,-80)
  rotateZ(-90)
  cone(30,70)
  
  translate(0,-160)
  rotateZ(180)
  cone(30,70)
  
  translate(0,-80,80)
  rotateX(90)
  cone(30,70)
  
  translate(0,-160,0)
  rotateX(180)
  cone(30,70)
  
  
  endShape(CLOSE)*/
  //box(100, 200);
  
  push()
  rotateZ(angle)
  torus(100,15)
  pop()
  
  push()
  rotateY(45)
  translate(0,120)
  torus(50,7)
  
  push()
  rotateY(-90)
  translate(0,50)
  torus(25,3)
  pop()
  pop()
  
  push()
  rotateX(45)
  translate(100,0)
  torus(25,3)
  
  push()
  rotateX(angle)
  translate(40,0,-10)
  sphere(15)
  pop()
  pop()
  
  push()
  rotateX(-45)
  translate(-100,0)
  torus(25,3)
  
  push()
  translate(-30,30,10)
  rotateX(70)
  cone(10,23)
  pop()
  pop()
  
  
  rotateX(angle)
  rotateY(angle)
  rotateZ(angle)
  
  beginShape()
  box(80)
  rotateX(45)
  box(80)
  rotateY(45)
  box(80)
  rotateZ(45)
  box(80)
  endShape(CLOSE)
  angle+=0.7
  
  
}

function trying(){
  pg.shader(rgbshader)
  pg.emitResolution(rgbshader)
}