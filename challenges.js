

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;


//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"



document.querySelector(".btn-roll").addEventListener("click", function () {


    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2.Display the result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";


        //3. Update the round score only if the number was not 1
        if(dice === 6 && lastDice === 6) {
            //player loses score
            scores[activePlayer] = 0;
             document.querySelector("#score-" + activePlayer).textContent = "0";
            nextPlayer();

        }
        else if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }
        
        lastDice = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the user interface
        document.querySelector("#score-" + activePlayer).textContent = acores[activePlayer];
        
        var input = document.querySelector(".final-score").value;
        var winningScore;
        
        //undefined, 0, null, "" are COERCED to false
        //Anything else is COERCED to true
        if(input) {
         winningScore = input;
        } else {
            winningScore = 100;
        }


        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;

        } else {
            nextPlayer();
        }

        //next player
        nextPlayer();

    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";

}

document.querySelector(".btn-new").addEventListener("click", init);



function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = 'none';

    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

