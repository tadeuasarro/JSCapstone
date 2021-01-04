import createGame from './create_game';
import fetchGame from './fetch_game';
import createScore from './create_score';

const index = () => {

  async function callback() {
    const result = await fetchGame();
    return result;
  }

  const trying = callback();

  console.log(trying)

};

index();