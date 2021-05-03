const mesaDelPrimerJugador = document.querySelector('#fichas_player1');
const mesaDelSegundoJugador = document.querySelector('#fichas_player2');
const table = document.querySelector('#cadena_fichas');

class Domino {
    constructor(primerJugador, segundoJugador) {
        this.primerJugador = primerJugador;
        this.segundoJugador = segundoJugador;
        this.fichasMostradas = "";
        this.fichasJuego = new Array();
        this.fichasGraficas = new Array("🁣", "🀲", "🀳", "🀴", "🀵", "🀶", "🀷", "🀸", "🁫", "🀺", "🀻", "🀼", "🀽", "🀾", "🀿", "🁀", "🁳", "🁂", "🁃", "🁄", "🁅", "🁆", "🁇", "🁈", "🁻", "🁊", "🁋", "🁌", "🁍", "🁎", "🁏", "🁐", "🂃", "🁒", "🁓", "🁔", "🁕", "🁖", "🁗", "🁘", "🂋", "🁚", "🁛", "🁜", "🁝", "🁞", "🁟", "🁠", "🂓");
        this.fichasGraficasInvertidas = new Array("🁣", "🀸", "🀿", "🁆", "🁍", "🁔", "🁛", "🀲", "🁫", "🁀", "🁇", "🁎", "🁕", "🁜", "🀳", "🀺", "🁳", "🁈", "🁏", "🁖", "🁝", "🀴", "🀻", "🁂", "🁻", "🁐", "🁗", "🁞", "🀵", "🀼", "🁃", "🁊", "🂃", "🁘", "🁟", "🀶", "🀽", "🁄", "🁋", "🁒", "🂋", "🁠", "🀷", "🀾", "🁅", "🁌", "🁓", "🁚", "🂓");
        this.contadorValores = new Array(0, 0, 0, 0, 0, 0, 0);
        this.fichasJugadas = new Array();
        this.limiteAlcanzado = false;
        this.turnoJugador = null;
        this.primeraFicha;
        this.btn_primerJugador = document.querySelector('#btn_lanzar1');
        this.btn_segundoJugador = document.querySelector('#btn_lanzar2');
        this.repositorio = document.querySelector('#repositorio');
    }

    iniciarJuego() {
        this.crearFichas();
        this.asignarFichas();
        this.determinarTurno();



        this.repositorio.addEventListener('click', this.añadirFichasRepositorio)
        this.btn_primerJugador.addEventListener('click', this.realizarLanzamiento)
        this.btn_segundoJugador.addEventListener('click', this.realizarLanzamiento)

        document.querySelector('#nombre_1').textContent = this.primerJugador.getNombre;
        document.querySelector('#nombre_2').textContent = this.segundoJugador.getNombre;

    }

    renderizarMesaJuego(ficha, extremo) {

        let fichaDOM = document.createElement('span');
        fichaDOM.textContent = ficha.toString();
        if (extremo == 'Izquierda') {
            table.insertBefore(fichaDOM, table.firstChild);
        } else if (extremo == 'Derecha') {
            table.appendChild(fichaDOM)
        }


    }
    renderizarFichasDeJugadores() {
        if (this.turnoJugador == this.primerJugador) {
            mesaDelPrimerJugador.textContent = this.primerJugador.toString(true);
            mesaDelSegundoJugador.textContent = this.segundoJugador.toString(false);
        } else {
            mesaDelPrimerJugador.textContent = this.primerJugador.toString(false);
            mesaDelSegundoJugador.textContent = this.segundoJugador.toString(true);
        }


    }
    crearFichas() {
        let c = 0

        for (let i = 0; i < 7; i++) {
            for (let k = 0; k < 7; k++) {
                let ficha = new Ficha(i, k);
                ficha.fichaGrafica = this.fichasGraficas[c];
                ficha.fichaGraficaInvertida = this.fichasGraficasInvertidas[c];
                this.fichasJuego.push(ficha);
                c++;
            }
        }
    }
    asignarFichas() { 
        for (let i = 0; i < 2; i++) {
            for (let k = 0; k < 7; k++) {
                let random = parseInt(Math.random() * this.fichasJuego.length);
                const ficha = this.fichasJuego[random];
                let fichas;

                if (i == 0) {
                    ficha.portadorFicha = this.primerJugador;
                    fichas = this.primerJugador.fichas
                    fichas.push(ficha);
                } else {
                    ficha.portadorFicha = this.segundoJugador;
                    fichas = this.segundoJugador.fichas;
                    fichas.push(ficha);
                }

                this.fichasJuego.splice(random, 1);
            }

        }

    }

    determinarTurno() {
        let mayorFicha = this.calcularMayor(true);

        if (mayorFicha == null) {
            mayorFicha = this.calcularMayor(false);
        }

        if (mayorFicha.portadorFicha == this.primerJugador) {
            this.turnoJugador = this.primerJugador;
        } else {
            this.turnoJugador = this.segundoJugador;
        }
        this.renderizarFichasDeJugadores();

        this.primeraFicha = mayorFicha;
        console.log("La mayor ficha fue: " + this.primeraFicha.toString())
    }
    calcularMayor(mayor) {
        let fichaMayor = new Ficha(-1, -1);
        for (let i = 0; i < 2; i++) {
            for (let ficha of i == 0 ? this.primerJugador.getFichas : this.segundoJugador.getFichas) {
                if (mayor) {
                    if (fichaMayor.valorTotalFicha() < ficha.valorTotalFicha() && ficha.esFichaDoble()) {
                        fichaMayor = ficha;
                    }
                } else {
                    if (fichaMayor.valorTotalFicha() < ficha.valorTotalFicha() && !ficha.esFichaDoble()) {
                        fichaMayor = ficha;
                    }
                }

            }

        }

        if (fichaMayor.valorTotalFicha() == -2) {
            return null;
        }
        return fichaMayor;
    }

    realizarLanzamiento = (elemento) => {
        if (elemento.target.id == 'btn_lanzar1') {
            this.verificarLanzamiento(this.primerJugador);
        } else {
            this.verificarLanzamiento(this.segundoJugador)
        }

    }


    verificarLanzamiento(jugador) {
        const index = parseInt(document.querySelector('#input_player' + jugador.id + '').value) - 1;
        let extremo;

        if (this.turnoJugador == this.primerJugador) {
            extremo = document.querySelector('#extremo_1').value;
        } else {
            extremo = document.querySelector('#extremo_2').value;
        }

        if (this.turnoJugador == jugador) {
            if (index >= 0 && index < jugador.fichas.length) {

                if (this.fichaValida(jugador.fichas[index], extremo)) {
                    jugador.fichas.splice(index, 1)

                    if (jugador.id == 1) {
                        this.turnoJugador = this.segundoJugador;
                        document.querySelector('#extremo_1').value = null
                    } else {
                        this.turnoJugador = this.primerJugador;
                        document.querySelector('#extremo_2').value = null
                    }



                    document.querySelector('#input_player' + jugador.id + '').value = null;

                    this.renderizarFichasDeJugadores();
                    if (jugador.fichas.length == 0) {

                        this.repositorio.removeEventListener('click', this.añadirFichasRepositorio)
                        this.btn_primerJugador.removeEventListener('click', this.realizarLanzamiento)
                        this.btn_segundoJugador.removeEventListener('click', this.realizarLanzamiento)
                        alert("El juego ha terminado. El ganador es: " +
                            jugador.getNombre)

                    } else {
                        alert("Ficha colocada correctamente. Ahora el turno es del jugador " + this.turnoJugador.getNombre)
                    }

                } else {
                    alert(`La ficha  ${jugador.fichas[index].toString()} no puede colocarse`)
                }
            } else {
                alert("Índice rechazado", index)
            }
        } else {
            alert("El turno le pertence a " + this.turnoJugador.getNombre)
        }
    }

    fichaValida(ficha, extremo) {
        if (this.primeraFicha == ficha) {
            this.fichasJugadas.push(ficha);

            this.renderizarMesaJuego(ficha, extremo)

            return true;
        } else {
            if (this.fichasJugadas.length != 0) {
                let fichaValidada = false;
                if (extremo == 'Izquierda') {
                    if (this.fichasJugadas[0].getValor1() == ficha.getValor2()) {
                        console.log(this.fichasJugadas)
                        this.fichasJugadas.unshift(ficha);
                        fichaValidada = true;

                    } else if (this.fichasJugadas[0].getValor1() == ficha.getValor1()) {
                        //invertir ficha
                        ficha.invertirFicha();
                        ficha.invertida = true
                        fichaValidada = true;
                        this.fichasJugadas.unshift(ficha);


                    }
                } else if (extremo == 'Derecha') {

                    if (this.fichasJugadas[this.fichasJugadas.length - 1].getValor2() == ficha.getValor1()) {
                        this.fichasJugadas.push(ficha);
                        fichaValidada = true;


                    } else if (this.fichasJugadas[this.fichasJugadas.length - 1].getValor2() == ficha.getValor2()) {
                        //invertir ficha
                        ficha.invertirFicha();
                        ficha.invertida = true
                        fichaValidada = true;
                        this.fichasJugadas.push(ficha);


                    }
                } else {
                    alert('Escoge un extremo válido')
                }

                if (fichaValidada) {
                    this.renderizarMesaJuego(ficha, extremo)

                    return true;
                }


            } else {
                alert("Tu cuentas con la mayor ficha para comenzar la partida (La  prioridad es lanzar la mayor ficha doble). ")
            }
        }

    }
    comprobarUtilidad = (ficha) => {

        if (this.fichasJugadas[0].getValor1() == ficha.getValor2()) {
            return true;
        } else if (this.fichasJugadas[0].getValor1() == ficha.getValor1()) {
            return true;

        } else if (this.fichasJugadas[this.fichasJugadas.length - 1].getValor2() == ficha.getValor1()) {
            return true;
        } else if (this.fichasJugadas[this.fichasJugadas.length - 1].getValor2() == ficha.getValor2()) {
            return true;

        }

        return false;

    }

    añadirFichasRepositorio = () => {
        if (this.fichasJugadas.length != 0) {
            let fichaInutil = true;
            let random;
            let ficha

            for (let i = 0; i < this.turnoJugador.fichas.length; i++) {

                if (this.comprobarUtilidad(this.turnoJugador.fichas[i])) {
                    fichaInutil = false;
                    alert("Aún puedes realizar un lanzamiento con las fichas que tienes actualmente")
                    break;
                }
            }




            while (fichaInutil) {
                random = parseInt(Math.random() * this.fichasJuego.length);

                ficha = this.fichasJuego[random];
                console.log(random, ficha)
                this.fichasJuego.splice(random, 1);
                this.turnoJugador.fichas.push(ficha);
                this.renderizarFichasDeJugadores();
                if (this.comprobarUtilidad(ficha)) {
                    fichaInutil = false;
                }
            }

        } else {
            alert('No has realizado el primer lanzamiento')
        }
    }

}