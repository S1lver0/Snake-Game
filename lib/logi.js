
class culebra{
    x=400;
    y=400;
    liga=null;
}
class comida{
    x=0;
    y=0;
    estado=false;
    contador=0;
}

class juego{
    canvas=null
    CULEBRA=null;
    COMIDA=null;
    tiempo=100;
    direccion='7'; // guarda tecla usada
    derrota=false; 
    imagen=null; // imagen de pantalla de perdio

    dibujar(direccion){
        let temporizador=setInterval(()=>{
            var image = document.getElementById("source");
            var cabeza = document.getElementById("cabeza");
            var imagen_comida = document.getElementById("comida");
            var canvas=this.canvas;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);//limpia el canva
            this.dibujarComida(ctx,canvas,imagen_comida);
            var tmp = this.CULEBRA;
            var aux = tmp;
            var ultimo = tmp;
            while(ultimo.liga!=null){//buscando el ultimo 
                ultimo=ultimo.liga;
            }

            if(direccion=='w'){ // arriba
                ultimo.y=ultimo.y-40;
                this.direccion='w';
                this.chocar_cola(ultimo,temporizador); // analiza si choco 
            }

            if(direccion=='s'){ // abajo
                ultimo.y=ultimo.y+40;
                this.direccion='s';
                this.chocar_cola(ultimo,temporizador);
            }

            if(direccion=='d'){ // derecha 
                ultimo.x=ultimo.x+40;
                this.direccion='d';
                this.chocar_cola(ultimo,temporizador);
            }

            if(direccion=='a'){ // izquierda
                ultimo.x=ultimo.x-40;
                this.direccion='a';
                this.chocar_cola(ultimo,temporizador);
            }

            if(ultimo.x==this.COMIDA.x&&ultimo.y==this.COMIDA.y){ // encontro la presa tiene que aumentar 
                this.inserta_final(ultimo.x,ultimo.y); // se agrega la posicion actual al ultimo 
                this.COMIDA.estado=false;
                this.COMIDA.contador=this.COMIDA.contador+1;
                if(this.tiempo>10){
                    this.tiempo=this.tiempo-2;
                }
            }
            //chocar pared
            if(ultimo.x>800||ultimo.y>800||ultimo.x<0||ultimo.y<0){ // analiza si choco con pared
                this.derrota=true;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.pantalla_perdio(temporizador);
            }
            if(this.derrota==false){ 
                while(aux!=null){  // dibujamos la culebra
                    ctx.beginPath();
                    ctx.fillStyle = "white";
                    ctx.drawImage(image,aux.x,aux.y,40,40);
                    ctx.closePath();
                    var temporal=aux;
                    if(aux.liga==null){
                        ctx.beginPath(); // dibuja comida
                        ctx.fillStyle = "white";
                        ctx.drawImage(cabeza,aux.x,aux.y,40,40);
                        ctx.closePath();
                    }
                    aux=aux.liga;
                    if(aux!=null){ // intercambiamos posiciones para hacer animacion de movimiento 
                        temporal.x=aux.x;
                        temporal.y=aux.y;
                    }
                }
            }
            //this.chocar_cola();
            this.dibujarNodosLog(); // dibuja la lista
            document.addEventListener('keydown', (event2) => {
                const keyName = event2.key;
                if(keyName=='w'){ // abajo
                    clearInterval(temporizador);
                }
                if(keyName=='s'){ // abajo
                    clearInterval(temporizador);
                }
                if(keyName=='d'){ // derecha 
                    clearInterval(temporizador);
                }
                if(keyName=='a'){ // izquierda
                    clearInterval(temporizador);
                }  
                console.log(keyName,direccion);
            });

        },this.tiempo);
    }

    dibujarComida(ctx,canvas,imagen){
        if(this.COMIDA.estado==false){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.COMIDA.x= parseInt((Math.random()*(20-2)))*40; // se pone random del 2 al 20 y se multiplica x40 porque es lo que se mueve 
            this.COMIDA.y= parseInt((Math.random()*(20-2)))*40; // haciendo lo mismo para lograr proporcionalidad
            this.COMIDA.estado=true; // si es true entonces no se comio aun 
        }
        ctx.beginPath(); // dibuja comida
        ctx.fillStyle = "white";
        ctx.drawImage(imagen,this.COMIDA.x,this.COMIDA.y,40,40); // dibuja la comida con imagen
        ctx.closePath();
    }

    chocar_cola(ultimo,temporizador){// analiza si la cabeza choco con una parte del cuerpo
        var dt=this.CULEBRA;
        while(dt.liga!=null){  //como el final es la cabeza se tiene que detener ahi 
            if(dt.x==ultimo.x&&dt.y==ultimo.y){// pregunta si la cabeza es igual a algun elemento de lista
                this.derrota=true;
                this.pantalla_perdio(temporizador); 
             }
            dt=dt.liga;
        }
    }



     ///////////////////////////////////////////
     inserta_final(x,y){ // agrega al final de la lista enlazada 
        var P=this.CULEBRA;
        var T=P;
        while(T.liga!=null){
            T=T.liga; 
        }
        var Q=new culebra();
        Q.x=x;
        Q.y=y;
        Q.liga=null;
        T.liga=Q;
        
        this.INICIO=P;
    }/////////////////////////////////////////////

    dibujarNodosLog(){// mostrando la lista 
        var	tmp=this.CULEBRA;
        var cad="";
        var cad2="";
        while(tmp!=null){
            cad+=tmp.x+"::";
            cad2+=tmp.y+"::";
            tmp=tmp.liga;
        }
        console.log("x=",cad,"y=",cad2);
    }

    validador(key){// nos ayuda a corregir el error de caso moverse adelante no poder retroceder 
        if(this.direccion=='7'){
            this.dibujar(key);
        }
        else{
            if(this.direccion=='a'){
                if(key=='d'){
                    this.dibujar('a');
                }else{
                    this.dibujar(key);
                }
            }
            if(this.direccion=='s'){
                if(key=='w'){
                    this.dibujar('s');
                }else{
                    this.dibujar(key);
                }
            }
            if(this.direccion=='d'){
                if(key=='a'){
                    this.dibujar('d');
                }else{
                    this.dibujar(key);
                }
            }
            if(this.direccion=='w'){
                if(key=='s'){
                    this.dibujar('w');
                }else{
                    this.dibujar(key);
                }
            }
        }
    }

    pantalla_perdio(temporizador){ // pantalla final 
        var canvas=this.canvas;
        var ctx = canvas.getContext('2d');
        clearInterval(temporizador);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // limpia la pantalla 
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font = '50px Arial';
        ctx.fillText("JUEGO TERMINADO",180,150);
        ctx.drawImage(this.imagen,250,200,360,360);
        ctx.fillText("SCORE : ",180,650);
        ctx.fillText(this.COMIDA.contador,400,650);
        ctx.closePath();
    }
}

function reset(){
    location.reload();
}






function IniciarJuego(){
    const boton = document.getElementById("inicio");
    var JUEGO=new juego();
    JUEGO.COMIDA=new comida();
    JUEGO.CULEBRA=new culebra();
    JUEGO.canvas=document.getElementById("snake");
    JUEGO.imagen=document.getElementById("perdio"); // imagen de perdido 
    boton.disabled=true;
    var canvas=JUEGO.canvas;
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.font = '50px Arial';
    ctx.fillText("CONTROLES :  W-A-S-D",100,300);
    ctx.font = '20px Arial';
    ctx.fillText("Presione una tecla para iniciar el juego",200,600);
    ctx.closePath();
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if(JUEGO.derrota==false){ // caso de perder no volver a ejecutar 
            JUEGO.validador(keyName);
        }
    });
}
