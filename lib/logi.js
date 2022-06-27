
class culebra{
    x=400;
    y=400;
    liga=null;
}
class comida{
    x=0;
    y=0;
    estado=false;
}

class juego{
    canvas=null
    CULEBRA=null;
    COMIDA=null;

    dibujar(direccion){
        var canvas=this.canvas;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);//limpia el canva
        this.dibujarComida(ctx);
        var tmp = this.CULEBRA;
        var aux = tmp;
        var ultimo = tmp;
        while(ultimo.liga!=null){//buscando el ultimo 
            ultimo=ultimo.liga;
        }

        if(direccion=='w'){ // arriba
            ultimo.y=ultimo.y-20;
        }

        if(direccion=='s'){ // abajo
            ultimo.y=ultimo.y+20;
        }

        if(direccion=='d'){ // derecha 
            ultimo.x=ultimo.x+20;
        }

        if(direccion=='a'){ // izquierda
            ultimo.x=ultimo.x-20;
        }

        if(ultimo.x==this.COMIDA.x&&ultimo.y==this.COMIDA.y){ // encontro la presa tiene que aumentar 
            this.inserta_final(ultimo.x,ultimo.y); // se agrega la posicion actual al ultimo 
        }

        while(aux!=null){  // dibujamos la culebra
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect (aux.x,aux.y,20,20);
            ctx.closePath();
            var temporal=aux;
            aux=aux.liga;
            if(aux!=null){ // intercambiamos posiciones para hacer animacion de movimiento 
                temporal.x=aux.x;
                temporal.y=aux.y;
            }
        }
        this.dibujarNodosLog(); // dibuja la lista
    }

    dibujarComida(ctx){
        if(this.COMIDA.estado==false){
            this.COMIDA.x= parseInt((Math.random()*(40-2)))*20; // se pone random del 2 al 40 y se multiplica x20 porque es lo que se mueve 
            this.COMIDA.y= parseInt((Math.random()*(40-2)))*20; // haciendo lo mismo para lograr proporcionalidad
            this.COMIDA.estado=true; // si es true entonces no se comio aun 
        }
        ctx.beginPath(); // dibuja comida
        ctx.fillStyle = "white";
        ctx.fillRect (this.COMIDA.x,this.COMIDA.y,20,20);
        ctx.closePath();
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
}




function IniciarJuego(){
    var JUEGO=new juego();
    JUEGO.COMIDA=new comida();
    JUEGO.CULEBRA=new culebra();
    JUEGO.canvas=document.getElementById("snake");

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        JUEGO.dibujar(keyName);
    });
}
