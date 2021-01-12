import errorHandling from '../helper';

const createScore = (name, score) => {
  const setData = async () => {
    try {
      const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/o5EnkXrtDCElBpymtoHa/scores', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
          user: name,
          score,
        }),

      });

      return (result.json());
    } catch (error) {
      errorHandling(error);
      return (false);
    }
  };

  return (setData());
};

export default createScore;