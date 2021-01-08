import gameOverScreen from './go_screen';
import createScore from './create_score';
import scoreBoard from './board';

const GameOver = async () => {

  gameOverScreen();

  const name = localStorage.getItem('player');
  const score = localStorage.getItem('score');

  localStorage.setItem('score', 0);

  global.game.destroy(true, false);

  await createScore(name, score);

  scoreBoard();

}

export default GameOver;