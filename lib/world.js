"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _phaser = _interopRequireDefault(require("phaser"));

var _battle = _interopRequireDefault(require("./battle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const world = () => {
  var BootScene = new _phaser.default.Class({
    Extends: _phaser.default.Scene,
    initialize: function BootScene() {
      _phaser.default.Scene.call(this, {
        key: 'BootScene'
      });
    },
    preload: function preload() {
      this.load.image('tiles', 'assets/map/spritesheet.png');
      this.load.tilemapTiledJSON('map', 'assets/map/map.json');
      this.load.spritesheet('player', 'assets/heroes.png', {
        frameWidth: 16,
        frameHeight: 16
      });
    },
    create: function create() {
      this.scene.start('WorldScene');
    }
  });
  var WorldScene = new _phaser.default.Class({
    Extends: _phaser.default.Scene,
    initialize: function WorldScene() {
      _phaser.default.Scene.call(this, {
        key: 'WorldScene'
      });
    },
    preload: function preload() {},
    create: function create() {
      var map = this.make.tilemap({
        key: 'map'
      });
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
        frames: this.anims.generateFrameNumbers('player', {
          frames: [1, 7, 1, 13]
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [1, 7, 1, 13]
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [2, 8, 2, 14]
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [0, 6, 0, 12]
        }),
        frameRate: 10,
        repeat: -1
      });
      this.physics.add.collider(this.player, obstacles);
      this.spawns = this.physics.add.group({
        classType: _phaser.default.GameObjects.Zone
      });

      for (var i = 0; i < 30; i++) {
        var x = _phaser.default.Math.RND.between(0, this.physics.world.bounds.width);

        var y = _phaser.default.Math.RND.between(0, this.physics.world.bounds.height);

        this.spawns.create(x, y, 20, 20);
      }

      this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    },
    update: function update(time, delta) {
      this.player.body.setVelocity(0);

      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-80);
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(80);
      }

      if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-80);
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(80);
      }

      if (this.cursors.left.isDown) {
        this.player.anims.play('left', true);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.player.anims.play('right', true);
        this.player.flipX = false;
      } else if (this.cursors.up.isDown) {
        this.player.anims.play('up', true);
      } else if (this.cursors.down.isDown) {
        this.player.anims.play('down', true);
      } else {
        this.player.anims.stop();
      }
    },
    onMeetEnemy: function onMeetEnemy(player, zone) {
      zone.x = _phaser.default.Math.RND.between(0, this.physics.world.bounds.width);
      zone.y = _phaser.default.Math.RND.between(0, this.physics.world.bounds.height);
      this.cameras.main.flash(300);
      this.scene.switch('BattleScene');
    }
  });
  var config = {
    type: _phaser.default.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0
        },
        debug: false
      }
    },
    scene: [BootScene, WorldScene, _battle.default, _battle.default]
  };
  var game = new _phaser.default.Game(config);
};

var _default = world;
exports.default = _default;