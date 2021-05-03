 class Ficha {

  constructor(valor1, valor2) {
    this.valor1 = valor1;
    this.valor2 = valor2;
    this.invertida = false;
  }

  toString() {
    //aprende eso del operador ternario xd es chido
    return !this.invertida ? this.fichaGrafica : this.fichaGraficaInvertida;
  }

  set setInvertida(invertida){
    this.invertida = invertida;
  }
  get getInvertida(){
    return this.invertida;
  }
  invertirFicha() {
    let auxiliar = this.valor1;
    this.valor1 = this.valor2;
    this.valor2 = auxiliar;
  }
  
  valorTotalFicha() {
    return this.valor1 + this.valor2;
  }

  getValor1() {
    return this.valor1;
  }
  getValor2() {
    return this.valor2;
  }
  
  esFichaDoble() {
    return this.valor1 === this.valor2;
  }
}
