/* eslint-disable no-undef */
import BootScene from '../src/world/bootscene';
import gameWorld from '../src/world/config';
import WorldScene from '../src/world/worldscene';

test('if BootScene is a subclass of Phaser.Scene', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});

test('if gameWorld is an instance of Phaser.Game', () => {
  expect(gameWorld()).toBeInstanceOf(Phaser.Game);
});

test('if gameWorld is a constructor', () => {
  expect(gameWorld).toBeInstanceOf(Function);
});

test('if WorldScene is a subclass of Phaser.Scene', () => {
  expect(WorldScene).toBeSubclassOf(Phaser.Scene);
});