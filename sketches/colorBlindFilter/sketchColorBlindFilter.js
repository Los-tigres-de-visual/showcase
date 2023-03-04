let img;

function preload() {
    img = loadImage('/showcase/sketches/colorBlindFilter/imagenBase.jpg');
}

function deuteranopiaFilter(img) {
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];

        // Cálculo de la nueva intensidad de los canales de color
        let newR = 1 * r + 0.0 * g + 0.0 * b;
        let newG = 0.0 * r + 1 * g + 0.0 * b;
        let newB = 0.0 * r + 0.0 * g + 1 * b;

        /*
        Original

        let newR = 1 * r + 0.0 * g + 0.0 * b;
        let newG = 0.0 * r + 1 * g + 0.0 * b;
        let newB = 0.0 * r + 0.0 * g + 1 * b;

        Para Deuteranopía

        let newR = 0.80 * r + 0.2 * g + 0.0 * b;
        let newG = 0.25833 * r + 0.74167 * g + 0.0 * b;
        let newB = 0.0 * r + 0.14167 * g + 0.85833 * b;

        Para Protanopia

        let newR = 0.56667 * r + 0.43333 * g + 0.0 * b;
        let newG = 0.55833 * r + 0.44167 * g + 0.0 * b;
        let newB = 0.0 * r + 0.24167 * g + 0.75833 * b;

        Para Tritanopia

        let newR = 0.95 * r + 0.05 * g + 0.0 * b;
        let newG = 0.0 * r + 0.43333 * g + 0.56667 * b;
        let newB = 0.0 * r + 0.475 * g + 0.525 * b;

        */

        img.pixels[i] = newR;
        img.pixels[i + 1] = newG;
        img.pixels[i + 2] = newB;
    }

    img.updatePixels();

    return img;
}

function setup() {
    createCanvas(984, 655);

    // Llamada a la función deuteranopiaFilter()
    img = deuteranopiaFilter(img);
}

function draw() {
    background(220);

    // Mostramos la imagen en nuestro sketch
    image(img, 0, 0);
}
