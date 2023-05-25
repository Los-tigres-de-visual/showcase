let sourceImage;
let mosaicImages = [];
let tileWidth = 50;
let tileHeight = 50;
let tileColorsTexture;
let closestMosaicTexture;

let shaderProgram;
let tileColorsShader;
let closestMosaicShader;

function preload() {
    for (let i = 1; i <= n; i++) {
        mosaicImages.push(loadImage(`/showcase/sketches/photomosaic/assets/p${i}.jpg`));
    }
    sourceImage = loadImage('/showcase/sketches/photomosaic/assets/obama.jpg');

    mosaic = readShader('/showcase/sketches/photomosaic/mosaic.frag');
    vertexColors = readShader('/showcase/sketches/photomosaic/vertexColors.frag');
    fragmentColors = readShader('/showcase/sketches/photomosaic/fragmentColors.frag');
    closestsMosaicVertex = readShader('/showcase/sketches/photomosaic/closestsMosaicVertex.frag');
    closestMosaicFragment = readShader('/showcase/sketches/photomosaic/closestMosaicFragment .frag');
}

function setup() {
  createCanvas(sourceImage.width, sourceImage.height, WEBGL);
  
  // Crea y compila los shaders
  tileColorsShader = createShader(vertexColors, fragmentColors);
  closestMosaicShader = createShader(closestMosaicVertex, closestMosaicFragment);
  
  // Crea y vincula el programa de shaders
  shaderProgram = createProgram(tileColorsShader, closestMosaicShader);
  
  // Asigna los valores uniformes para el tamaño de los azulejos y el número de mosaicos
  tileColorsShader.setUniform('tileSize', [tileWidth, tileHeight]);
  tileColorsShader.setUniform('numMosaics', mosaicImages.length);
  
  // Establece la textura de la imagen de origen en el shader de colores de los azulejos
  tileColorsShader.setUniform('sourceImage', sourceImage);
  
  // Asigna las texturas generadas por los shaders a las variables uniformes
  closestMosaicShader.setUniform('tileColors', tileColorsTexture);
  closestMosaicShader.setUniform('mosaicImages', closestMosaicTexture);
  // Establece la textura del mosaico más cercano en el shader de renderizado
  closestMosaicShader.setUniform('tileMosaics', closestMosaicTexture);
  
  // Genera las texturas de los azulejos y los mosaicos más cercanos utilizando los shaders
  tileColorsTexture = createGraphics(sourceImage.width, sourceImage.height, WEBGL);
  tileColorsTexture.shader(tileColorsShader);
  tileColorsTexture.rect(0, 0, width, height);

  closestMosaicTexture = createGraphics(sourceImage.width, sourceImage.height, WEBGL);
  closestMosaicTexture.shader(closestMosaicShader);
  closestMosaicTexture.rect(0, 0, width, height);
  
  noLoop();

  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  resolution = createSlider(1, 20, 4, 1);
  resolution.position(10, 35);
  resolution.style('width', '80px');
  resolution.input(() => {
    mosaic.setUniform('resolution', resolution.value())
  });
  mosaic.setUniform('resolution', resolution.value());
  symbol = random(paintings);
  mosaic.setUniform('uv', true);
  uv = createCheckbox('uv visualization', true);
  uv.style('color', 'magenta');
  uv.changed(() => mosaic.setUniform('uv', uv.checked()));
  uv.position(10, 70);
}

function draw() {
  background(255);
  
  // Utiliza el shader de renderizado principal para dibujar los mosaicos en el lienzo
  //shader(mosaic);
  mosaic.setUniform('palette', symbol);
  // Pasa el tamaño de los azulejos y el número de mosaicos al shader de renderizado
  //shaderProgram.setUniform('tileSize', [tileWidth, tileHeight]);
  //shaderProgram.setUniform('numMosaics', mosaicImages.length);
  
  // Dibuja un rectángulo de tamaño de la imagen de origen para activar el shader
  rect(0, 0, width, height);
 
  
}