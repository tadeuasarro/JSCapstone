/* eslint import/no-cycle: "off", curly: "off" */
import gameWorld from '../world/config';

const gameOverScreen = () => {
  const display = document.createElement('div');
  display.id = 'display';

  const p = document.createElement('p');
  p.innerHTML = 'Game Over!';

  display.appendChild(p);

  const score = document.createElement('span');
  score.classList.add('score');
  score.innerHTML = "Your score: " + localStorage.getItem('score');

  display.appendChild(score);

  const scoreBoard = document.createElement('ul');
  scoreBoard.id = 'scoreBoard';

  const title = document.createElement('li');
  title.innerHTML = '### Leaderboard ###';

  scoreBoard.appendChild(title);

  display.appendChild(scoreBoard);

  const button = document.createElement('div');
  button.innerHTML = 'Play again';
  button.id = 'gameStart';

  button.addEventListener('click', () => {
    gameWorld();
  });

  display.appendChild(button);

  document.body.appendChild(display);
};

export default gameOverScreen;