const fetchGame = async () => {
  let result = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XcndOEVAK91fzDURy1fY/scores',
  ).then((response) => response.json());

  const length = result.result.length

  for(let i = 0; i < (length - 1); i += 1){
    for(let j = i; j < (length - 1); j += 1){
      if(result.result[j].score < result.result[j + 1].score){
        let my_var = result.result[j];
        result.result[j] = result.result[j + 1];
        result.result[j + 1] = my_var;
      }
    }
  }

  return(result.result);
};

export default fetchGame;