
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
        if(direccion=='w'){ // arriba
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect (this.CULEBRA.x,this.CULEBRA.y-20,20,20);
            ctx.closePath();
            this.CULEBRA.y=this.CULEBRA.y-20;
        }

        if(direccion=='s'){ // abajo
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect (this.CULEBRA.x,this.CULEBRA.y+20,20,20);
            ctx.closePath();
            this.CULEBRA.y=this.CULEBRA.y+20;
        }

        if(direccion=='d'){ // derecha 
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect (this.CULEBRA.x+20,this.CULEBRA.y,20,20);
            ctx.closePath();
            this.CULEBRA.x=this.CULEBRA.x+20;
        }

        if(direccion=='a'){ // izquierda
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect (this.CULEBRA.x-20,this.CULEBRA.y,20,20);
            ctx.closePath();
            this.CULEBRA.x=this.CULEBRA.x-20;
        }

        if(this.CULEBRA.x==this.COMIDA.x&&this.CULEBRA.y==this.COMIDA.y){

        }
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
