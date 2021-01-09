import createScore from '../src/scoreboard/create_score';

describe('Testing get and post', () => {
  describe('testing methods', () => {
    it('returns true when creating a new score to the board', () => {
      const post = createScore('username', 1);
      expect(post).toBeTruthy();
    });
  });
});