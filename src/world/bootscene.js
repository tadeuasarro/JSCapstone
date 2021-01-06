import Phaser from 'phaser';

var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
  function BootScene (){
      Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function (){
    this.load.image('tiles', 'assets/map/spritesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    this.load.spritesheet('player', 'assets/heroes.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('dragonblue', 'assets/blue.png');
    this.load.image('dragonorange', 'assets/orange.png');
  },

  create: function (){
      this.scene.start('WorldScene');
  }
});

export default BootScene;