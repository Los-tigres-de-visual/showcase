# ASCII ART

## **Introducción**

<div style="text-align: justify;">
Para este ejercicio se pretende extraer el color de cada uno de los pixeles de una imagen, tomar el brillo y reproducir la imagen en una escala de grises, que adicionalmente se pintará con caracteres ASCII que se moverán a través de la imagen.
<br><br>

</div>

## **Antecedentes**

<div style="text-align: justify;">
Para empezar, se debe mencionar que la palabra “pixel”, fue publicada por primera vez en 1965 por Frederic C. Billingsley del JPL, para describir los elementos de imagen de las imágenes de vídeo de las sondas espaciales a la Luna y Marte. 
Para comprender cómo se representan los colores de un pixel en una imagen.
Cada imagen o fotografía está compuesta en realidad por un conjunto de píxeles, cada uno de los cuales está asociado a un color que se representa mediante el sistema RGB (Rojo - Verde - Azul) con un código de tres números. Cada uno de estos números puede variar de 0 a 255, lo que significa que existen 256 posibles valores para cada uno.

Así pues, un código (0 0 255) representa un píxel de color completamente azul. Si todos los números son 0, significa que el píxel es negro, mientras que si todos son 255, significa que el píxel es blanco. 

Lo importante de esto es que cuanto más grande sea la combinación de colores, más brillante será el píxel. 

Teniendo esto en cuenta, una forma muy simple para calcular el brillo de un píxel es obtener el promedio de los tres números decimales de la serie.

Ahora bien, para hablar de las escalas de grises, se puede tomar el blanco y el negro, donde negro es nada de brillo y blanco es muchísimo brillo.
<br><br>

</div>
<div style="line-height: 1.2; text-align: justify; font-style:italic;text-indent:3em; font-size: 0.9em; 
background-color: rgba(72, 56, 113, 96); padding: 5px 20px 5px 20px;">

### **Referencias**

---

García G. Demóstenes ASCII art desde la webcam. (s/f). Demogar.com. Online disponible en https://www.demogar.com/2022/04/26/convirtiendo-video-en-ascii-art/
<br>

</div>

## **Desarrollo**

<div style="text-align: justify;">
Ya se conoce cómo sacar el color de un solo pixel en una imagen y además, que para usar la escala de grises se puede ir de nada, es decir, 0% de contraste, a completo, 100% de contraste. Ahora bien, para tomar todos los colores de cada uno de los pixeles de una imagen, lo que resta es iterar sobre las filas y columnas que se generan al separar la imágen en cuadrantes, sobre las cuales se calculará el valor RGB y el brillo o luminosidad.

Para pasar esa escala de grises a los caracteres en un texto, es necesario iterarlo a la vez que se extrae el color y se le pasa finalmente la escala de grises, produciendo Un excelente efecto.

{{< highlight js >}}
let sourceText;
let sText;
let f;
let startIndex = 0;
let frameRateEnabled = false;

function toggleFrameRate() {
  frameRateEnabled = !frameRateEnabled;
  if (frameRateEnabled) {
    frameRate(10);
  } else {
    frameRate();
  }
}

function preload() {
  f = loadImage("/showcase/sketches/asciiArt/assets/cat2.jpg");
  f2 = loadImage("/showcase/sketches/asciiArt/assets/cat.jpg");
  sourceText = loadStrings("/showcase/sketches/asciiArt/assets/image.txt");
  fontRegular = loadFont('/showcase/sketches/asciiArt/assets/FiraCode-Regular.ttf');
}

function setup() {
  createCanvas(500, 550); 
  sText = sourceText.join(' ');
  textFont(fontRegular);
  let toggleButton = createButton('--> Activate ASCII Art <--');
  toggleButton.position(width/5,height + 20);
  toggleButton.style('padding', '8px');
  toggleButton.style('border-radius', '15px');
  toggleButton.style('background-color', '#D7BDE2');
  toggleButton.style('color', '#A569BD ');
  toggleButton.style('font-size', '20px');
  toggleButton.style('font-family', fontRegular);
  toggleButton.style('font-weight', 'bold');
  toggleButton.style('letter-spacing', '4px');
  toggleButton.style('text-shadow', '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'); 
  toggleButton.mousePressed(toggleFrameRate);
}

function draw() {
  background(0);

  if (frameRateEnabled) {
    let charIndex = startIndex;
    let w = width / f.width;
    let h = height / f.height;
    f.loadPixels();
    for (let j = 0; j < f.height; j++) {
      for (let i = 0; i < f.width; i++) {
        const pixelIndex = (i + j * f.width) * 4;
        const r = f.pixels[pixelIndex + 0];
        const g = f.pixels[pixelIndex + 1];
        const b = f.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        
        noStroke();
        fill(avg);
        const lenp = sText.length; 
        textSize(w * 1.4);
        textAlign(CENTER, CENTER);
        text(sText.charAt(charIndex % lenp), i * w + w * 0.5, j * h + h * 0.5);
        charIndex++;
      }
    }
    startIndex++;
  } else {
    image(f2, 0, 0, width, height);
  }  
}
{{< /highlight >}}


<br><br>

Presiona el botón "Activate ASCII Art" para generar el efecto:
</div>

{{< p5-iframe sketch="/showcase/sketches/asciiArt/sketch.js"  width="520" height="620" >}}




