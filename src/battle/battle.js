import Phaser from 'phaser';
import BootScene from './scenes/boot';
import BattleScene from './scenes/battle';
import UIScene from './scenes/interface';

const battle = () => {
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
        gravity: { y: 0 }
      }
    },
    scene: [ BootScene, BattleScene, UIScene ]
  };


  var game = new Phaser.Game(config);

  return game;

}

export default battle;