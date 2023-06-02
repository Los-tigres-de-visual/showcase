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
  
  let cam;
  let delta = 0.01;

  function preload() {
    floor = loadImage('/showcase/sketches/art3d/assets/floor.jpg')
  }
  
  function setup() {
    createCanvas(925, 625, WEBGL);
    camera(0, 300, 300, 0, 0, 0, 0, 0, -1);
  }
  
  function draw() {
    background(0);
    orbitControl();

    let camTheta = mouseX/100;
    let camDist = 100
    
    camera(camDist * cos(camTheta) + player.pos.x, 
           camDist * sin(camTheta) + player.pos.y, 
           camDist/1.5 + player.pos.z, 
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
    frame(1000, 1)
    
    texture(floor)
    noStroke()
    plane(950)
    
    fill('blue')
    
    translate(0, 0, 25)
    
    // Player movement
    translate(player.pos.x,
              player.pos.y, 
              player.pos.z)
    rotateX(PI/2)
    frame(100, 5)
    fill(0, 0, 255, 200)
    noStroke()
    cylinder(20, 50)
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