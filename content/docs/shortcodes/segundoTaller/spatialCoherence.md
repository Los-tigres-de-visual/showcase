# Pixelador Sin Coherencia Espacial

## Introducción
La pixelación es una técnica comúnmente utilizada en el procesamiento de imágenes y videos para ocultar detalles o crear efectos visuales específicos. En esta sección, presentamos la implementación de un pixelador en software utilizando `p5.js` y `shaders`.

El objetivo principal de este proyecto es desarrollar un sistema interactivo que permita al usuario seleccionar imágenes y videos de un conjunto de datos fuente previamente definido y aplicarles un efecto de pixelación en tiempo real. Además, se compararán los resultados obtenidos con el enfoque usando coherencia espacial (código que creó el Profesor y compartió en la página del grupo), evaluando las diferencias y las posibles ventajas de cada enfoque.

El proceso de pixelación se lleva a cabo utilizando `shaders`, que son programas que se ejecutan en la tarjeta gráfica y permiten realizar operaciones de procesamiento paralelo en tiempo real. En nuestro caso, hemos utilizado un `shader` personalizado que aplica el efecto de pixelación sin utilizar coherencia espacial. El shader divide la imagen en bloques de píxeles y calcula la posición del fragmento en las coordenadas de textura pixeladas multiplicando y redondeando hacia abajo las coordenadas de textura originales por el tamaño de los píxeles

Además, hemos implementado un mecanismo de ajuste del tamaño de píxel para permitir al usuario controlar el nivel de pixelación deseado. Esto se logra a través de un control deslizante interactivo que ajusta los parámetros del `shader` en tiempo real.

Finalmente, analizaremos los resultados comparando el enfoque de pixelación utilizado en este proyecto con un enfoque alternativo que utiliza coherencia espacial. Se evaluarán las ventajas y desventajas de cada método en términos de calidad visual, rendimiento y eficiencia.

## Antecedentes y Trabajo Previo
La pixelación es una técnica comúnmente utilizada en el procesamiento de imágenes y videos para ocultar detalles, proteger la privacidad o lograr efectos visuales distintivos. Consiste en dividir una imagen en bloques de píxeles más grandes, lo que resulta en una representación simplificada y de baja resolución de la imagen original. Esta técnica ha sido ampliamente utilizada en diversas aplicaciones, como juegos retro, arte digital y aplicaciones de edición de imágenes.


Existen numerosos trabajos previos en el campo de la pixelación que han explorado diferentes enfoques y técnicas. Por ejemplo, en el ámbito de los juegos retro, se han desarrollado algoritmos específicos para recrear la apariencia de las consolas y los gráficos de baja resolución utilizados en los videojuegos de la década de 1980. Estos métodos a menudo utilizan técnicas de reducción de resolución basadas en patrones y paletas de colores limitadas para obtener resultados auténticos y estilizados.

<p align="center">
  <img src="/showcase/sketches/spatialCoherence/mario.png">
</p>
<p align="center">
    <b>Fuente:</b> <a href="https://www5.minijuegosgratis.com/v3/games/thumbnails/222662_1.jpg" target="_blank">Imagen de Mario Retro</a>
</p>

Además, en el campo del arte digital y la representación estilizada de imágenes, se han propuesto diversos enfoques de pixelación. Algunos artistas y diseñadores han experimentado con técnicas no convencionales de pixelación, como el uso de formas geométricas o colores sólidos en lugar de píxeles individuales. Estos enfoques buscan crear efectos visuales únicos y explorar nuevas formas de representación visual.

En el ámbito académico, también se han investigado algoritmos más avanzados para la pixelación, incluyendo métodos basados en análisis de textura, segmentación de imágenes y aprendizaje automático. Estos enfoques buscan mejorar la calidad visual de la pixelación al considerar características más complejas de la imagen, como bordes, texturas y patrones.

## Pixelador
A continuación, presentamos el código del pixelador implementado en `p5` en conjunto con el `shader` :
{{< details "sketch.js" close >}}
{{< highlight js >}}
// Variables para almacenar los archivos actuales
let currentFile;
let imagen1, imagen2, imagen3;
let video1, video2, video3;

// Control deslizante para el tamaño de píxel
let pixelSizeSlider;

// Función para detener la reproducción de los videos
function stopVideos() {
  video1.pause();
  video2.pause();
  video3.pause();
}

function preload() {
  // Cargar el fragment shader
  lumaShader = readShader("/showcase/sketches/spatialCoherence/assets/pixelator.frag",
    { varyings: Tree.texcoords2 });

  // Cargar las imágenes
  imagen1 = loadImage("/showcase/sketches/spatialCoherence/assets/imagen1.jpg");
  imagen2 = loadImage("/showcase/sketches/spatialCoherence/assets/imagen2.jpg");
  imagen3 = loadImage("/showcase/sketches/spatialCoherence/assets/imagen3.jpg");

  // Crear los elementos de video
  video1 = createVideo(["/showcase/sketches/spatialCoherence/assets/video1.mp4"]);
  video1.hide();

  video2 = createVideo(["/showcase/sketches/spatialCoherence/assets/video2.mp4"]);
  video2.hide();

  video3 = createVideo(["/showcase/sketches/spatialCoherence/assets/video3.mp4"]);
  video3.hide();

  // Establecer el archivo actual como la primera imagen por defecto
  currentFile = imagen1;
}

function setup() {
  // Crear un lienzo de 700x500 con WebGL
  createCanvas(700, 500, WEBGL);

  // Configuraciones de dibujo
  noStroke();
  textureMode(NORMAL);
  
  // Aplicar el shader
  shader(lumaShader);

  // Crear un selector desplegable para los archivos
  selectorFiles = createSelect();
  selectorFiles.position(15, 20);
  selectorFiles.style("width", "80px");
  
  // Opciones del selector
  selectorFiles.option("Imagen 1");
  selectorFiles.option("Imagen 2");
  selectorFiles.option("Imagen 3");
  selectorFiles.option("Video 1");
  selectorFiles.option("Video 2");
  selectorFiles.option("Video 3");

  // Establecer la opción seleccionada por defecto
  selectorFiles.selected("Imagen 1");

  // Función para cambiar el archivo actual cuando cambia
  // la opción seleccionada
  selectorFiles.changed(() => {
    let file = selectorFiles.value();
    switch (file) {
      case "Imagen 1":
        currentFile = imagen1;
        stopVideos();
        break;
      case "Imagen 2":
        currentFile = imagen2;
        stopVideos();
        break;
      case "Imagen 3":
        currentFile = imagen3;
        stopVideos();
        break;
      case "Video 1":
        currentFile = video1;
        stopVideos();
        video1.loop();
        break;
      case "Video 2":
        currentFile = video2;
        stopVideos();
        video2.loop();
        break;
      case "Video 3":
        currentFile = video3;
        stopVideos();
        video3.loop();
        break;
    }
  });

  // Crear un control deslizante para el tamaño del píxel
  pixelSizeSlider = createSlider(1, 51, 20, 2);
  pixelSizeSlider.position(15, 50);
  pixelSizeSlider.style("width", "80px");

  // Establecer el valor inicial del tamaño de píxel en el shader
  lumaShader.setUniform("pixelSize", pixelSizeSlider.value());

  // Función para actualizar el tamaño de píxel en el shader
  // según el valor del control deslizante
  pixelSizeSlider.input(() => {
    lumaShader.setUniform("pixelSize", pixelSizeSlider.value());
  });
}

function draw() {
  // Actualizar el tamaño de píxel en el shader en función del
  // ancho del lienzo
  lumaShader.setUniform("pixelSize", pixelSizeSlider.value() / width);

  // Establecer la textura actual en el shader
  lumaShader.setUniform("texture", currentFile);

  // Dibujar la forma con el shader aplicado
  beginShape();

  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);

  endShape();
}
{{< /highlight >}}
{{< /details >}}
 
{{< details "pixelator.frag" close >}}
{{< highlight c >}}
// Precisión de los cálculos de punto flotante
precision mediump float;

// Variable uniforme para controlar la opción de brillo
uniform bool lightness;

// Textura de entrada
uniform sampler2D texture;

// Tamaño de píxel
uniform float pixelSize;

// Coordenadas de textura interpoladas desde los vértices
varying vec2 texcoords2;

void main() {
  // Redondear las coordenadas de textura al tamaño de píxel más cercano
  vec2 p = floor(texcoords2 / pixelSize) * pixelSize;
  
  // Obtener el color de la textura en las coordenadas redondeadas
  vec4 texel = texture2D(texture, p);
  
  // Asignar el color del texel como salida
  gl_FragColor = lightness ? vec4(vec3(texel), 1.0) : texel;
}

{{< /highlight >}}
{{< /details >}}

A continuación, presentamos el `iframe` con el código funcional:

{{< p5-iframe sketch="/showcase/sketches/spatialCoherence/pixelator.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="725" height="525" >}}

## Conclusiones

1. El enfoque de pixelación implementado, que no utiliza coherencia espacial, ha demostrado ser efectivo para generar resultados estilizados y simplificados. Los bloques de píxeles resultantes crean una representación visual distintiva y pueden ser utilizados para lograr efectos artísticos o visuales específicos.

2. La utilización de shaders ha sido fundamental para lograr un procesamiento eficiente en tiempo real. La capacidad de ejecutar operaciones paralelas en la tarjeta gráfica permite aplicar el efecto de pixelación de manera rápida y responsiva, lo que mejora la experiencia del usuario.

3. La comparación con un enfoque alternativo que utiliza coherencia espacial para la pixelación ha revelado diferencias significativas en los resultados obtenidos. Mientras que el enfoque implementado produce resultados más abruptos y estilizados, el enfoque basado en coherencia espacial tiende a preservar mejor los detalles y la estructura global de la imagen. La elección entre ambos enfoques dependerá de los objetivos y el contexto de aplicación.

4. Es importante destacar que el enfoque implementado tiene algunas limitaciones. La falta de coherencia espacial puede resultar en la pérdida de detalles importantes en la imagen original y en una apariencia más simplificada. Por lo tanto, se recomienda su uso en situaciones donde se busque un efecto visual específico o una representación estilizada.

## Trabajo futuro

A pesar de los logros alcanzados en este proyecto de implementación de un pixelador en software utilizando `p5.js` y `shaders`, existen diversas oportunidades de mejora y trabajo futuro que pueden llevarse a cabo. A continuación, se detallan algunas áreas de investigación y desarrollo que podrían explorarse:

1. **Mejora de la calidad visual:** Uno de los aspectos clave a considerar en el trabajo futuro es la mejora de la calidad visual de la pixelación. Se pueden investigar y desarrollar algoritmos más sofisticados que preserven mejor los detalles importantes de la imagen original. Esto puede implicar la exploración de técnicas basadas en aprendizaje automático, como redes neuronales, para realizar una pixelación más inteligente y adaptativa.

2. **Optimización del rendimiento:** Aunque la implementación actual es capaz de realizar la pixelación en tiempo real, es posible investigar y aplicar técnicas de optimización para mejorar aún más el rendimiento. Esto puede incluir la optimización de los shaders y la utilización de técnicas de paralelización para aprovechar al máximo la capacidad de procesamiento de la tarjeta gráfica.

3. **Exploración de nuevos efectos de pixelación:** Además de la pixelación tradicional, existen numerosos efectos y variaciones que podrían investigarse y desarrollarse en el futuro. Esto incluye la implementación de técnicas de pixelación no uniforme, donde diferentes regiones de la imagen se pixelan con diferentes tamaños o patrones. También se pueden explorar efectos de transición y animación entre diferentes niveles de pixelación para lograr resultados visuales más dinámicos y atractivos.

4. **Integración con otras herramientas y tecnologías:** El pixelador desarrollado puede integrarse con otras herramientas y tecnologías para ampliar su funcionalidad y aplicaciones. Por ejemplo, se podría explorar la posibilidad de utilizar técnicas de detección de bordes o segmentación de imágenes para guiar la pixelación y preservar mejor la estructura de la imagen original. Además, se podría considerar la integración con bibliotecas de procesamiento de imágenes existentes para aprovechar funcionalidades adicionales, como la corrección de color o el ajuste de tonos.
