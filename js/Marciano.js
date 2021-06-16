class Marciano{

	constructor(x, y){
    this.x = x;
    this.y = y
    this.stepX = 2;
    this.direccion = true;
    this.visible = true;
    this.cambio = true;
    this.c=0;
	}

	display(){
    if(this.cambio == true){
      push();
        image(imagenMarciano, this.x, this.y, 50, 50);
      pop();
    }else{
      push();
        image(imagenMarciano2, this.x, this.y, 40, 40);
      pop();
    }  
		  this.moveX();
      if(this.c==30){
        this.cambioimagen();
        this.c=0;
      }
    this.c++; 
    
	}

	moveX(){
		if(this.direccion==true)
	    {
	      this.x += this.stepX;
	      //this.changeDirection(x>0?true:false);
	    }else
	    {
	      this.x -= this.stepX;
	      //this.changeDirection(x>0?true:false);
	    }
  	}

  	changeDirection(){
  		if(this.direccion==true){
  			this.direccion=false;
  			this.y+=40;
  		}
  		else{
  			this.direccion=true;
  			this.y+=40;
  		}
  	}

    cambioimagen(){
      if(this.cambio==true){
        this.cambio=false;
      }else{
        this.cambio=true;
      }
    }
}