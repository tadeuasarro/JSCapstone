import gameWorld from '../world/config';

const GameOver = () => {

  global.game.destroy(true, false);

  gameWorld();

}

export default GameOver;