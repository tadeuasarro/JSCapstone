import Phaser from 'phaser';
import BattleScene from './scenes/battle';
import UIScene from './scenes/interface';

const battle = () => {
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
      },
    },
    scene: [BattleScene, UIScene],
  };

  const game = new Phaser.Game(config);

  return game;
};

export default battle;