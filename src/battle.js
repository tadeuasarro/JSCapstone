import Phaser from 'phaser';

const battle = () => {

  var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BootScene (){
      Phaser.Scene.call(this, { key: 'BootScene' });
    },
    preload: function (){
      this.load.spritesheet('player', 'assets/heroes.png', { frameWidth: 16, frameHeight: 16 });
      this.load.image('dragonblue', 'assets/blue.png');
      this.load.image('dragonorrange', 'assets/orange.png');
    },
    create: function (){
      this.scene.start('BattleScene');
    }
  });

  var BattleScene = new Phaser.Class({
      Extends: Phaser.Scene,
      initialize:
      function BattleScene (){
        Phaser.Scene.call(this, { key: 'BattleScene' });
      },
      create: function (){
        this.scene.launch('UIScene');
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
      }
  });

  var UIScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function UIScene (){
      Phaser.Scene.call(this, { key: 'UIScene' });
    },
    create: function (){
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);
      this.graphics.fillRect(2, 150, 90, 100);
      this.graphics.strokeRect(2, 150, 90, 100);
      this.graphics.fillRect(95, 150, 90, 100);
      this.graphics.strokeRect(95, 150, 90, 100);
      this.graphics.fillRect(188, 150, 130, 100);
      this.graphics.strokeRect(188, 150, 130, 100);
    }
  });

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

}

export default battle;