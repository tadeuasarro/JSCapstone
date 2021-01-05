import Phaser from 'phaser';

const world = () => {

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
    },

    create: function (){
        this.scene.start('WorldScene');
    }
  });

  var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function WorldScene (){
      Phaser.Scene.call(this, { key: 'WorldScene' });
    },
    preload: function (){

    },
    create: function (){
      var map = this.make.tilemap({ key: 'map' });
      var tiles = map.addTilesetImage('spritesheet', 'tiles');
      var grass = map.createStaticLayer('Grass', tiles, 0, 0);
      var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
      obstacles.setCollisionByExclusion([-1]);
      this.player = this.physics.add.sprite(50, 100, 'player', 0);
      this.physics.world.bounds.width = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);
      this.cursors = this.input.keyboard.createCursorKeys();
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      this.cameras.main.roundPixels = true;

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
        frameRate: 10,
        repeat: -1
      });
    },
    update: function(time, delta){
      this.player.body.setVelocity(0);
      if (this.cursors.left.isDown){
        this.player.body.setVelocityX(-80);
      }else if (this.cursors.right.isDown){
        this.player.body.setVelocityX(80);
      }

      if (this.cursors.up.isDown){
        this.player.body.setVelocityY(-80);
      }else if (this.cursors.down.isDown){
        this.player.body.setVelocityY(80);
      }

      if (this.cursors.left.isDown){
        this.player.anims.play('left', true);
        this.player.flipX = true;
      }else if (this.cursors.right.isDown){
        this.player.anims.play('right', true);
        this.player.flipX = false;
      }else if (this.cursors.up.isDown){
        this.player.anims.play('up', true);
      }else if (this.cursors.down.isDown){
        this.player.anims.play('down', true);
      }else{
        this.player.anims.stop();
      }
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
    scene: [
      BootScene,
      WorldScene
    ]
  };

  var game = new Phaser.Game(config);

};

export default world;