import Phaser from 'phaser';

const battle = () => {

  var Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
      this.type = type;
      this.maxHp = this.hp = hp;
      this.damage = damage;
    },
    attack: function(target) {
      target.takeDamage(this.damage);
    },
    takeDamage: function(damage) {
      this.hp -= damage;
    }
  });

  var Enemy = new Phaser.Class({
    Extends: Unit,

    initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
  });

  var PlayerCharacter = new Phaser.Class({
    Extends: Unit,

    initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      this.flipX = true;
      this.setScale(2);
    }
  });

  var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BootScene (){
      Phaser.Scene.call(this, { key: 'BootScene' });
    },
    preload: function (){
      this.load.spritesheet('player', 'assets/heroes.png', { frameWidth: 16, frameHeight: 16 });
      this.load.image('dragonblue', 'assets/blue.png');
      this.load.image('dragonorange', 'assets/orange.png');
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
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        var warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
        this.add.existing(warrior);
        var mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
        this.add.existing(mage);
        var dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
        this.add.existing(dragonblue);
        var dragonOrange = new Enemy(this, 50, 100, 'dragonorange', null,'Dragon2', 50, 3);
        this.add.existing(dragonOrange);
        this.heroes = [ warrior, mage ];
        this.enemies = [ dragonblue, dragonOrange ];
        this.units = this.heroes.concat(this.enemies);
        this.scene.launch('UIScene');
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