import GameOver from './scoreboard/gameover';
import './styles.css';

const display = document.getElementById('gameStart');
display.addEventListener('click', () => {

  const playerName = document.getElementById('playerName').value

  if(playerName.length >= 3){
    localStorage.setItem('player', playerName);
    localStorage.setItem('score', 0);
    document.body.innerHTML = '';
    let game = GameOver(true);
  }else{
    const warning = document.createElement('small');
    warning.innerHTML = 'The name must me at least 3 characters long!!!';
    document.getElementById('playerNameContainer').appendChild(warning);
  }

})

