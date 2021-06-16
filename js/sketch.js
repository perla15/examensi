var array = [];
var arrayMarcianos = [];
var arrayDisparoMarcianos = [];
var arrayVidas = [];
var xm;
var ym = 10;
var p1;
var speed = 10;
var cont=0;
var cont2=0;
var xdm=0;
var xdy=0;
var aux;
var pause=true;
var revision=1;
var score=0;
var iniciar = false;
var gameover=false;


function preload() {
    imgfondo = loadImage("assets/fondo.jpg");
    imagenNave = loadImage("assets/nave.png");
    imagenMarciano = loadImage("assets/marciano.png");
    imagenMarciano2 = loadImage("assets/marciano2.png");
    imagenShot = loadImage("assets/shot3.png");
    imagenShot2 = loadImage("assets/shot2.png");
    imagenFondoInicial = loadImage("assets/fondoInicio.jpg");
    balaNave = loadSound('assets/balaNave.mp3');
    impacto = loadSound('assets/impacto(2).mp3');
    impacto2 = loadSound('assets/impacto.mp3');
    ganar = loadSound('assets/ganar.mp3');
    perder = loadSound('assets/perder.mp3');
    gameOver = loadImage("assets/gameover.png");
    sonidopause = loadSound('assets/pause.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	p1 = new Nave(width/2, height-70);
	xm = width/5;
	for (var i = 0; i < 50; i++) {
		arrayMarcianos.push(new Marciano(xm, ym));
		xm+=((width/5)*3)/10;
		cont++;
		if(cont==10){
			ym+=50;
			xm = width/5;
			cont=0;
		}
	}
	arrayVidas.push(new Nave(10,height-390));
	arrayVidas.push(new Nave(10,height-330));
	arrayVidas.push(new Nave(10,height-270));
}

function draw() {
	background(imgfondo);
	if(iniciar==true){
		if(gameover==false){
			if(pause==false && revision!=0){
				revision=0;

				//Revision de marcianos vivos
				for(marciano of arrayMarcianos){
					if(marciano.visible==true){
						revision++;
					}
				}
				if(revision==0){
					gameover=true;
					ganar.play();
				}

				//colison entre balas
				/*for (var i = 0; i < arrayDisparoMarcianos.length; i++) {
					if(array.length!=0 && arrayDisparoMarcianos!=0){
						for (var k = 0; k < array.length; k++) {
							if(array[k].x>arrayDisparoMarcianos[i].x && array[k].x<arrayDisparoMarcianos[i].x+15){
								if(array[k].y>arrayDisparoMarcianos[i].y-5 && array[k].y<arrayDisparoMarcianos[i].y+15){
									arrayDisparoMarcianos.splice(i,1);
									array.splice(k,1);
								}
							}
						}
					}
				}*/

				//colision bala marciano nave
				for (var i = 0; i < arrayDisparoMarcianos.length; i++) {
					if(arrayDisparoMarcianos[i].x>p1.x+10 && arrayDisparoMarcianos[i].x<p1.x+60){
						if(arrayDisparoMarcianos[i].y>p1.y && arrayDisparoMarcianos[i].y<p1.y+60){
							for (var j =0; j <1; j++) {
								impacto2.play();
								arrayVidas.splice(j,1);
								arrayDisparoMarcianos.splice(i,1);
							}
							if(arrayVidas.length==0){
								gameover=true;
								perder.play();
							}
						}
					}else if(arrayDisparoMarcianos[i].y>height-5){
						arrayDisparoMarcianos.splice(i,1);
					}
				}

				//dibujo de marcianos y colision.
				for (var i = 0; i < arrayMarcianos.length; i++) {
					if(arrayMarcianos[i].visible==true){
					arrayMarcianos[i].display();
					}
					if(arrayMarcianos[i].visible==true){	
						for (var j = 0; j < array.length; j++) {
							if(array[j].x>=arrayMarcianos[i].x && array[j].x<=arrayMarcianos[i].x+30){
								if(array[j].y>=arrayMarcianos[i].y && array[j].y<=arrayMarcianos[i].y+20){
									impacto.play();
									arrayMarcianos[i].visible=false;
									score+=5;
									array.splice(j,1);
								}
							}	
						}
					}
					if(arrayMarcianos[i].visible==true){
						if(arrayMarcianos[i].y>height-100){
							gameover=true;
							perder.play();
						}
					}
				}

				//Cambio de Direccion
				for (var i = 0; i < 30; i++) {
					if(arrayMarcianos[i].x>width-150){
						for (var marciano of arrayMarcianos) {
						marciano.x-=5;
				  		marciano.changeDirection();
						}
					}
					else if(arrayMarcianos[i].x<150){
						for (var marciano of arrayMarcianos) {
						marciano.x+=5;
				  		marciano.changeDirection();
						}
					}
				}

				//escoge al marciano random para el disparo
				if(cont2==30){
					while(xdm==0 && xdy==0){
						aux=random(arrayMarcianos);
						if(aux.visible==true){
							xdm=aux.x;
							xdy=aux.y;
						}

					}
					DisparoMarciano(xdm,xdy);
					cont2=0;
					xdm=0;
					xdy=0;
				}
				cont2++;

				//Bala sale la pantalla
				for (var i = 0; i <30; i++) {
					for (var j = 0; j < array.length; j++) {
						if(array[j].y<5){
							array.splice(j,1);
						}
					}
				}

				//dibujo de bala de nave
				for (var bola of array) {
			  		bola.display();
				}

				//dibujo de bala de marciano
				for( var bola of arrayDisparoMarcianos){
					bola.display();
				}

				//dibujo de vidas de nave
				for (var vida of arrayVidas) {
			  			vida.display();
				}
				//dibujo de Jugador
				p1.display();

				move();

				push();
					textSize(20);
					fill("white");
					stroke("white");
					text("VIDAS", 20, height-410);
				pop();
				push();
					textSize(20);
					fill("white");
					stroke("white");
					text("SCORE",20,100);
					textSize(30);
					text(`${score}`, 30, 140);
				pop();
			}
			else{
				push();
					textSize(30);
					textAlign(CENTER, CENTER);
					fill("white");
					text("Juego Pausado", width/2-15, 250);
				pop();
			}
		}else{
			background(gameOver);
		}
	}else{
		background(imagenFondoInicial);
	}
}

function move(){
	if(keyIsDown(LEFT_ARROW))
		p1.move(-speed);
	else if(keyIsDown(RIGHT_ARROW))
		p1.move(speed);
}

function keyPressed(){
	if(iniciar==true){
		if(gameover==false){
			if(pause==false){
				if(keyCode === 32){
					balaNave.play();
					array.push(new Disparo(p1.x+32, p1.y,-4,imagenShot));
				}
			}
		}
	}
	if(keyCode === 13){
		if(pause==true){
			pause=false;
			sonidopause.play();
		}else{
			pause=true;
			sonidopause.play();
		}
		if(iniciar==false){
			iniciar=true;
		}
		if(gameover==true){
			location.reload();
		}
	}
}

function DisparoMarciano(x,y){
	arrayDisparoMarcianos.push(new Disparo(x+15, y+35,+3,imagenShot2));
}