/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//////////////Global variables///////////////////

var scores, roundScores, activePlayer, gameplaying;
init();

///////////////////roll btn//////////////////////

document.querySelector('.btn-roll').addEventListener('click', function () {
   if (gameplaying) {
      //1. random number
      var dice = Math.floor(Math.random() * 6) + 1;

      //2. display
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';

      //3.update
      if (dice != 1) {  
         //add score
         roundScores += dice;
         document.querySelector('#current-' + activePlayer).textContent = roundScores;
      } else {
         //next player
         next_player();
      }
   }
}
);

///////////////hold btn/////////////////////////

document.querySelector('.btn-hold').addEventListener('click', function () {
   if (gameplaying) {
      //add current score to global score
      scores[activePlayer] += roundScores;

      //update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      //check if plater won the game
      if (scores[activePlayer] > 20) {
         //active player wins the game
         document.querySelector('#name-' + activePlayer).textContent = 'winner!!!';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         document.querySelector('.dice').style.display = 'none';
         gameplaying = false;
      }
      else {
         next_player();
      }
   }
});

///////////////new game btn////////////////////

document.querySelector('.btn-new').addEventListener('click', init);


/////////function definations////////////////////

function next_player() {
   activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
   roundScores = 0;
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   document.querySelector('.dice').style.display = 'none';
}

function init() {
   gameplaying = true;
   scores = [0, 0];
   roundScores = 0;
   activePlayer = 0;
   document.querySelector('.dice').style.display = 'none';
   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
   document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
   document.querySelector('.player-' + 1 + '-panel').classList.remove('active');
   document.querySelector('.player-' + 0 + '-panel').classList.remove('active');
   document.querySelector('.player-' + 0 + '-panel').classList.add('active');
   document.querySelector('#name-' + 0).textContent = 'player 1';
   document.querySelector('#name-' + 1).textContent = 'player 2';
}
