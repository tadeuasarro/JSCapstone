const Score = () => {

  if(window.localStorage.getItem('score')){
    const score = parseInt(localStorage.getItem('score'));
    localStorage.setItem('score', score + 1);
  }else{
    localStorage.setItem('score', 1);
  }

}

export default Score;