'use strict';
var scores, roundScore, activePlayer, gamePlaying;

init();

//DOM : Doument Object model
// DOM mainly use to connect between object and document of webpages

//"doument" is a object tu access the DOM
//"querySelector" is a method
//"textContent" use to write text (simple text)

//document.querySelector('#current--' + activePlayer).textContent = dice;

//Another process write the document
//innerHtml use for style change the text

//document.querySelector('#current--' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//store some variable
//var x = document.querySelector('#score--0').textContent;
//console.log(x);

//How to change (dice) css property

//"getElementById" it is similar to querySelector but it is use only for ID
//getElementById fister then querySelector.

//"addEventListener" use for add event in js
//event means :- show message,pup up message etc.

//"anonymous function" it is does not any name, it is not outside the context .
//just write the function right side of addEventListener

document.querySelector('.btn--roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //3. Update the round score If the rolled number is not 1
    if (dice !== 1) {
      //Add score (roundScore = roundScore + dice)
      roundScore += dice;
      document.querySelector(
        '#current--' + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score--' + [activePlayer]).textContent =
      scores[activePlayer];

    //Check player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  //"toggle" is use for remove or add (exchange some thing)
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}
