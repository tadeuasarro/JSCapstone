import gameWorld from './world/config';

const gameStart = () => {
  const display = document.getElementById('gameStart');
  display.addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value;

    if (playerName.length >= 3) {
      localStorage.setItem('player', playerName);
      localStorage.setItem('score', 0);
      document.body.innerHTML = '';
      gameWorld();
    } else {
      document.getElementById('nameWarning').style.display  = 'inline'
    }
  });
};

export default gameStart;
