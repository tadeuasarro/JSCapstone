import gameOver from '../src/scoreboard/gameover';

describe('Test game over feature', () => {
  describe('Test game over feature', () => {
    it('returns true when creating a new score to the board', () => {
      const game = gameOver();
      expect(localStorage.getItem('score')).toBeFalsy();
    });
  });
});