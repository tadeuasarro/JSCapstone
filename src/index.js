import gameWorld from './world/config';
import './styles.css';
import image from './bg.png';

const display = document.getElementById('gameStart');
display.addEventListener('click', () => {

  const playerName = document.getElementById('playerName').value

  if(playerName.length >= 3){
    localStorage.setItem('player', playerName);
    document.body.innerHTML = '';
    gameWorld();
  }else{
    const warning = document.createElement('small');
    warning.innerHTML = 'The name must me at least 3 characters long!!!';
    document.getElementById('playerNameContainer').appendChild(warning);
  }

})

