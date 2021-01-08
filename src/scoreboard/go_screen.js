import gameWorld from '../world/config';

const gameOverScreen = () => {

  const display = document.createElement('div');
  display.id = 'display';

  const p = document.createElement('p');
  p.classList.add
  p.innerHTML = 'Game Over!';

  display.appendChild(p);

  const scoreBoard = document.createElement('ul');
  scoreBoard.id = 'scoreBoard';

  display.appendChild(scoreBoard);

  const button = document.createElement('div');
  button.innerHTML = 'Play again';
  button.id = 'gameStart';

  button.addEventListener('click', () => {
    gameWorld();
  });

  display.appendChild(button);

  document.body.appendChild(display);

}

export default gameOverScreen;