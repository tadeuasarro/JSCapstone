import gameWorld from '../world/config';
import fetchGame from './fetch_game';

const GameOver = async () => {

  let myArr = await fetchGame();

  //global.game.destroy(true, false);

  const display = document.createElement('div');
  display.id = 'display';

  const p = document.createElement('p');
  p.classList.add
  p.innerHTML = 'Game Over!';

  display.appendChild(p);

  const scoreBoard = document.createElement('ul');

  for(let i = 0; i < 5; i += 1){
    const scoreItem = document.createElement('li');
    scoreItem.innerHTML = 'Player: ' + myArr[i].user + ', score: ' + myArr[i].score;
    scoreBoard.appendChild(scoreItem);
  }

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

export default GameOver;