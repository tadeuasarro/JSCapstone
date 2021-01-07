import Phaser from 'phaser';
import WorldScene from './worldscene';
import BootScene from './bootscene';
import UIScene from '../battle/scenes/interface';
import BattleScene from '../battle/scenes/battle';

const gameWorld = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [
      BootScene,
      WorldScene,
      BattleScene,
      UIScene,
    ],
  };

  const game = new Phaser.Game(config);

  return game;
};


export default gameWorld;