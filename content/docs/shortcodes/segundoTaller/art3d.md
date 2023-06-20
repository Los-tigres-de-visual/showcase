# 3D ART

## **Introducción**

<div style="text-align: justify;">
Para este ejercicio se pretende crear un espacio 3D en donde sea posible moverse a través del teclado, al tiempo que se observa una figura 3D que a su vez mantiene su posición frente al observador, rota sobre su eje y su coordenadas propias, dando la sensación de pasear a su lado. Adicionalmente, esta imagen 3D contiene las propiedades vistas en la sección "Procedural Texturing" que viene incluida con la utilización de shaders.
<br><br>

</div>

## **Antecedentes**

<div style="text-align: justify;">
P5.js es una biblioteca de JavaScript que facilita la creación de gráficos y animaciones interactivas, incluyendo la visualización de elementos en un espacio tridimensional.

Para trabajar en un espacio 3D se utilizan las funciones y métodos proporcionados por la biblioteca. 

{{< details "Configuración inicial" close >}}
<div style="text-align: center;">

### *Configuración inicial*
</div>
<div style="text-align: justify;">
En el código de P5.js, se utiliza la función setup() para realizar la configuración inicial del programa. Para trabajar en un espacio 3D, se debe incluir la instrucción createCanvas() con tres parámetros: el ancho, el alto y el modo de renderizado. El modo de renderizado se establece como WEBGL, lo que indica que se trabajará en un espacio tridimensional.
</div>
{{< /details >}}

{{< details "Coordenadas tridimensionales" close >}}
<div style="text-align: center;">

### *Coordenadas tridimensionales*
</div>
<div style="text-align: justify;">
En P5.js, se utiliza un sistema de coordenadas tridimensional, donde se pueden especificar las posiciones de los objetos en términos de coordenadas X, Y y Z. La coordenada X representa la posición horizontal, la coordenada Y representa la posición vertical y la coordenada Z representa la posición en profundidad (hacia o desde la cámara).
</div>
{{< /details >}}

{{< details "Cámara" close >}}
<div style="text-align: center;">

### *Cámara*
</div>
<div style="text-align: justify;">
En un espacio 3D, se utiliza una cámara para determinar la perspectiva y la vista de la escena. En P5.js, se puede crear una cámara utilizando la función createCamera(). La cámara se puede posicionar y orientar en el espacio 3D para controlar la vista de los objetos.
</div>
{{< /details >}}

{{< details "Renderización de objetos 3D" close >}}
<div style="text-align: center;">

### *Renderización de objetos 3D*
</div>
<div style="text-align: justify;">
En P5.js, se pueden crear y renderizar objetos 3D utilizando diversas formas y métodos proporcionados por la biblioteca. Algunas de las formas básicas incluyen cubos (box()), esferas (sphere()), planos (plane()) y cilindros (cylinder()). Estas formas se pueden posicionar en el espacio 3D utilizando las coordenadas tridimensionales mencionadas anteriormente.
</div>
{{< /details >}}

{{< details "Luces y materiales" close >}}
<div style="text-align: center;">

### *Luces y materiales*
</div>
<div style="text-align: justify;">
Para agregar realismo a la escena 3D, P5.js permite configurar luces y materiales. Las luces pueden ser direccionales, puntuales o focales, y se utilizan para iluminar los objetos en el espacio 3D. Los materiales controlan las propiedades visuales de los objetos, como el color, la textura y el brillo.
</div>
{{< /details >}}

{{< details "Animación y actualización" close >}}
<div style="text-align: center;">

### *Animación y actualización*
</div>
<div style="text-align: justify;">
P5.js proporciona una función llamada draw() que se ejecuta continuamente en un bucle. En esta función, se pueden realizar actualizaciones y animaciones en el espacio 3D. Por ejemplo, se pueden cambiar las posiciones de los objetos, rotar la cámara, aplicar transformaciones y realizar cálculos de interacción.
</div>
{{< /details >}}

<br>

</div>


## **Desarrollo**

<div style="text-align: justify;">

Para el desarrollo del proyecto en 3D se tomaron 4 planos con diferentes texturas para simular un cuarto. 

Se creó una sola cámara que se movería con respecto a coordenadas sinusoidales sobre el eje x, con coseno para el eje y y con una posición relativa para el eje z, todo ello mezclado con la activación del teclado para el desplazamiento por el cuarto.

Luego, dentro de una función se guardó un objeto 3D que ya tenía su movimiento propio, para ser la pieza central en el cuarto.

Se utilizaron funciones como push() y pop() para evitar afectaciones entre las diferentees figuras y para evitar mezclas entr las texturas, permitiendo a cada una conservar su textura única.

Adicional se generó un luz ambiental basada en un "Punto de Luz2 o "pointLight" que se activa con el movimiento del mouse.

A continuación se presenta el código base:


{{< details "Código base" close >}}
<div style="text-align: center;">

### *Código para el escenario 3D*
</div>
<div style="text-align: justify;">
{{< highlight js >}}
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
{{< /highlight >}}
</div>
{{< /details >}}



Para caminar por el espacio 3D, da un clic sobre la pantalla y utiliza las teclas W (arriba), S (abajo), A (izquierda), D (derecha).
<br><br>

{{< p5-iframe sketch="/showcase/sketches/art3d/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="925" height="625" >}}




## Conclusiones

El código que hemos desarrollado en `p5` para simular caminar sobre un espacio 3D, permite el movimiento hacia la izquierda, derecha, al frente y atrás. 

Se logra separar la figura en 3D con su respectivo shader activado respetando el movimiento del espectador a través de la "sala".

Se logra añadir una óptima iluminación que concuerda con el movimiento del mouse, representando una buena experiencia para el público.

## Trabajo futuro
El trabajo futuro para este proyecto se denota en mejoras en el movimiento como rotaciones de cabeza que puede ser "arriba - abajo" e "izquierda -  derecha".

Adicionalmente, se plantea expandir el mundo hasta convertirlo en un museo de trabajos previos, y lograr activar las colisiones contra las paredes para evitar pasar de largo sobre ellas.
