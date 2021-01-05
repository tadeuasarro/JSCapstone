import Phaser from 'phaser';

const battle = () => {
  const Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
      this.type = type;
      this.maxHp = this.hp = hp;
      this.damage = damage;
    },
    attack(target) {
      target.takeDamage(this.damage);
    },
    takeDamage(damage) {
      this.hp -= damage;
    },
  });

  const Enemy = new Phaser.Class({
    Extends: Unit,

    initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    },
  });

  const PlayerCharacter = new Phaser.Class({
    Extends: Unit,

    initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      this.flipX = true;
      this.setScale(2);
    },
  });

  const BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene() {
      Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload() {
      // load resources
      this.load.spritesheet('player', 'assets/heroes.png', { frameWidth: 16, frameHeight: 16 });
      this.load.image('dragonblue', 'assets/blue.png');
      this.load.image('dragonorange', 'assets/orange.png');
    },

    create() {
      this.scene.start('BattleScene');
    },
  });

  const BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BattleScene() {
      Phaser.Scene.call(this, { key: 'BattleScene' });
    },
    create() {
      // change the background to green
      this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

      // player character - warrior
      const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
      this.add.existing(warrior);

      // player character - mage
      const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
      this.add.existing(mage);

      const dragonBlue = new Enemy(this, 50, 50, 'dragonblue', 17, 'Dragon', 50, 3);
      this.add.existing(dragonBlue);

      const dragonOrange = new Enemy(this, 50, 100, 'dragonorange', 18, 'Dragon2', 50, 3);
      this.add.existing(dragonOrange);

      this.heroes = [warrior, mage];
      this.enemies = [dragonBlue, dragonOrange];
      this.units = this.heroes.concat(this.enemies);

      this.scene.launch('UIScene');

      this.index = -1;
    },
    nextTurn() {
      this.index++;
      if (this.index >= this.units.length) {
        this.index = 0;
      }
      if (this.units[this.index]) {
        if (this.units[this.index] instanceof PlayerCharacter) {
          this.events.emit('PlayerSelect', this.index);
        } else {
          const r = Math.floor(Math.random() * this.heroes.length);
          this.units[this.index].attack(this.heroes[r]);
          this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
      }
    },
    receivePlayerSelection(action, target) {
      if (action == 'attack') {
        this.units[this.index].attack(this.enemies[target]);
      }
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    },
  });

  const UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UIScene() {
      Phaser.Scene.call(this, { key: 'UIScene' });
    },
    create() {
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);
      this.graphics.strokeRect(2, 150, 90, 100);
      this.graphics.fillRect(2, 150, 90, 100);
      this.graphics.strokeRect(95, 150, 90, 100);
      this.graphics.fillRect(95, 150, 90, 100);
      this.graphics.strokeRect(188, 150, 130, 100);
      this.graphics.fillRect(188, 150, 130, 100);

      this.menus = this.add.container();
      this.heroesMenu = new HeroesMenu(195, 153, this);
      this.actionsMenu = new ActionsMenu(100, 153, this);
      this.enemiesMenu = new EnemiesMenu(8, 153, this);

      this.currentMenu = this.actionsMenu;
      this.menus.add(this.heroesMenu);
      this.menus.add(this.actionsMenu);
      this.menus.add(this.enemiesMenu);

      this.battleScene = this.scene.get('BattleScene');

      this.input.keyboard.on('keydown', this.onKeyInput, this);

      this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

      this.events.on('SelectEnemies', this.onSelectEnemies, this);

      this.events.on('Enemy', this.onEnemy, this);

      this.message = new Message(this, this.battleScene.events);
      this.add.existing(this.message);

      this.createMenu();
    },

    createMenu() {
      this.remapHeroes();
      this.remapEnemies();
      this.battleScene.nextTurn();
    },

    remapHeroes() {
      const { heroes } = this.battleScene;
      this.heroesMenu.remap(heroes);
    },
    remapEnemies() {
      const { enemies } = this.battleScene;
      this.enemiesMenu.remap(enemies);
    },
    onKeyInput(event) {
      if (this.currentMenu) {
        if (event.code === 'ArrowUp') {
          this.currentMenu.moveSelectionUp();
        } else if (event.code === 'ArrowDown') {
          this.currentMenu.moveSelectionDown();
        } else if (event.code === 'ArrowRight' || event.code === 'Shift') {

        } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
          this.currentMenu.confirm();
        }
      }
    },
    onPlayerSelect(id) {
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    },
    onSelectEnemies() {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    },
    onEnemy(index) {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.receivePlayerSelection('attack', index);
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
      },
    },
    scene: [BootScene, BattleScene, UIScene],
  };

  const MenuItem = new Phaser.Class({
    Extends: Phaser.GameObjects.Text,

    initialize:

    function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });
    },

    select() {
      this.setColor('#f8ff38');
    },

    deselect() {
      this.setColor('#ffffff');
    },
  });

  const Menu = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,

    initialize:

    function Menu(x, y, scene, heroes) {
      Phaser.GameObjects.Container.call(this, scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.heroes = heroes;
      this.x = x;
      this.y = y;
    },
    addMenuItem(unit) {
      const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
      this.menuItems.push(menuItem);
      this.add(menuItem);
    },
    moveSelectionUp() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex--;
      if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
      this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
      this.menuItems[this.menuItemIndex].select();
    },
    select(index) {
      if (!index) index = 0;
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = index;
      this.menuItems[this.menuItemIndex].select();
    },
    deselect() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = 0;
    },
    confirm() {

    },
    clear() {
      for (let i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].destroy();
      }
      this.menuItems.length = 0;
      this.menuItemIndex = 0;
    },
    remap(units) {
      this.clear();
      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        this.addMenuItem(unit.type);
      }
    },
  });

  var HeroesMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
  });

  var ActionsMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
      this.addMenuItem('Attack');
    },
    confirm() {
      this.scene.events.emit('SelectEnemies');
    },

  });

  var EnemiesMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
    confirm() {
      this.scene.events.emit('Enemy', this.menuItemIndex);
    },
  });

  var Message = new Phaser.Class({

    Extends: Phaser.GameObjects.Container,

    initialize:
    function Message(scene, events) {
      Phaser.GameObjects.Container.call(this, scene, 160, 30);
      const graphics = this.scene.add.graphics();
      this.add(graphics);
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);
      graphics.strokeRect(-90, -15, 180, 30);
      graphics.fillRect(-90, -15, 180, 30);
      this.text = new Phaser.GameObjects.Text(scene, 0, 0, '', {
        color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 160, useAdvancedWrap: true },
      });
      this.add(this.text);
      this.text.setOrigin(0.5);
      events.on('Message', this.showMessage, this);
      this.visible = false;
    },
    showMessage(text) {
      this.text.setText(text);
      this.visible = true;
      if (this.hideEvent) this.hideEvent.remove(false);
      this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
    },

    hideMessage() {
      this.hideEvent = null;
      this.visible = false;
    },

  });

  const game = new Phaser.Game(config);
};

export default battle;