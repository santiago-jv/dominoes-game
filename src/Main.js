const contenedor_bienvenida = document.querySelector("#bienvenida");
const contenedor_login = document.querySelector("#login");
const contenedor_juego = document.querySelector("#juego");
let primerJugador = "PLAYER 1",
    segundoJugador = "PLAYER 2";

const empezar = () => {
    contenedor_bienvenida.style.display = "none";
    contenedor_login.style.display = "block";
};

const iniciarPartida = () => {
    contenedor_login.style.display = "none";
    contenedor_juego.style.display = "block";
    container.style.width = "90%";

    const primeraEntrada = document.querySelector("#nombre1").value;
    const segundaEntrada = document.querySelector("#nombre2").value;

    if (primeraEntrada != "") {
        primerJugador = primeraEntrada;
    }
    if (segundaEntrada != "") {
        segundoJugador = segundaEntrada;
    }

    const domino = new Domino(
        new Jugador(primerJugador, 1),
        new Jugador(segundoJugador, 2)
    );

    domino.iniciarJuego();
};