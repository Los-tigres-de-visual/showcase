let player = {
    pos: {
      x: 0,
      y: 0,
      z: 0
    },
    state: 'move'
  }
  
  let keysDown = {
    LR: [0, 0],
    UD: [0, 0],
    v: [0, 0]   // [ sum(LR), sum(UD)]
  }
  
  // Procedural
  let pg;
  let romboshader;
  let rgbshader;
  let angle=0;
  // Fin Procedural
  let floor;
  let cam;
  let delta = 0.01;

  function preload() {
    floor = loadImage('/showcase/sketches/art3d/assets/floor.jpg')
    // Procedural
    romboshader=readShader('/showcase/sketches/art3d/newproced.frag');
    rgbshader=readShader('/showcase/sketches/art3d/newrgb.frag');
    // Fin Procedural
  }
  
  function setup() {
    createCanvas(925, 625, WEBGL);
    camera(0, 300, 300, 0, 0, 0, 0, 0, -1);
    rectMode(CENTER);

    // Procedural
    pg = createGraphics(100, 100, WEBGL);
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
    // Fin Procedural
  }
  
  function draw() {
    background(0);
    orbitControl();

    translate(0, 0, 280);
    rotateX(-50)
    // Procedural
    rotateY(angle-0.3)
    angleMode(DEGREES);
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
    // Fin Procedural
    
    push()

    let camTheta = mouseX/100;
    let camThetaY = mouseY/(height/1.2);
    let camDist = 100

    camera(camDist * cos(camTheta) + player.pos.x, 
           camDist * sin(camTheta) + player.pos.y, 
           camDist/1.5 * cos(camThetaY) + player.pos.z, 
           player.pos.x,
           player.pos.y, 
           50 + player.pos.z, 
           0, 0, -1)
           let vmag = dist(0, 0, keysDown.v[0], keysDown.v[1]);
    
    // Normalize vmag to 1
    vmag = vmag > 1 ? 1 : vmag;  
    
    vth = atan2(keysDown.v[0], keysDown.v[1])
    
    player.pos.x -= vmag * cos(vth + camTheta)
    player.pos.y -= vmag * sin(vth + camTheta)   
    
    // // 3D coordinates
    //frame(1000, 1)

    texture(floor)
    noStroke()
    plane(1550)
    
    //fill('blue')
    
    translate(0, 0, 25)
    
    // Player movement
    translate(player.pos.x,
              player.pos.y, 
              player.pos.z)
    
    rotateX(PI/2)
    //frame(100, 5)
    //fill(220, 120, 220, 200)
    //noStroke()
    //cylinder(20, 50)
    //plane(50,200)
    //fill(255)
    //rect(0,0,width, 50, 5)
    
    pop()
    push()
    //texture(img);
    textureMode(NORMAL);
    beginShape();
    vertex(-40, -40, 500, 0);
    vertex(40, -40, 501, 0);
    vertex(40, 40, 501, 1);
    vertex(-40, 40, 500, 1);
    endShape();
    pop()
  }
  
  function keyPressed() {
    // W
    if(keyCode == "87"){
      keysDown.UD[0] = 1;
    }
    // S
    if(keyCode == "83"){
      keysDown.UD[1] = -1;
    }
    // A
    if(keyCode == "65"){
      keysDown.LR[0] = -1;
    }
    // D
    if(keyCode == "68"){
      keysDown.LR[1] = 1;
    }
    keysDown.v = [keysDown.LR[0] + keysDown.LR[1],
                  keysDown.UD[0] + keysDown.UD[1]]
    console.log(keysDown.v)
    
    if(keyCode == '32'){
      
    }
  }
  
  function keyReleased() {
    // W
    if(keyCode == "87"){
      keysDown.UD[0] = 0;
    }
    // S
    if(keyCode == "83"){
      keysDown.UD[1] = 0;
    }
    // A
    if(keyCode == "65"){
      keysDown.LR[0] = 0;
    }
    // D
    if(keyCode == "68"){
      keysDown.LR[1] = 0;
    }
    keysDown.v = [keysDown.LR[0] + keysDown.LR[1],
                  keysDown.UD[0] + keysDown.UD[1]]
    console.log(keysDown.v)
  }
  
  // n = lenght, w is strokeWeight
  function frame(n, w){
    // 3D coordinates
    fill(0)
    strokeWeight(w)
    stroke('red')
    line(0,0,0, n, 0, 0)
    stroke('green')
    line(0,0,0, 0, n, 0)
    stroke('blue')
    line(0,0,0, 0, 0, n)
  }

  // Procedural
  function trying(){
    pg.shader(rgbshader)
    pg.emitResolution(rgbshader)
  }
  // Fin Procedural