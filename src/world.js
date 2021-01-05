import Phaser from 'phaser';

const world = () => {
  const BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene() {
      Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload() {
      this.load.image('tiles', 'assets/map/spritesheet.png');

      this.load.tilemapTiledJSON('map', 'assets/map/map.json');

      this.load.spritesheet('player', 'assets/heroes.png', { frameWidth: 16, frameHeight: 16 });
    },

    create() {
      this.scene.start('WorldScene');
    },
  });

  const WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene() {
      Phaser.Scene.call(this, { key: 'WorldScene' });
    },
    preload() {

    },
    create() {
      const map = this.make.tilemap({ key: 'map' });
      const tiles = map.addTilesetImage('spritesheet', 'tiles');

      const grass = map.createStaticLayer('Grass', tiles, 0, 0);
      const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
      obstacles.setCollisionByExclusion([-1]);

      this.player = this.physics.add.sprite(50, 100, 'player', 6);
      this.physics.world.bounds.width = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;

      this.player.setCollideWorldBounds(true);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      this.cameras.main.roundPixels = true;

      //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
        frameRate: 10,
        repeat: -1,
      });

      // animation with key 'right'
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
        frameRate: 10,
        repeat: -1,
      });

      this.physics.add.collider(this.player, obstacles);

      this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
      for (let i = 0; i < 30; i++) {
        const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        // parameters are x, y, width, height
        this.spawns.create(x, y, 20, 20);
      }
      this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    },
    update(time, delta) {
      this.player.body.setVelocity(0);

      // Horizontal movement
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-80);
        this.player.anims.play('left', true);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(80);
        this.player.anims.play('right', true);
        this.player.flipX = false;
      } else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-80);
        this.player.anims.play('up', true);
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(80);
        this.player.anims.play('down', true);
      } else {
        this.player.anims.stop();
      }
    },
    onMeetEnemy(player, zone) {
      zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.cameras.main.flash(150);
    },
  });

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
        debug: true,
      },
    },
    scene: [
      BootScene,
      WorldScene,
    ],
  };

  const game = new Phaser.Game(config);
};

export default world;