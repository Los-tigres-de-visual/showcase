let sourceImage;
let mosaicImages = [];
let n = 5;
let tileWidth = 50;
let tileHeight = 50;

function preload() {
    paintings = [];
    for (let i = 1; i <= n; i++) {
        mosaicImages.push(loadImage(`/showcase/sketches/photomosaic/assets/p${i}.jpg`));
    }
    sourceImage = loadImage('/showcase/sketches/photomosaic/assets/obama.jpg');
}

function setup() {
  createCanvas(sourceImage.width, sourceImage.height, WEBGL);
  noLoop();
}

function draw() {
  background(255);
  
  // Divide la imagen de origen en azulejos
  for (let x = 0; x < sourceImage.width; x += tileWidth) {
    for (let y = 0; y < sourceImage.height; y += tileHeight) {
      // Obtiene el azulejo actual
      let tile = sourceImage.get(x, y, tileWidth, tileHeight);
      
      // Calcula el color promedio del azulejo
      let tileColor = calculateAverageColor(tile);
      // Encuentra el mosaico más cercano
      let closestMosaic = findClosestMosaic(tileColor);
      
      // Dibuja el mosaico en la posición del azulejo
      image(closestMosaic, x, y, tileWidth, tileHeight);
    }
  }
}

function calculateAverageColor(image) {
  let totalPixels = image.width * image.height;
  let redSum = 0;
  let greenSum = 0;
  let blueSum = 0;

  // Suma los componentes de color de cada píxel en la imagen
  image.loadPixels();
  for (let i = 0; i < totalPixels; i++) {
    let index = i * 4; // Cada píxel tiene 4 componentes de color (rojo, verde, azul, alpha)
    redSum += image.pixels[index];
    greenSum += image.pixels[index + 1];
    blueSum += image.pixels[index + 2];
  }
  image.updatePixels();

  // Calcula el color promedio dividiendo la suma de los componentes por el número de píxeles
  let averageRed = redSum / totalPixels;
  let averageGreen = greenSum / totalPixels;
  let averageBlue = blueSum / totalPixels;

  return color(averageRed, averageGreen, averageBlue);
}

function findClosestMosaic(targetColor) {
  let closestMosaic;
  let closestDistance = Infinity;

  // Compara el color promedio de cada imagen de mosaico con el color objetivo
  for (let i = 0; i < mosaicImages.length; i++) {
    let mosaicColor = calculateAverageColor(mosaicImages[i]);
    let distance = dist(
      red(targetColor),
      green(targetColor),
      blue(targetColor),
      red(mosaicColor),
      green(mosaicColor),
      blue(mosaicColor)
    );

    // Actualiza el mosaico más cercano si se encuentra una distancia más corta
    if (distance < closestDistance) {
      closestMosaic = mosaicImages[i];
      closestDistance = distance;
    }
  }

  return closestMosaic;
}