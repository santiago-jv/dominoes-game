const tableOfFirstPlayer = document.querySelector('#tokensOfFirstPlayer');
const tableOfSecondPlayer = document.querySelector('#tokensOfSecondPlayer');
const table = document.querySelector('#stringOfTokens');

class Domino {
    constructor(firstPlayer, secondPlayer) {
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
        this.gameTokens = new Array();
        this.graphicTokens = new Array("🁣", "🀲", "🀳", "🀴", "🀵", "🀶", "🀷", "🀸", "🁫", "🀺", "🀻", "🀼", "🀽", "🀾", "🀿", "🁀", "🁳", "🁂", "🁃", "🁄", "🁅", "🁆", "🁇", "🁈", "🁻", "🁊", "🁋", "🁌", "🁍", "🁎", "🁏", "🁐", "🂃", "🁒", "🁓", "🁔", "🁕", "🁖", "🁗", "🁘", "🂋", "🁚", "🁛", "🁜", "🁝", "🁞", "🁟", "🁠", "🂓");
        this.graphicTokensInverted = new Array("🁣", "🀸", "🀿", "🁆", "🁍", "🁔", "🁛", "🀲", "🁫", "🁀", "🁇", "🁎", "🁕", "🁜", "🀳", "🀺", "🁳", "🁈", "🁏", "🁖", "🁝", "🀴", "🀻", "🁂", "🁻", "🁐", "🁗", "🁞", "🀵", "🀼", "🁃", "🁊", "🂃", "🁘", "🁟", "🀶", "🀽", "🁄", "🁋", "🁒", "🂋", "🁠", "🀷", "🀾", "🁅", "🁌", "🁓", "🁚", "🂓");
        this.thrownTokens = new Array();
        this.shiftPlayer = null;
        this.firstToken;
        this.buttonOfFirstPlayer = document.querySelector('#launchTokenFirstPlayer');
        this.buttonOfSecondPlayer = document.querySelector('#launchTokenSecondPlayer');
        this.repository = document.querySelector('#repository');
    }

    startGame = () => {
        this.createTokens();
        this.assignTokens();
        this.determineShift();

        this.repository.addEventListener('click', this.provideMoreTokensToPlayer)
        this.buttonOfFirstPlayer.addEventListener('click', this.launchToken)
        this.buttonOfSecondPlayer.addEventListener('click', this.launchToken)

        document.querySelector('#paragraphOfFirstPlayer').textContent = this.firstPlayer.getName;
        document.querySelector('#paragraphOfSecondPlayer').textContent = this.secondPlayer.getName;

    }

    renderGameTable = (token, extrem) => {

        let tokenDOM = document.createElement('span');
        tokenDOM.textContent = token.toString();
        if (extrem == 'Izquierda') {
            table.insertBefore(tokenDOM, table.firstChild);
        } else if (extrem == 'Derecha') {
            table.appendChild(tokenDOM)
        }


    }

    renderTokensOfThePlayers = () => {
        if (this.shiftPlayer == this.firstPlayer) {
            tableOfFirstPlayer.textContent = this.firstPlayer.toString(true);
            tableOfSecondPlayer.textContent = this.secondPlayer.toString(false);
        } else {
            tableOfFirstPlayer.textContent = this.firstPlayer.toString(false);
            tableOfSecondPlayer.textContent = this.secondPlayer.toString(true);
        }


    }

    createTokens = () => {
        let count = 0

        for (let i = 0; i < 7; i++) {
            for (let k = 0; k < 7; k++) {
                let token = new Token(i, k, this.graphicTokens[count], this.graphicTokensInverted[count]);
                this.gameTokens.push(token);
                count++;
            }
        }
    }
    
    assignTokens = () => { 
        for (let i = 0; i < 2; i++) {
            for (let k = 0; k < 7; k++) {
                let randomIndex = parseInt(Math.random() * this.gameTokens.length);
                const token = this.gameTokens[randomIndex];
                let tokens;

                if (i == 0) {
                    token.owner = this.firstPlayer;
                    tokens = this.firstPlayer.tokens
                    tokens.push(token);
                } else {
                    token.owner = this.secondPlayer;
                    tokens = this.secondPlayer.tokens;
                    tokens.push(token);
                }

                this.gameTokens.splice(randomIndex, 1);
            }

        }

    }

    determineShift = () => {
        let higherToken = this.calculateHigher(true);

        if (higherToken == null) {
            higherToken = this.calculateHigher(false);
        }

        if (higherToken.owner == this.firstPlayer) {
            this.shiftPlayer = this.firstPlayer;
        } else {
            this.shiftPlayer = this.secondPlayer;
        }
        this.renderTokensOfThePlayers();

        this.firstToken = higherToken;
        console.log("La mayor ficha fue: " + this.firstToken.toString())
    }

    calculateHigher = (isHigherDouble) => {
        let higherToken = new Token(-1, -1);
        for (let i = 0; i < 2; i++) {
            for (let token of i == 0 ? this.firstPlayer.getTokens : this.secondPlayer.getTokens) {
                if (isHigherDouble) {
                    if (higherToken.totalValue < token.totalValue && token.isDoubleToken) {
                        higherToken = token;
                    }
                } else {
                    if (higherToken.totalValue < token.totalValue && !token.isDoubleToken) {
                        higherToken = token;
                    }
                }

            }

        }

        if (higherToken.totalValue == -2) {
            return null;
        }
        return higherToken;
    }

    launchToken = (elementOfTheDOM) => {
        if (elementOfTheDOM.target.id == 'launchTokenFirstPlayer') {
            this.checkLaunch(this.firstPlayer);
        } else {
            this.checkLaunch(this.secondPlayer)
        }

    }

    checkLaunch = (player) =>{
        const tokenOfPlayer = player.id === 1? '#inputOfFirstPlayer' :'#inputOfSecondPlayer'

        const index = parseInt(document.querySelector(tokenOfPlayer).value) - 1;
        let extrem;

        if (this.shiftPlayer == this.firstPlayer) {
            extrem = document.querySelector('#extremOfFirstPlayer').value ;
       
        } else {
            extrem = document.querySelector('#extremOfSecondPlayer').value;
        }

     

        if (this.shiftPlayer == player) {
            if (index >= 0 && index < player.tokens.length) {

                if (this.isValidToken(player.tokens[index], extrem)) {
                    if (extrem == "") {
                        alert("Selecciona un extremo para realizar la jugada")
                        return null;
                    }
                    player.tokens.splice(index, 1)

                    if (player.id == 1) {
                        this.shiftPlayer = this.secondPlayer;
                        document.querySelector('#extremOfFirstPlayer').value = null
                    } else {
                        this.shiftPlayer = this.firstPlayer;
                        document.querySelector('#extremOfSecondPlayer').value = null
                    }

                    document.querySelector(tokenOfPlayer).value = null;

                    this.renderTokensOfThePlayers();
                    if (player.tokens.length == 0) {

                        this.repository.removeEventListener('click', this.provideMoreTokensToPlayer)
                        this.buttonOfFirstPlayer.removeEventListener('click', this.launchToken)
                        this.buttonOfSecondPlayer.removeEventListener('click', this.launchToken)
                        alert("El juego ha terminado. El ganador es: " +
                            player.getName)

                    } else {
                        alert("Ficha colocada correctamente. Ahora el turno es del jugador " + this.shiftPlayer.getName)
                    }

                } else {
                    alert(`La ficha  ${player.tokens[index].toString()} no puede colocarse`)
                }
            } else {
                alert("Índice rechazado", index)
            }
        } else {
            alert("El turno le pertence a " + this.shiftPlayer.getName)
        }
    }

    isValidToken = (token, extrem) => {
        if (this.firstToken == token) {
            this.thrownTokens.push(token);

            this.renderGameTable(token, extrem)

            return true;
        } else {
            if (this.thrownTokens.length != 0) {
                let validatedToken = false;
                if (extrem == 'Izquierda') {
                    if (this.thrownTokens[0].getFirstValue == token.getSecondValue) {
                        console.log(this.thrownTokens)
                        this.thrownTokens.unshift(token);
                        validatedToken = true;

                    } else if (this.thrownTokens[0].getFirstValue == token.getFirstValue) {
                        //invertir ficha
                        token.invertToken();
                        token.inverted = true
                        validatedToken = true;
                        this.thrownTokens.unshift(token);


                    }
                } 
                else if (extrem == 'Derecha') {

                    if (this.thrownTokens[this.thrownTokens.length - 1].getSecondValue == token.getFirstValue) {
                        this.thrownTokens.push(token);
                        validatedToken = true;


                    } else if (this.thrownTokens[this.thrownTokens.length - 1].getSecondValue == token.getSecondValue) {
                        //invertir ficha
                        token.invertToken();
                        token.inverted = true
                        validatedToken = true;
                        this.thrownTokens.push(token);
                    }
                } else {
                    alert('Escoge un extremo válido')
                }

                if (validatedToken) {
                    this.renderGameTable(token, extrem)

                    return true;
                }


            } else {
                alert("Tu cuentas con la mayor ficha para comenzar la partida (La  prioridad es lanzar la mayor ficha doble). ")
            }
        }

    }

    checkUtility = (token) => {

        if (this.thrownTokens[0].getFirstValue == token.getSecondValue()) {
            return true;
        } else if (this.thrownTokens[0].getFirstValue == token.getFirstValue) {
            return true;

        } else if (this.thrownTokens[this.thrownTokens.length - 1].getSecondValue == token.getFirstValue) {
            return true;
        } else if (this.thrownTokens[this.thrownTokens.length - 1].getSecondValue == token.getSecondValue) {
            return true;

        }

        return false;

    }

    provideMoreTokensToPlayer = () => {
        if (this.thrownTokens.length != 0) {
            let uselessToken = true;
            let random;
            let token

            for (let i = 0; i < this.shiftPlayer.tokens.length; i++) {

                if (this.checkUtility(this.shiftPlayer.tokens[i])) {
                    uselessToken = false;
                    alert("Aún puedes realizar un lanzamiento con las fichas que tienes actualmente")
                    break;
                }
            }




            while (uselessToken) {
                random = parseInt(Math.random() * this.gameTokens.length);

                token = this.gameTokens[random];
                console.log(random, token)
                this.gameTokens.splice(random, 1);
                this.shiftPlayer.tokens.push(token);
                this.renderTokensOfThePlayers();
                if (this.checkUtility(token)) {
                    uselessToken = false;
                }
            }

        } else {
            alert('No has realizado el primer lanzamiento')
        }
    }
}