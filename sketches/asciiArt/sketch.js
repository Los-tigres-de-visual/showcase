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