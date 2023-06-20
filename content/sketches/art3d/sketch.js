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
  let wall;
  let cam;
  let delta = 0.01;

  function preload() {
    floor = loadImage('/showcase/sketches/art3d/assets/floor.jpg');
    wall = loadImage('/showcase/sketches/art3d/assets/wall1.jpg');
    // Procedural
    romboshader=readShader('/showcase/sketches/art3d/newproced.frag');
    rgbshader=readShader('/showcase/sketches/art3d/newrgb.frag');
    // Fin Procedural
  }
  
  function setup() {
    createCanvas(925, 625, WEBGL);
    camera(0, 300, 300, 0, 0, 0, 0, 0, -1);
    rectMode(CENTER);
    angleMode(DEGREES);

    // Procedural
    pg = createGraphics(1000, 1000, WEBGL);
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

    // move your mouse to change light position
    let locX = (mouseX - width / 2) * 0.5;
    let locY = (mouseY - height / 2) * 0.5;
    pointLight(250, 250, 250, locY, locX, 150);

    let camTheta = mouseX/100;
    let camThetaY = mouseY/(height / 2);
    let camDist = 100

    camera(camDist * cos(camThetaY) + player.pos.x, 
           camDist * sin(camThetaY) + player.pos.y, 
           camDist/1.5 * cos(camTheta) + player.pos.z,
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
    frame()
    
    push()
    texture(floor)
    noStroke()
    plane(1550)  
    // Player movement
    translate(player.pos.x,
              player.pos.y, 
              player.pos.z)
    pop()
    push()
    ambientLight(120);
    translate(-500, 0, 250)
    rotateY(90)
    texture(wall)
    plane(600, 1500)
    pop()
    push()
    ambientLight(80);
    translate(0, -750, 250)
    rotateY(90)
    rotateX(-90)
    texture(wall)
    plane(600, 1500)
    pop()
    push()
    ambientLight(80);
    translate(0, 750, 250)
    rotateY(90)
    rotateX(90)
    texture(wall)
    plane(600, 1500)
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
  

  function frame(){
    push()
    translate(-190, 0, 0);
    rotateZ(-45)
    texture(wall);
    stroke(80)
    box(100,50)
    pop()

    push()
    translate(-190, 0, 130);
    scale(0.5);
    rotateX(-90);

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
    
    push()
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
    pop()
    pop()

    pop()
    // Fin Procedural

    
    
  }

  function waves() {
    push()
    rotateX(60)
    noFill()
    stroke(255)
    for(var i = 0; i < 50; i++){
      var r = map(sin(frameCount / 2), -1, 1, 100, 200)
      var g = map(i, 0, 50, 100, 200)
      var b = map(cos(frameCount), -1, 1, 200, 100)
      stroke(r, g, b)
      rotate(frameCount / 20)
      beginShape()
      for(var j = 0; j < 360; j+=60){
        var rad = i * 5
        var x = rad * cos(j)
        var y = rad * sin(j)
        var z = sin(frameCount * 2 + i * 5 ) * 50
        vertex(x, y, z)
      }
      endShape(CLOSE)
    }
    pop()
  }

  // Procedural
  function trying(){
    pg.shader(rgbshader)
    pg.emitResolution(rgbshader)
  }
  // Fin Procedural