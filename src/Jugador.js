class Jugador{
    constructor(nombre,id){
        this.nombre = nombre;
        this.puntos = 0;
        this.fichas = new Array();
        this.id = id;
    }
    get getFichas() {
        return this.fichas;
    }
    get getId(){
        return this.id;
    }
    set setId(id){  
        this.id = id;
    }
   
    get getNombre() {
        return this.nombre;    
    }
  
    get getPuntos() {
        return this.puntos;    
    }
   
    incrementarPuntos(incremento){
        this.puntos += incremento
    }
    sinFichas(){
        return this.fichas.length <= 0;
    }

    toString(turnoPlayer){
        
        let cadena = "";
        let c = 1;

        for(let ficha of this.fichas){
            if(turnoPlayer){
                cadena += " " + c +". "+ ficha.toString(true);
            }
            else{
                cadena += " " + c +". "+ "🁢";
            }
          
            c++;
        }

        return cadena;
    }

}