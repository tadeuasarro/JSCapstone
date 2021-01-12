import fetchGame from './fetch_game';

const scoreBoard = async () => {
  const myArr = await fetchGame();

  const scoreBoard = document.getElementById('scoreBoard');

  for (let i = 0; i < 5; i += 1) {
    if (myArr[i]) {
      const scoreItem = document.createElement('li');
      scoreItem.innerHTML = `Player: ${myArr[i].user}, score: ${myArr[i].score}`;
      scoreBoard.appendChild(scoreItem);
    }
  }
};

export default scoreBoard;