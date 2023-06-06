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
