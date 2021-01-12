import battle from '../src/battle/battle';
import Message from '../src/battle/message';

test('if battle() is an instance of Phaser.Game', () => {
  expect(battle()).toBeInstanceOf(Phaser.Game);
});

test('if battle is a constructor', () => {
  expect(battle).toBeInstanceOf(Function);
});

test('if Message is a subclass of Phaser.GameObjects.Container', () => {
  expect(Message).toBeSubclassOf(Phaser.GameObjects.Container);
});
