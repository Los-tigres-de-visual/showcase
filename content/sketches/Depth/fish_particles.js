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