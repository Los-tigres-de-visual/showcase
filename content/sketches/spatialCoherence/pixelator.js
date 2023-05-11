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

  // Función para cambiar el archivo actual cuando cambia la opción seleccionada
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

  // Función para actualizar el tamaño de píxel en el shader según el valor del control deslizante
  pixelSizeSlider.input(() => {
    lumaShader.setUniform("pixelSize", pixelSizeSlider.value());
  });
}

function draw() {
  // Actualizar el tamaño de píxel en el shader en función del ancho del lienzo
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
