const density = "Ñ@#W$9876543210?!abc;:+=-,._ "; 
let f;

function preload () {
  f = loadImage('/showcase/sketches/asciiArt/assets/panda.jpg');
}

function setup() {
  noCanvas();
  f.loadPixels();
  
  for(let j = 0; j < f.height; j++){
    let row = "";
    for(let i = 0; i < f.width; i++){
      const pixelIndex = (i + j * f.width) * 4;
      const r = f.pixels[pixelIndex];
      const g = f.pixels[pixelIndex + 1];
      const b = f.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0,255,len,0));
      const charToShow = density.split("")[charIndex];
      row += (charToShow === " " || charToShow === undefined) ? "&nbsp;" : charToShow;    
    }
    createDiv(row);
  }
}

function draw() {
  background(51);
}
