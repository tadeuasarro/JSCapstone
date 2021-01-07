import gameOverScreen from './go_screen';
import createScore from './create_score';

const GameOver = () => {

  const name = localStorage.getItem('player');
  const score = localStorage.getItem('score');

  createScore(name, score);

  gameOverScreen();

  //global.game.destroy(true, false);

}

export default GameOver;