const welcomeContainer = document.querySelector("#welcome_container");
const loginContainer = document.querySelector("#login");
const gameContainer = document.querySelector("#game_container");


const start = () => {
    welcomeContainer.style.display = "none";
    loginContainer.style.display = "block";
};

const startGame = () => {
    loginContainer.style.display = "none";
    gameContainer.style.display = "block";
    container.style.width = "90%";

    const firstInput = document.querySelector("#nameOfFirstPlayer").value;
    const secondInput = document.querySelector("#nameOfSecondPlayer").value;

    let firstPlayer = firstInput != "" ? firstInput : "Player 1",
        secondPlayer =  secondInput != "" ? secondInput : "Player 2";

    const dominoes = new Dominoes(
        new Player(firstPlayer, 1),
        new Player(secondPlayer, 2)
    );

    dominoes.startGame();
};