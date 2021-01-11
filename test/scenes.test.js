import BattleScene from '../src/battle/scenes/battle';
import UIScene from '../src/battle/scenes/interface';

test('if ActionsMenu is a subclass of Phaser.Scene', () => {
  expect(BattleScene).toBeSubclassOf(Phaser.Scene);
});

test('if Enemies is a subclass of Phaser.Scene', () => {
  expect(UIScene).toBeSubclassOf(Phaser.Scene);
});
