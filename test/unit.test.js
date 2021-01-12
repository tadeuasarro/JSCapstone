/* eslint-disable no-undef */
import Enemy from '../src/battle/units/enemy';
import PlayerCharacter from '../src/battle/units/player';
import Unit from '../src/battle/units/unit';

test('if ActionsMenu is a subclass of Unit', () => {
  expect(Enemy).toBeSubclassOf(Unit);
});

test('if ActionsMenu is a subclass of Unit', () => {
  expect(PlayerCharacter).toBeSubclassOf(Unit);
});

test('if ActionsMenu is a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Unit).toBeSubclassOf(Phaser.GameObjects.Sprite);
});