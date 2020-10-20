/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// ///global var///
var score, roundscore, gameplaying, activePlayer;
init();
/////////////////roll btn///////////////////////


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameplaying) {
        //  1. random number

        var dice = Math.floor(Math.random() * 6) + 1;

        //  2. display  //dice img 
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //  3. update
        if (dice != 1) {
            roundscore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundscore;

        } else {
            nextPlayer();
        }

    }
});



/////////////////hold btn///////////////////////

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameplaying) {
        //update global score
        score[activePlayer] += roundscore;
        //display
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
        //check for winner
        if (score[activePlayer] > 10) {
            //winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'winner!';
            gameplaying = false;
            document.querySelector('.dice').style.display = 'none';

        } else {
            nextPlayer();
        }

    }
});

/////////////////new game btn///////////////////////
document.querySelector('.btn-new').addEventListener('click', function () {

    init();

});


///function difinations

function nextPlayer() {
    document.querySelector('#current-' + activePlayer).textContent = '0';
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundscore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function init() {
    score = [0, 0];
    roundscore = 0;
    activePlayer = 0;
    gameplaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'player-1';
    document.querySelector('#name-1').textContent = 'player-2';
}