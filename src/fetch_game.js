const fetchGame = async () => {

  const result = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XcndOEVAK91fzDURy1fY/scores'
  ).then((response) => response.json());

  return(result.result);

}

export default fetchGame;