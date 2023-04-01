***
# **Depth Perception**

## **Introducción**

<div style="text-align: justify;">
La percepción de la profundidad o depth perception es un tema supremamente importante en la vida diaria, 
solo basta con saber que el ser humano es un ser visual y que capta aproximadamente un 80% de la
información a través de la vista, por tanto, la visión y el cerebro son indesligables 
en la realidad de lo que percibimos. Esta percepción de profundidad nos permite ver el mundo en tres dimensiones, 
además de medir de forma precisa la distancia de un objeto. Se basa principalmente en la visión binocular, 
pero tambiém utiliza recursos monoculares para lograr una percepción integrada final. 
<br><br>

{{< details "Percepción" close >}}
<div style="text-align: center;">

## *¿Cómo se percibe la profundidad?*
</div>
<div style="text-align: justify;">
Para percibir la distancia y determinar la profundidad, los ojos utilizan tres métodos:

1. **Tamaño del objeto:** El cerebro por medio de la experiencia permite conocer el tamaño previo de los objetos, permitiendo así calcular la distancia.

2. **Movimiento de paralaje o Parallax:** Los objetos cercanos se mueven de manera más rápida que los objetos del fondo. Ésto ayuda al cerebro a calcular la distancia.

3. **Visión estereoscópica:** Cada ojo recibe una imagen distinta debido a la distancia que existe entre ellos, sin embargo, el cerebro se encarga de integrar dichas imágenes captando relieve y profundidad.
</div>
{{< /details >}}

{{< details "Recursos monoculares" close >}}

<div style="text-align: center;">

## *Las claves monoculares o pictóricas:*
</div>
<ol style="line-height: 120%">
    <li>
        <h4 style="font-weight: bold;">Tamaño</h4>
        <ul style="list-style-type: lower-roman">
            <li>Tamaño relativo: si dos objetos son presentados en pantalla, el más pequeño estará más lejos.</li>
            <li>Tamaño familiar: si se conoce el tamaño real de un objeto basado en la experiencia, entonces será más fácil para un usuario asimilar la distancia a la que se encuentra ese objeto.</li>
       </ul>
    </li>
    <li>
        <h4 style="font-weight: bold;">Perspectiva lineal:</h4>
        <ul style="list-style-type: lower-roman">
        <li>Convergencia de líneas paralelas: permiten entender la relación entre el punto de fuga y la orientación de los bordes de una superficie.</li>
        </ul>
    </li>
    <li>
        <h4 style="font-weight: bold;">Interposición:</h4>
        <ul style="list-style-type: lower-roman">
            <li>En la línea de visión, los objetos que se encuentras más alejados
            pueden quedar total o parcialmente ocultos a un observador.</li>
        </ul>
    </li>
    <li>
        <h4 style="font-weight: bold;">Perspectiva aérea:</h4>
        <ul style="list-style-type: lower-roman">
            <li>Cambios en contraste y color dependiendo de la distancia a la que se encuentren (bruma y azulado).</li>
        </ul>
    </li>
    <li>
        <h4 style="font-weight: bold;">Brillo relativo:</h4>
        <ul style="list-style-type: lower-roman">
            <li>Cambios en los patrones de sombreado: más brillante está más cerca.</li>
        </ul>
    </li>
    <li>
        <h4 style="font-weight: bold;">Gradiente de textura:</h4>
        <ul style="list-style-type: lower-roman">
            <li>Aspecto de la estimulación que mayor 
            información proporciona sobre las características de la superficie, 
            como su orientación en profundidad o su curvatura.</li>
        </ul>
    </li>
</ol>

{{< /details >}}

</div>
<br>
<div style="text-align: justify;">
En esta sección se creará una escena que dará la ilusión de profundidad cercana a 3D, usando un efecto de Parallax.
</div>
<br>

{{< details "Paralaje" close >}}
<div style="text-align: center;">

## *Parallax*
</div>
<div style="text-align: justify;">
Ésta técnica se basa en una iliusion óptica en la que, cuanto más lejos están los elementos, más pequeños se ven, dando como resultado la sensación de que los objetos más distantes se mueven más lentamente que los que están más cerca. 

Se realiza a través de animación y desplazamiento en paralelo, permitiendo al usuario la interacción.

</div>
{{< /details >}}

## **Antecedentes**

<div style="text-align: justify;">
Los programadores de videojuegos llevan utilizando el efecto de la paralaje de movimiento desde 
los juegos con desplazamiento lateral (side-scrolling videogame) de los años ochenta, con el fin 
de crear la ilusión de las tres dimensiones con medios bidimensionales. Durante la percepción de 
la profundidad, el sentido de la vista permite al usuario observar las distintas geometrías, 
texturas y animaciones, interpretando cuatro características 
esenciales de los objetos: su forma, la posición en un entorno 
dado, la iluminación (brillo y color) y el movimiento.
Sin embargo, otros sentidos como el oído también pueden influenciar 
en la sensación de realismo de una determinada escena.
<br><br>
Los gráficos por computadora tienen pues su base en el "engaño de los sentidos" del ser humano, 
las animaciones tradicionales por ejemplo, se basan en la persistencia visual que tiene el 
cerebro cuando observa imágenes. Y basándose en fuentes de información sobre la profundidad 
se pueden recrear escenas en 2D para que simulen espacios 3D. 
<br><br>
En <code>P5 JS</code>, existen varios trabajos previos sobre el "engaño de los sentidos" en los que
al utilizar aspectos monoculares simples, se puede crear un efecto de profundidad. Por ejemplo al 
utilizar el mouse sobre  
<a href="https://editor.p5js.org/slow_izzm/sketches/BJSYWdTOm" target="_blank">este escenario</a>
se crea un efecto de profundidad bastante simple que juega con las escalas de los objetos.
En <a href="https://editor.p5js.org/bibi.abrah/sketches/q1f_VV_Yw" target="_blank">esta animación</a>
se puede percibir la profundidad de las colinas jugando únicamente con el color.
<br><br>
</div>

<div style="line-height: 1.2; text-align: justify; font-style:italic;text-indent:3em; font-size: 0.9em; 
background-color: rgba(72, 56, 113, 96); padding: 5px 20px 5px 20px;">

### **Referencias**

---

Feldman, S. La composición de la imagen en movimiento. Ed. Gedisa. 1995. ISBN: 9788474325799

Otaduy, M.A. Iluminación Global y Ec. de Rendering. Material de la Asignatura Técnicas Avanzadas de 
Gráficos 3D, de la Universidad Rey Juan Carlos. 2008.

Perceptual evaluation of illumination effects in virtual environments. Raya, L., Mata, S., Robles, O. ACM Symposium on Applied Perception in Graphics and Visualization (APGV). 2010. Los Angeles (USA).
</div>
<br>

## **Desarrollo**


{{< hint info >}}
<div style="text-align: center;">

## *Animación*
</div>
{{< /hint  >}}

{{< details "Cámara" close >}}
<div style="text-align: center;">

### *Uso de WEBGL*
</div>

<div style="text-align: justify;">
Para crear este efecto se desarrollará una aplicación simple en <code>P5 JS</code>, aprovechando el estándar web denominado WEBGL, que permite activar el motor 3D, pasando de solo tener la posición horizontal y la vertical, a la de profundidad, la cuál apunta por defecto a la cámara. Sin embargo, en WEBGL, no existe ningún tipo de cámara que se pueda mover y rotar, por lo que se hace necesario encontrar la manera de <span style="font-style: italic;"><u>"fingir"</u></span> esos movimientos. Así pues, la cámara es un objeto virtual que, en lugar de representar un objeto físico en el mundo virtual, representa la posición y la dirección de visión de un espectador.
</div>
{{< /details >}}
<br>
<div style="text-align: justify;">
Para activar la cámara en <code>P5 JS</code>, dentro de la función setup se crea el canvas de la siguiente manera:

```tpl
function setup() {
  createCanvas(900, 600, WEBGL);
}
```

Y para poder utilizar la cámara, dentro de la función draw se utiliza la siguiente sintáxis:

```tpl
camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ]);
```

En dónde:

> * x {{< katex >}} \rightarrow {{< /katex >}} Número: valor de la posición de la cámara en el eje x 
> * y {{< katex >}} \rightarrow {{< /katex >}} Número: valor de la posición de la cámara en el eje y
> * z {{< katex >}} \rightarrow {{< /katex >}} Número: valor de la posición de la cámara en el eje z
> * centerX {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) coordenada x que representa el centro del croquis
> * centerY {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) coordenada y que representa el centro del croquis
> * centerZ {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) coordenada z que representa el centro del croquis
> * upX {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) componente x de la dirección 'hacia arriba' desde la cámara
> * upY {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) componente y de la dirección 'hacia arriba' desde la cámara
> * upZ {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) componente z de la dirección 'hacia arriba' desde la cámara
</div>
<br>
{{< details "Blur" close >}}
<div style="text-align: center;">

### *Efecto Blur*
</div>
<div style="text-align: justify;">
El efecto de difuminar o blur se suele utilizar para controlar la profundidad del campo de visión y dirigir al usuario hacia lo que importa en una imagen.
</div>
{{< /details >}}
<br>
<div style="text-align: justify;">
Para poder usarlo es necesario crear una función preload en donde se cargarán previamente las imágenes:

```tpl
function preload(){
  img = loadImage('assets/nombre_imagen.jpg');
}
```

Luego, en la función setup se activa el filtro:

```tpl
img.filter(BLUR, 10);
```

</div>
<br>
{{< details "Particles" close >}}
<div style="text-align: center;">

### *Sistema de partículas*
</div>
<div style="text-align: justify;">
Se hará necesario animar una gran cantidad de objetos que por medio de un algoritmo simple, simulará la profundidad de dichos objetos. Con este sistema se podrá crear, mover, cambiar y eliminar las partículas durante un tiempo determinado. 

</div>
{{< /details >}}
<div style="text-align: center;">
<video src="/showcase/sketches/depthPerception/Particles.mp4" controls style="max-width: 500px;" autoplay>
</video>
</div>

<div style="text-align: justify;">
Para este caso se creará una clase en <code>P5 JS</code>, que actuará como una plantilla, definiendo las características y comportamientos de una entidad.

{{< highlight js >}}
let fi1;
let fi2;
let fiy;
class Fish{
  constructor(minR, maxR){
    this.min_R = minR;
    this.max_R = maxR;
    this.radius = random(minR, maxR);

    this.loc = createVector(
      random(0-this.radius, width+this.radius),
      random(0, height)
    );
    this.velX = map(this.radius, minR, maxR, minR/100, maxR/100);
    this.velY = 0;

    this.offset = random(10);
    
    fi1 = loadImage('/showcase/sketches/Depth/assets/Pezmoradoizq.png');
    fi2 = loadImage('/showcase/sketches/Depth/assets/Pezmoradoder.png');
    fiy = loadImage('/showcase/sketches/Depth/assets/Pezamarillo.png');
  }

  show(blurAmount){
    drawingContext.filter = 'blur('+str(blurAmount)+'px)';
    //fi1.filter(BLUR, blurAmount);
    image(fi1, this.loc.x, this.loc.y, this.radius, this.radius);
    image(fi2, -this.loc.x, -this.loc.y, this.radius/2, this.radius/2);
    image(fiy, this.loc.x*1.5, this.loc.y/2, this.radius/4, this.radius/4);
  }

  ascend(){
    let n = map(noise(this.offset),0, 1, -1, 1);
    this.loc.x += this.velX;
    this.loc.y += n;
    this.offset += 0.02;
  }

  reposition(){
    if(this.loc.x > width){
      this.changeRadius();
      this.loc.x = this.radius -  width;
      this.loc.y = random(0, height);
    }
  }

  changeRadius(){
    this.radius = random(this.min_R, this.max_R);
  }
}
{{< /highlight >}}
</div>


{{< details "Movement" close >}}
<div style="text-align: center;">

### *Movimiento*
</div>
<div style="text-align: justify;">
Además de ayudar a mantener el contacto visual, el movimiento sirve para generar interactividad y sensación de profundidad en una simple imagen 2D. 
</div>
{{< /details >}}
<div style="text-align: center;">
<img src="/showcase/sketches/depthPerception/Movement.gif" style="width:300px">
</div>


<div style="text-align: justify;">
Para este caso en <code>P5 JS</code>, se utiliza el movimiento de la cámara en <b>X</b>, en <b>Y</b> y en <b>Z</b>. Se aplica además, movimiento rotacional usando el valor absoluto de la función seno, sobre ciertos objetos.
{{< highlight js >}}
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
  {{< /highlight >}}
</div>


{{< details "Alpha" close >}}
<div style="text-align: center;">

### *Alpha*
</div>
<div style="text-align: justify;">
El valor alpha indica el nivel de transparencia de un píxel. Su uso en esta sección revelará la importancia de la manera de percepción de los colores y su papel en la captación de la profundidad.
</div>
{{< /details >}}
<div style="text-align: center;">
<img src="/showcase/sketches/depthPerception/Transparency.jpg" style="width:400px;">
</div>

Finalmente, aquí encontramos el código del sketch que da forma al efecto parallax:
{{< details "Código" close >}}
  {{< highlight js >}}

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
  img = loadImage('assets/Fondo.jpg');
  corales = loadImage('assets/Corales.png');
  f1 = loadImage('assets/Pez morado izq.png');
  f2 = loadImage('assets/Pez morado der.png');
  woman = loadImage('assets/Woman.png');
  ojoIzq = loadImage('assets/Ojo der.png');
  ojoDer = loadImage('assets/Ojo izq.png');
  coralDer = loadImage('assets/Coral Der.png');
  coralIzq = loadImage('assets/Coral Izq.png');
  estrella = loadImage('assets/Estrella de mar.png');
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
  {{< /highlight >}}
{{< /details >}}

<br>
<div  style="text-align: justify;">
Como resultado final, la percepción de profundidad de imágenes 2D simples y aplicando los conceptos vistos anteriormente, se puede apreciar de la siguiente manera:
<br><br>

{{< p5-iframe ver="1.5.0" sketch="/showcase/sketches/Depth/sketch.js" lib1="/showcase/sketches/Depth/fish_particles.js"  width="925" height="625" >}}

</div>


## **Conclusiones**

<div  style="text-align: justify;">
Utilizando imágenes en 2D y aspectos monoculares simples como la variación en el tamaño, la interposición de los objetos,
la bruma y el azulado, junto con el movimiento de una cámara "virtual" se logra crear satisfactoriamente una ilusión de
profundidad simulando lo que pareciera ser una escena en 3D.

Adicionar movimiento independiente al movimiento de la cámara realza la sensación de realismo y de profundidad sobre el escenario.

El toque de la utilización del alpha sobre el color azul para generar la perspectiva de inmersión en el océano logra crear
una percepción más realista.

Y la utilización del efecto blur sobre los objetos más lejanos realmente crea el efecto de lejanía.
</div>

## **Trabajo futuro**

<div  style="text-align: justify;" >
Como trabajo futuro se podría perfeccionar el trabajo desarrollado con la utilización 
de más factores monoculares como por ejemplo un punto de fuga más específico o la utilización 
de sombreados que den más realismo e incluso añadir un efecto sonoro que sumerja al usuario 
en la escena descrita. 

Incluso podría pensarse en ampliar el efecto parallax hacia un srolling inmersivo, para contar 
una historia tras el desplazamiento con el scroll del mouse sobre la escena ya planteada.

</div>