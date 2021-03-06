import errorHandling from '../helper';

const fetchGame = async () => {
  try {
    const result = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/o5EnkXrtDCElBpymtoHa/scores',
    ).then((response) => response.json());

    const length = (result.result.length - 1);

    for (let i = 0; i < length; i += 1) {
      for (let j = 0; j < (length - i); j += 1) {
        if (result.result[j].score < result.result[j + 1].score) {
          const myVar = result.result[j];
          result.result[j] = result.result[j + 1];
          result.result[j + 1] = myVar;
        }
      }
    }

    return (result.result);
  } catch (error) {
    errorHandling(error);
    return (false);
  }
};

export default fetchGame;