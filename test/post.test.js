import createScore from '../src/scoreboard/create_score';

describe('Test units for post method', () => {
  describe('Create score', () => {
    it('returns true when creating a new score to the board', () => {
      const post = createScore('username', 1);
      expect(post).toBeTruthy();
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