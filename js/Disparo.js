class Disparo{

 constructor(x, y, d, imagen){
    this.x = x;
    this.y = y;
    this.stepY = d;
    this.visible = true;
    //this.c=c;
    this.imagen = imagen;
  }

  display(){
      //fill(this.c);
      //ellipse(this.x, this.y, 10);
      push();
        image(this.imagen, this.x, this.y, 20, 20);
      pop();
      this.moveY();
      //this.hasCollision();
  }

  moveY(){
    this.y+=this.stepY;
  }

  hasCollision(){
    if(this.y - this.d/2 <= 0)
      this.stepY = 4;
    else if(this.y + this.d/2 >= height)
      this.stepY = -4;
  }

  randomColor(){
    var color = [];
    for(var i = 0; i<3; i++)
    {
      color.push(Math.floor(Math.random()*256));
    }
    return color;
  }
}