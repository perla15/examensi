class Nave{
	constructor(x, y){
    this.w = 20;
    this.h = 150;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.direction = true;
  }

  display(){
    push();
    image(imagenNave, this.x, this.y, 80, 80);
    pop();
  }

  move(x){
    if(x < 0 && this.x > 150)
    {
      this.x += x;
      //this.changeDirection(x>0?true:false);
    }
    if(x > 0 && this.x+this.w < width-150)
    {
      this.x += x;
      //this.changeDirection(x>0?true:false);
    }
    
  }

  changeDirection(direction){
    this.direction = direction;
  }
}