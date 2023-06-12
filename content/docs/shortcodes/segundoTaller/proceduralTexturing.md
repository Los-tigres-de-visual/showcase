# Procedural Texturing

## Introducción:
A grandes rasgos se refiere al proceso de generar texturas de forma automática basándose en algoritmos y procesos matemáticos, en lugar de depender de texturas concretas. Esta técnica da ventajas como mejor rendimiento, alta resolución y flexibilidad para aplicar dichas texturas y adicionalmente permite manipular algunas características de las texturas de forma dinámica.
## Antecedentes:
### Textura
En computación, una textura es una imagen digital en un espacio (u, v) que se aplica a una figura para cambiar su superficie y darle detalles. Las texturas son especialmente utilizadas en áreas como los videojuegos, la animación, el diseño arquitectónico, simulaciones y realidad virtual. Para aplicar las texturas se usan técnicas de mapeo que permiten *cubrir* objetos diferentes con una misma textura.

![textura](/showcase/sketches/proceduralTexturing/textura.PNG)

{{< hint info >}}
[Referencia](https://www.fing.edu.uy/inco/cursos/cga/Clases/2018/TexturasMelisaTechera.pdf)
{{< /hint >}}

### Shader
Un shader es un programa que permite manupular y controlar el cómo se ven y comportan algunos aspectos visuales en la computación, entre los que podemos encontrar luces, sombras, colores y texturas. Los shaders pueden actuar a diferentes niveles como vértices o pixeles. Es una técnica muy versatil que permite hacer muchas cosas diferentes. Existen múltiples aplicaciones y áreas en las que se aplican los shaders, entre las que se destacan los videojuegos, el post-procesamiento en el cine y en general la creación de imágeness digitales.

{{< hint info >}}
[Referencia](https://en.wikipedia.org/wiki/Shader)
{{< /hint >}}

### Texturas procedurales
Como se dijo anteriormente una textura procedural, es una textura generada de forma automática usando algoritmos. Estas texturas presentan ventajas como el poco espacio en memoria que necesitan, lo pequeño que puede ser el código que las genera y lo fácil que puede ser aplicarlas a diferentes figuras de diferente tamaño. Por otro lado, esta técnica presenta algunas desventajas como que puede llegar a ser compleja de aplicar o entender para quien no está familiarizado con la programación, puede tener un alto costo computacional en el GPU y en patrones más complejos el debugging puede complicarse igualmente.

{{< hint info >}}
[Referencia](https://www.uv.es/mperezm/proyectos/curso_13_14/presentaciones/Neira_Alvarado__Luis_Ignacio_TexProceduralGPU.pdf)
{{< /hint >}}

Existen múltiples procesos diferentes bajos los que se pueden crear texturas procedurales. Los shaders son herramientas perfectas para crear texturas procedurales, pues se puede aplicar cambios y patrones a nivel de pixeles que fácilmente se mapean a diferentes figuras y superficies. Además, como el shader permite manipular múltiples características de la textura, lo hace todo más versatil y con la capacidad de cambiar en tiempo real.

![patron](/showcase/sketches/proceduralTexturing/patron.png)
{{< hint info >}}
[Referencia](https://thebookofshaders.com/09/)
{{< /hint >}}

### Figuras 3D

P5 es el lenguaje usado para este trabajo, entonces hablaremos un poco sobre las geometrías que se pueden tener en él. P5 tiene un entorno 3D en el que se pueden dibujar figuras igualmente tridimensionales. Actualmente existen seis figuras primitivas fáciles de dibujar: cono, esfera, toroide, cubo (caja), cilindro y plano. Al cambiar algunos de los parámetros en las funciones que las crean, también podemos cambiar algunas de sus dimensiones.

{{< p5-global-iframe id="colorModels" width="710" height="440" >}}

function setup() {
  createCanvas(1200, 400, WEBGL);
}

function draw() {
  background(250);
  translate(-250 * 2.5, 0, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  plane(80);
  pop();
  translate(250, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(80, 80, 80);
  pop();
  translate(250, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cylinder(80, 80);
  pop();
  translate(250, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cone(80, 80);
  pop();
  translate(250, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(80, 20);
  pop();
  
}
{{< /p5-global-iframe >}}

{{< hint info >}}
[Referencia](https://p5js.org/es/examples/3d-geometries.html)
{{< /hint >}}

Adicionalmente P5 permite construir nuevas figuras o geometrías usando las instrucciones **begingShape()** y **endShape()**. Dentro de esta estructura podemos definir y unir vértices para dibujar nuevas figuras diferentes a las primitivas. Pero también podemos usar las figuras primitivas para construir figuras más complejas.

A continuación se muestra un ejemplo de figura 3D construída en P5 a partir de las figuras primitivas disponibles. Al jugar con la escala, rotación y posición de las primitivas se puede conseguir figuras nuevas. Adicionalmente podemos manejar diferentes niveles dentro de la construcción 3D para aplicar modificaciones a diferentes secciones de la figura, como rotar algunas partes hacia un lado y otras partes hacia otro. Usando las funciones **push()** y  **pull()** podemos cambiar el marco de referencia y trabajar a diferentes niveles para aplicar los cambios a las partes específicas que deseamos:

{{< p5-iframe sketch="/showcase/sketches/proceduralTexturing/model.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="425" height="425" >}}
{{< hint warning >}}
Notese como toda la construcción gira sobre el eje Y, mientras que el anillo mayor lo hace sobre su propio eje Z y la esfera pequeña sobre su propio eje X. Finalmente la estrella central conformada por cubos superpuestos gira en sus tres ejes simultaneamente
{{< /hint >}}

A continuación se muestra el código de contrucción y control de la figura:
{{< highlight js >}}
 function draw() {
  
  rotateY(angle-0.3) //rotación todo el modelo
  
  background(0);
  orbitControl(); //permite la manipulación
  angleMode(DEGREES); //cambiar ángulos de radianes a grados
  
  push() //niveles definidos por push() y pop()
  rotateZ(angle) //rotación de toroide mayor
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
  rotateX(angle) //rotación esfera
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
  
  //rotación estrella
  rotateX(angle)
  rotateY(angle)
  rotateZ(angle)
  
  //construcción estrella
  beginShape()
  box(80)
  rotateX(45)
  box(80)
  rotateY(45)
  box(80)
  rotateZ(45)
  box(80)
  endShape(CLOSE)
  
  angle+=0.7 //ángulo de rotación
  
}
{{< /highlight >}}

## Implementación:

Inicialmente se tiene una esfera en el centro del canvas sobre la que se ha aplicado una textra creada a partir de tríangulos negros y blancos siguiendo un patrón específico. Se ilustra claramente la habilidad de modificar de forma dinámica este tipo de texturas cuando movemos de izquierda a derecha el mouse y notamos que la textura cambia en tiempo real. En este caso estamos modificando el valor del *zoom* en la textura, es decir el tamaño de las baldosas que la componen; obviamente entre más pequeñas las baldosas, mayor cantidad serán necesarias para cubrir la esfera. 
El programa permite explorar diferentes texturas presionando la tecla "s" (recuerde hacer click en el canvas para permitir la entrada de comandos por teclado). Note que cuando se aplica la nueva textura, no se está reconstruyendo la esfera, solamente se está cubriendo con una textura diferente. Las nuevas texturas están construidas con baldosas de formas y colores diferentes, y todas cambian de tamaño al mover el mouse.

{{< hint info >}}
Los shaders utilizados para generar las texturas se adaptaron del libro: [The Book of Shaders](https://thebookofshaders.com/09/)
{{< /hint >}}

Adicionalmente podemos ver cómo se cubren diferentes figuras 3D con las diferentes texturas disponibles. Presione la tecla "f" para cambiar el modelo 3D. Vemos entonces que se conserva la textura pero ahora esta se aplica sobre un cilindro, un toroide, un cubo, una "estrella" construida con una esfera y conos, y sobre la figura más compleja mostrada arriba. Puede entonces observar cualquier combinación de textura y figura disponible.

presione "s" para cambiar la textura y "f" para cambiar la figura:
{{< p5-iframe sketch="/showcase/sketches/proceduralTexturing/proceduralTexturing.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="425" height="425" >}}


{{< hint info >}}
Puede rotar la figura arrastrándola con el mouse presionado para ver sus diferentes lados
{{< /hint >}}
{{< hint warning >}}
Note cómo cada textura *envuelve* cada figura prinitiva de diferente manera y de forma individual. Esto se aprecia de mejor manera en las últimas dos figuras y con el mínimo de baldosas en la textura, es decir hubicando el mouse todo a la izquierda del canvas
{{< /hint >}}

{{< details "Código" close >}}
{{< highlight js >}}
    //Santiago Rodríguez Camargo
    let pg;
    let truchetShader;
    let activeShader;
    let figure;
    let shadernumber=0;
    let shadertotal=4;
    let fignumber=0;
    let figtotal=6;

    function preload() {
        // Shaders adaptados de: https://thebookofshaders.com/09/
        truchetShader = readShader('/showcase/sketches/proceduralTexturing/color.frag');
        newshader=readShader('/showcase/sketches/proceduralTexturing/new2.frag');
        romboshader=readShader('/showcase/sketches/proceduralTexturing/new.frag');
        colorshader = readShader('/showcase/sketches/proceduralTexturing/rgb.frag');
    }

    function setup() {
        createCanvas(400, 400, WEBGL);
        // se crea un frame buffer object to para renderizar la textura
        pg = createGraphics(400, 400, WEBGL);
        textureMode(NORMAL);
        noStroke();
        pg.noStroke();
        pg.textureMode(NORMAL);
        // se aplica un primer shader a pg
        pg.shader(truchetShader);
        activeShader=truchetShader;
        // Definición de resolución
        pg.emitResolution(truchetShader);
        // Definición zoom inicial
        truchetShader.setUniform('u_zoom', 3);
        newshader.setUniform('u_zoom', 3);
        romboshader.setUniform('u_zoom', 3);
        colorshader.setUniform('u_zoom', 3);
        
        pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
        // definir pg como textura
        texture(pg);
        
        //figura inicial
        figure="sphere"
    }

    function draw() {
        background(33);
        orbitControl();//permite el movimiento
        
        //dafinir la figura
        if(figure=="sphere"){
            sphere(100, 200);
        }
        else if(figure=="cylinder"){
            cylinder(100, 200);
        }
        else if(figure=="torus"){
            //torus(100, 200);
            torus(70, 50);
        }
        else if(figure=="box"){
            box(180);
        }
        else if(figure=="star"){//construcción de estrella
            angleMode(DEGREES);
        
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

            endShape(CLOSE)
        }
        else if(figure=="neck"){ //construcción de última figura
            push()
            torus(100,15)

            pop()

            push()
            rotateY(45)
            translate(0,100)
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


            beginShape()
            box(80)
            rotateX(45)
            box(80)
            rotateY(45)
            box(80)
            rotateZ(45)
            box(80)
            endShape(CLOSE)
            
        }
        
        
    }

    function mouseMoved() {
        // Cambio de zoom según posición del mouse
        truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
        newshader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
        romboshader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
        colorshader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
        
        pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    } 

    function keyPressed() {
        if (key == 's') {//cambio de shader
            shadernumber=(shadernumber+1)%shadertotal
            
            if(shadernumber==0){
            pg.shader(truchetShader)
            pg.emitResolution(truchetShader)
            activeShader=truchetShader
            }
            else if (shadernumber==1){
            pg.shader(newshader)
            pg.emitResolution(newshader)
            activeShader=newshader
            }
            else if(shadernumber==2){
            pg.shader(romboshader)
            pg.emitResolution(romboshader)
            activeShader=romboshader
            }
            else if(shadernumber==3){
            pg.shader(colorshader)
            pg.emitResolution(colorshader)
            activeShader=colorshader
            }
            }
            
        if (key=='f'){//cambio de figura
            
            fignumber=(fignumber+1)%figtotal
            if (fignumber==0){
            figure="sphere"
            }
            else if (fignumber==1){
            figure="cylinder"
            }
            else if (fignumber==2){
            figure="torus"
            }
            else if (fignumber==3){
            figure="box"
            }
            else if (fignumber==4){
            figure="star"
            }
            else if (fignumber==5){
            figure="neck"
            }
        }
        
    }


{{< /highlight >}}
{{< /details >}}
## Conclusiones y trabajo futuro:
Las texturas generadas proceduralmente tienen ventajas importantes en cuanto a su dinamicidad y potencial, lo que las hace útiles en diferentes ámbitos y aplicaciones. Además es posible contruir figuras 3D relativamente complejas de forma modular utilizando figuras más simples, sobre las cuales se puede aplicar diferentes texturas.

En un futuro podría explorarse con nuevas texturas y nuevas figuras más complejas. También sería interesante manipular diferentes características de las texturas, no solo el zoom, sino ángulos, colores etc.
Por otro lado se podría intentar utilizar diferentes texturas en diferentes partes de una misma figura. Por ejemplo en las figuras contruídas a partir de primitivas, aplicar texturas diferentes a cada primitiva al mismo tiempo. Esto se intentó en este ejercicio pero no se logró a tiempo, pero en un futuro podría ser posible.