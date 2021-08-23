class Player{
    constructor(name,id){
        this.name = name;
        this.points = 0;
        this.tokens = new Array();
        this.id = id;
    }
    get getTokens() {
        return this.tokens;
    }

    get getId(){
        return this.id;
    }
    set setId(id){  
        this.id = id;
    }
   
    get getName() {
        return this.name;    
    }
  
    get getPoints() {
        return this.points;    
    }
   
    incrementPoints(increment){
        this.points += increment
    }
    withoutTokens(){
        return this.tokens.length <= 0;
    }

    toString(shiftPlayer){
        
        let string = "";
        let count = 1;

        for(let token of this.tokens){
            if(shiftPlayer){
                string += " " + count +". "+ token.toString(true);
            }
            else{
                string += " " + count +". "+ "🁢";
            }
          
            count++;
        }

        return string;
    }

}