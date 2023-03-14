let img;
let f1;
let f2;
let coralDer;
let coralIzq;
let woman;
let ojoIzq;
let ojoDer;
let ojoXIzq;
let ojoYIzq;
let ojoXDer;
let ojoYDer;
let corales;
let estrella;
let angle = 0.0;
let x;
let fish = [];

function preload(){
  img = loadImage('/showcase/sketches/Depth/assets/Fondo.jpg');
  corales = loadImage('/showcase/sketches/Depth/assets/Corales.png');
  f1 = loadImage('/showcase/sketches/Depth/assets/Pezmoradoizq.png');
  f2 = loadImage('/showcase/sketches/Depth/assets/Pezmoradoder.png');
  woman = loadImage('/showcase/sketches/Depth/assets/Woman.png');
  ojoIzq = loadImage('/showcase/sketches/Depth/assets/Ojoder.png');
  ojoDer = loadImage('/showcase/sketches/Depth/assets/Ojoizq.png');
  coralDer = loadImage('/showcase/sketches/Depth/assets/CoralDer.png');
  coralIzq = loadImage('/showcase/sketches/Depth/assets/CoralIzq.png');
  estrella = loadImage('/showcase/sketches/Depth/assets/Estrellademar.png');
}

function setup() {
  createCanvas(900, 600, WEBGL);
  //imageMode(CORNER);
  imageMode(CENTER);
  rectMode(CENTER);
  
  //Blur
  estrella.filter(BLUR, 10);
  corales.filter(BLUR, 3);
  woman.filter(BLUR, 2);
  ojoIzq.filter(BLUR, 2);
  ojoDer.filter(BLUR, 2);
  
  //Partículas de peces
  for(let i = 0; i < 3; i++){
    let m = [];
    let numLimit = 10 - i*4;
    for(let j = 0; j < numLimit; j++){
      m.push(new Fish(30+50*i, 50+55*i));
    }
    fish.push(m);
    m = [];
  }  
}

function draw() {
  background(2, 53, 156);

  let camXFondo = map(mouseX, 0, width, -100, 100);
  let camYFondo = map(mouseY, 0, height, -90, 90);
  let camXf1 = map(mouseX, 0, width/2, -50, 50);
  let camYf1 = map(mouseY, 0, height/2, -10, 10);
  let camXCorales = map(mouseX, 0, width, -50, 50);
  let camYCorales = map(mouseY, 0, height, -80, 80);
  
  //Fondo
  camera(camXFondo, camYFondo, (height/2) / tan(PI/6), camXFondo, camYFondo, 0, 0, 1, 0);
  image(img, 0, 0, 1200, 900);
  
  //Movimiento peces fondo
  camera(camXf1, camYf1, (height/2) / tan(PI/6), camXf1, camYf1, 0, 0, 1, 0);
  angle = angle + 0.02;
  
  //Estrella de mar
  let k = abs(sin(angle/8)/2);
  rotate(k);
  image(estrella, 450, -150, 100, 100);
  
  //Rotación peces
  let c = cos(angle)/4;
  rotate(c);
  
  //Partículas de peces
  for(let i = 0; i < fish.length; i++){
    for(let j = 0; j < fish[i].length; j++){
      fish[i][j].show(fish.length*3 - i*4);
      fish[i][j].ascend();
      fish[i][j].reposition();
    }
  }
  
  
  
  //Woman
  ojoXIzq = map(mouseX, 0, width, -25, -15);
  ojoYIzq = map(mouseY, 0, height, -18, -13);
  ojoXDer = map(mouseX, 0, width, 75, 85);
  ojoYDer = map(mouseY, 0, height, -18, -13);
  camera(camXCorales, camYCorales, (height/2) / tan(PI/6), camXCorales, camYCorales, 0, 0, 1, 0);
  image(woman, 30, -10, 500, 650);
  image(ojoIzq, ojoXIzq, ojoYIzq, 20, 20);
  image(ojoDer, ojoXDer, ojoYDer, 20, 20);
  image(coralDer, 180, 300, 400, 250);
  image(coralIzq, -180, 300, 400, 250);
  fill(2, 53, 156, 121);
  rect(0, 0, 1200, 900);
  
  
  //Corales
  camera(camYCorales, camXCorales, (height/2) / tan(PI/6), camYCorales, camXCorales, 0, 0, 1, 0);
  image(corales, 0, 0, 1200, 700);
  
  
  //Partículas de peces
  for(let i = 0; i < fish.length; i++){
    for(let j = 0; j < fish[i].length; j++){
      fish[i][j].show(fish.length*2 - i);
      fish[i][j].ascend();
      fish[i][j].reposition();
    }
  }
  	
  //Rect azul filtro
  camera(0, 0, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);
  fill(157, 211, 250, 80);
  rect(0, 0, 1200, 900);
  
  

}


