let sourceText;
let poem;
let gloria;
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
  gloria = loadImage("/showcase/sketches/asciiArt/assets/cat2.jpg");
  gloria2 = loadImage("/showcase/sketches/asciiArt/assets/cat.jpg");
  sourceText = loadStrings("/showcase/sketches/asciiArt/assets/image.txt");
  fontRegular = loadFont('/showcase/sketches/asciiArt/assets/FiraCode-Regular.ttf');
}

function setup() {
  createCanvas(500, 550); 
  poem = sourceText.join(' ');
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
    let w = width / gloria.width;
    let h = height / gloria.height;
    gloria.loadPixels();
    for (let j = 0; j < gloria.height; j++) {
      for (let i = 0; i < gloria.width; i++) {
        const pixelIndex = (i + j * gloria.width) * 4;
        const r = gloria.pixels[pixelIndex + 0];
        const g = gloria.pixels[pixelIndex + 1];
        const b = gloria.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        
        noStroke();
        fill(avg);
        const lenp = poem.length; 
        textSize(w * 1.4);
        textAlign(CENTER, CENTER);
        text(poem.charAt(charIndex % lenp), i * w + w * 0.5, j * h + h * 0.5);
        charIndex++;
      }
    }
    startIndex++;
  } else {
    image(gloria2, 0, 0, width, height);
  }



  
  
}