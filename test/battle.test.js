import battle from '../src/battle/battle';
import Message from '../src/battle/message';

test('if battle is a subclass of Phaser.Game', () => {
  expect(battle()).toBeInstanceOf(Phaser.Game);
});

test('if Message is a subclass of Phaser.GameObjects.Container', () => {
  expect(Message).toBeSubclassOf(Phaser.GameObjects.Container);
});