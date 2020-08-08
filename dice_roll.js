
let scores, roundScore, activePlayer, gamePlaying, turnCount;

function initialization() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  turnCount = 10;
  gamePlaying = true;


  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("turns-0").textContent = "5";
  document.getElementById("turns-1").textContent = "5";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector('.player-turns-0').style.display = 'block';
  document.querySelector('.player-turns-1').style.display = 'block';
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

initialization();

document.querySelector(".btn-new").addEventListener("click", initialization);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function rollDice() {
  document
    .querySelector("#score-" + activePlayer)
    .classList.remove("startRipple");

  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach((die) => {
    if (die.id == "die-" + activePlayer) {
      toggleClasses(die);

      die.dataset.roll = getRandomNumber(1, 6);
      if (gamePlaying) {
        var dice1 = die.dataset.roll;
        roundScore += parseInt(dice1);
      }
    }
  });
  turnCount--;
  scores[activePlayer] += parseInt(roundScore);

  updateUI(activePlayer);


  if (turnCount <= 0) {
    if (scores[0] >= scores[1]) {
      activePlayer = 0;
    } else {
      activePlayer = 1;
    }
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    document.querySelector('.player-turns-' + activePlayer).style.display = 'none';
    gamePlaying = false;
  }
  nextPlayer();
}

function updateUI(player) {
  setTimeout(() => {
    document.querySelector("#score-" + player).innerHTML = scores[player];
    document.querySelector("#score-" + player).classList.add("startRipple");
    let turnsLeft = (Math.floor(turnCount/2) + turnCount%(parseInt(player)+1));
    document.querySelector('#turns-' + player).textContent = turnsLeft < 0 ? 0: turnsLeft; 
  }, 1300);
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
