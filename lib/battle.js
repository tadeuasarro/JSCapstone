"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIScene = exports.BattleScene = exports.default = void 0;

var _phaser = _interopRequireDefault(require("phaser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const battle = () => {
  var Unit = new _phaser.default.Class({
    Extends: _phaser.default.GameObjects.Sprite,
    initialize: function Unit(scene, x, y, texture, frame, type, hp, damage) {
      _phaser.default.GameObjects.Sprite.call(this, scene, x, y, texture, frame);

      this.type = type;
      this.maxHp = this.hp = hp;
      this.damage = damage;
    },
    attack: function attack(target) {
      target.takeDamage(this.damage);
      this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    },
    takeDamage: function takeDamage(damage) {
      this.hp -= damage;

      if (this.hp <= 0) {
        this.hp = 0;
        this.alive = false;
      }
    }
  });
  var Enemy = new _phaser.default.Class({
    Extends: Unit,
    initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
  });
  var PlayerCharacter = new _phaser.default.Class({
    Extends: Unit,
    initialize: function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      this.flipX = true;
      this.setScale(2);
    }
  });
  var BootScene = new _phaser.default.Class({
    Extends: _phaser.default.Scene,
    initialize: function BootScene() {
      _phaser.default.Scene.call(this, {
        key: 'BootScene'
      });
    },
    preload: function preload() {
      this.load.spritesheet('player', 'assets/heroes.png', {
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.image('dragonblue', 'assets/blue.png');
      this.load.image('dragonorange', 'assets/orange.png');
    },
    create: function create() {
      this.scene.start('BattleScene');
    }
  });
  var BattleScene = new _phaser.default.Class({
    Extends: _phaser.default.Scene,
    initialize: function BattleScene() {
      _phaser.default.Scene.call(this, {
        key: 'BattleScene'
      });
    },
    create: function create() {
      this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
      var warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
      this.add.existing(warrior);
      var mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
      this.add.existing(mage);
      var dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
      this.add.existing(dragonblue);
      var dragonOrange = new Enemy(this, 50, 100, 'dragonorange', null, 'Dragon2', 50, 3);
      this.add.existing(dragonOrange);
      this.heroes = [warrior, mage];
      this.enemies = [dragonblue, dragonOrange];
      this.units = this.heroes.concat(this.enemies);
      this.scene.launch('UIScene');
      this.index = -1;
    },
    nextTurn: function nextTurn() {
      this.index++;

      if (this.index >= this.units.length) {
        this.index = 0;
      }

      if (this.units[this.index]) {
        if (this.units[this.index] instanceof PlayerCharacter) {
          this.events.emit('PlayerSelect', this.index);
        } else {
          var r = Math.floor(Math.random() * this.heroes.length);
          this.units[this.index].attack(this.heroes[r]);
          this.time.addEvent({
            delay: 3000,
            callback: this.nextTurn,
            callbackScope: this
          });
        }
      }
    },
    receivePlayerSelection: function receivePlayerSelection(action, target) {
      if (action == 'attack') {
        this.units[this.index].attack(this.enemies[target]);
      }

      this.time.addEvent({
        delay: 3000,
        callback: this.nextTurn,
        callbackScope: this
      });
    }
  });
  var UIScene = new _phaser.default.Class({
    Extends: _phaser.default.Scene,
    initialize: function UIScene() {
      _phaser.default.Scene.call(this, {
        key: 'UIScene'
      });
    },
    create: function create() {
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);
      this.graphics.fillRect(2, 150, 90, 100);
      this.graphics.strokeRect(2, 150, 90, 100);
      this.graphics.fillRect(95, 150, 90, 100);
      this.graphics.strokeRect(95, 150, 90, 100);
      this.graphics.fillRect(188, 150, 130, 100);
      this.graphics.strokeRect(188, 150, 130, 100);
      this.menus = this.add.container();
      this.heroesMenu = new HeroesMenu(195, 153, this);
      this.actionsMenu = new ActionsMenu(100, 153, this);
      this.enemiesMenu = new EnemiesMenu(8, 153, this);
      this.currentMenu = this.actionsMenu;
      this.menus.add(this.heroesMenu);
      this.menus.add(this.actionsMenu);
      this.menus.add(this.enemiesMenu);
      this.battleScene = this.scene.get('BattleScene');
      this.remapHeroes();
      this.remapEnemies();
      this.input.keyboard.on('keydown', this.onKeyInput, this);
      this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
      this.events.on("SelectEnemies", this.onSelectEnemies, this);
      this.events.on("Enemy", this.onEnemy, this);
      this.battleScene.nextTurn();
      this.message = new Message(this, this.battleScene.events);
      this.add.existing(this.message);
    },
    remapHeroes: function remapHeroes() {
      var heroes = this.battleScene.heroes;
      this.heroesMenu.remap(heroes);
    },
    remapEnemies: function remapEnemies() {
      var enemies = this.battleScene.enemies;
      this.enemiesMenu.remap(enemies);
    },
    onKeyInput: function onKeyInput(event) {
      if (this.currentMenu) {
        if (event.code === "ArrowUp") {
          this.currentMenu.moveSelectionUp();
        } else if (event.code === "ArrowDown") {
          this.currentMenu.moveSelectionDown();
        } else if (event.code === "ArrowRight" || event.code === "Shift") {} else if (event.code === "Space" || event.code === "ArrowLeft") {
          this.currentMenu.confirm();
        }
      }
    },
    onPlayerSelect: function onPlayerSelect(id) {
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    },
    onSelectEnemies: function onSelectEnemies() {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    },
    onEnemy: function onEnemy(index) {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.receivePlayerSelection('attack', index);
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
        }
      }
    },
    scene: [BootScene, BattleScene, UIScene]
  };
  var MenuItem = new _phaser.default.Class({
    Extends: _phaser.default.GameObjects.Text,
    initialize: function MenuItem(x, y, text, scene) {
      _phaser.default.GameObjects.Text.call(this, scene, x, y, text, {
        color: '#ffffff',
        align: 'left',
        fontSize: 15
      });
    },
    select: function select() {
      this.setColor('#f8ff38');
    },
    deselect: function deselect() {
      this.setColor('#ffffff');
    }
  });
  var Menu = new _phaser.default.Class({
    Extends: _phaser.default.GameObjects.Container,
    initialize: function Menu(x, y, scene, heroes) {
      _phaser.default.GameObjects.Container.call(this, scene, x, y);

      this.menuItems = [];
      this.menuItemIndex = 0;
      this.heroes = heroes;
      this.x = x;
      this.y = y;
    },
    addMenuItem: function addMenuItem(unit) {
      var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
      this.menuItems.push(menuItem);
      this.add(menuItem);
    },
    moveSelectionUp: function moveSelectionUp() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex--;
      if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
      this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown: function moveSelectionDown() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
      this.menuItems[this.menuItemIndex].select();
    },
    select: function select(index) {
      if (!index) index = 0;
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = index;
      this.menuItems[this.menuItemIndex].select();
    },
    deselect: function deselect() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = 0;
    },
    confirm: function confirm() {// wen the player confirms his slection, do the action
    },
    clear: function clear() {
      for (var i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].destroy();
      }

      this.menuItems.length = 0;
      this.menuItemIndex = 0;
    },
    remap: function remap(units) {
      this.clear();

      for (var i = 0; i < units.length; i++) {
        var unit = units[i];
        this.addMenuItem(unit.type);
      }
    }
  });
  var HeroesMenu = new _phaser.default.Class({
    Extends: Menu,
    initialize: function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    }
  });
  var ActionsMenu = new _phaser.default.Class({
    Extends: Menu,
    initialize: function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
      this.addMenuItem('Attack');
    },
    confirm: function confirm() {
      this.scene.events.emit('SelectEnemies');
    }
  });
  var EnemiesMenu = new _phaser.default.Class({
    Extends: Menu,
    initialize: function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
    confirm: function confirm() {
      this.scene.events.emit("Enemy", this.menuItemIndex);
    }
  });
  var Message = new _phaser.default.Class({
    Extends: _phaser.default.GameObjects.Container,
    initialize: function Message(scene, events) {
      _phaser.default.GameObjects.Container.call(this, scene, 160, 30);

      var graphics = this.scene.add.graphics();
      this.add(graphics);
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);
      graphics.strokeRect(-90, -15, 180, 30);
      graphics.fillRect(-90, -15, 180, 30);
      this.text = new _phaser.default.GameObjects.Text(scene, 0, 0, "", {
        color: '#ffffff',
        align: 'center',
        fontSize: 13,
        wordWrap: {
          width: 160,
          useAdvancedWrap: true
        }
      });
      this.add(this.text);
      this.text.setOrigin(0.5);
      events.on("Message", this.showMessage, this);
      this.visible = false;
    },
    showMessage: function showMessage(text) {
      this.text.setText(text);
      this.visible = true;
      if (this.hideEvent) this.hideEvent.remove(false);
      this.hideEvent = this.scene.time.addEvent({
        delay: 2000,
        callback: this.hideMessage,
        callbackScope: this
      });
    },
    hideMessage: function hideMessage() {
      this.hideEvent = null;
      this.visible = false;
    }
  });
  var game = new _phaser.default.Game(config);
};

var _default = battle;
exports.default = _default;
var BattleScene;
exports.BattleScene = BattleScene;
var UIScene;
exports.UIScene = UIScene;