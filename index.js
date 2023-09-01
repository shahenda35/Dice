"use strict";
//Selceting elements
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

const name0 = document.getElementById("name-0");
const name1 = document.getElementById("name-1");

const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");

const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");

const ImgDice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNew = document.querySelector(".btn-new");

let scores, currentScore, activePlayer, playing;

//Start
const start = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  name0.textContent = "player1";
  name1.textContent = "player2";

  ImgDice.classList.add("hidden");
  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
};
start();

//SwitchPlayer
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

//Button roll
btnRoll.addEventListener("click", function () {
  //random roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    ImgDice.classList.remove("hidden");
    ImgDice.src = `dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold Score
btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to total
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //end game
      playing = false;
      ImgDice.classList.add("hidden");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      document.getElementById(`name-${activePlayer}`).textContent = "🎉 winner";
    } else {
      switchPlayer();
    }
  }
});

//New game
btnNew.addEventListener("click", start);
