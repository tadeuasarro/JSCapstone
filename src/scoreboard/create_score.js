const createScore = (name, score) => {
  const setData = async () => {
    try{
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
    }catch(error){
      console.log(error);
      console.log('Please reach out to the responsible for this application!');
    }

  }

  return (setData());
};

export default createScore;