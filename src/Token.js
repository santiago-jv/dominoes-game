 class Token {
  constructor(firstValue, secondValue,graphicToken,graphicTokenInverted) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.inverted = false;
    this.graphicToken =graphicToken
    this.graphicTokenInverted = graphicTokenInverted
    this.owner = null
  }

  toString() {
    return !this.inverted ? this.graphicToken : this.graphicTokenInverted;
  }

  invertToken() {
    let auxiliar = this.firstValue;
    this.firstValue = this.secondValue;
    this.secondValue = auxiliar;
  }
  get getInverted(){
    return this.inverted;
  }
  
  get totalValue() {
    return this.firstValue + this.secondValue;
  }

  get getFirstValue() {
    return this.firstValue;
  }
  get getSecondValue() {
    return this.secondValue;
  }
  
  get isDoubleToken() {
    return this.firstValue === this.secondValue;
  }
}
