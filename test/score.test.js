import createScore from '../src/scoreboard/create_score';
import fetchGame from '../src/scoreboard/fetch_game';
import GameOver from '../src/scoreboard/gameover';

describe('Test units for post method', () => {
  describe('Create score', () => {
    it('returns true when creating a new score to the board', () => {
      expect(createScore('username', 1)).toBeTruthy();
    });
    it('return empty object for the request doesnt contain the parameters', () => {
      const post = createScore();
      expect(post.user).toBeFalsy();
    });
    it('return empty object for the request doesnt contain the parameters', () => {
      const post = createScore();
      expect(post.score).toBeFalsy();
    });
  });
});

describe('Test get method for retrieve scores', () => {
  describe('Test score board length', () => {
    it('checks if the response is truthy', () => {
      expect(fetchGame()).toBeTruthy();
    });
    it('checks if the response is a promise', () => {
      expect(fetchGame()).toBeInstanceOf(Promise);
    });
  });
});

test('if GameOver is a promise', () => {
  expect(GameOver()).toBeInstanceOf(Promise);
});
