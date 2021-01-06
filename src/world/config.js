import Phaser from 'phaser';
import WorldScene from './worldscene';
import BootScene from './bootscene';

const gameWorld = () => {
  var config = {
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
        debug: false
      }
    },
    scene: [
      BootScene,
      WorldScene
    ]
  };

  var game = new Phaser.Game(config);

  return game;
}


export default gameWorld;