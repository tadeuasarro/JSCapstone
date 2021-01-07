const createScore = (name, score) => {
  const setData = async () => {
    const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XcndOEVAK91fzDURy1fY/scores', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        user: name,
        score: score,
      }),

    });

    return (result.json());
  };

  return (setData());
};

export default createScore;