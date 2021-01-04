const fetchGame = () => {

  const data = async () => {

    const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XcndOEVAK91fzDURy1fY/scores');

    return(result.json());

  };

  return(data());

}

export default fetchGame;