import fetchGame from '../src/scoreboard/fetch_game';

describe('Test get method for retrieve scores', () => {
  describe('Test score board length', () => {
    it('checks if the response is truthy', () => {
      const board = fetchGame();
      expect(board).toBeTruthy();
    });
    it('checks if the response is a promise', () => {
      const board = fetchGame();
      expect(board).toBeInstanceOf(Promise);
    });
  });
});