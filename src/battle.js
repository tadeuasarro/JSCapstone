import Phaser from 'phaser'

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

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        // load resources
        this.load.spritesheet('player', 'assets/heroes.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('dragonblue', 'assets/blue.png');
        this.load.image('dragonorange', 'assets/orange.png');
    },

    create: function ()
    {
        this.scene.start('BattleScene');
    }
  });

  var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BattleScene ()
    {
        Phaser.Scene.call(this, { key: 'BattleScene' });
    },
    create: function ()
    {
      // change the background to green
      this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

      // player character - warrior
      var warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
      this.add.existing(warrior);

      // player character - mage
      var mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
      this.add.existing(mage);

      var dragonBlue = new Enemy(this, 50, 50, 'dragonblue', 17, 'Dragon', 50, 3);
      this.add.existing(dragonBlue);

      var dragonOrange = new Enemy(this, 50, 100, 'dragonorange', 18,'Dragon2', 50, 3);
      this.add.existing(dragonOrange);


      // array with heroes
      this.heroes = [ warrior, mage ];
      // array with enemies
      //this.enemies = [ dragonblue, dragonOrange ];
      // array with both parties, who will attack
      this.units = this.heroes.concat(this.enemies);

      // Run UI Scene at the same time
      this.scene.launch('UIScene');
    }
  });

  var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UIScene ()
    {
        Phaser.Scene.call(this, { key: 'UIScene' });
    },

    create: function ()
    {
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

        this.remapHeroes();
        this.remapEnemies();
    },

    remapHeroes: function ()
    {
      var heroes = this.battleScene.heroes;
      this.heroesMenu.remap(heroes);
    },

    remapEnemies: function ()
    {
      var enemies = this.battleScene.enemies;
      this.enemiesMenu.remap(enemies);
    },
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

  var MenuItem = new Phaser.Class({
    Extends: Phaser.GameObjects.Text,

    initialize:

    function MenuItem(x, y, text, scene) {
        Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15});
    },

    select: function() {
        this.setColor('#f8ff38');
    },

    deselect: function() {
        this.setColor('#ffffff');
    }
  });

  var Menu = new Phaser.Class({
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
    addMenuItem: function(unit) {
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);
    },
    moveSelectionUp: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    },
    select: function(index) {
        if(!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    },
    deselect: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    },
    confirm: function() {

    },
    clear: function() {
      for(var i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].destroy();
      }
      this.menuItems.length = 0;
      this.menuItemIndex = 0;
    },
    remap: function(units)
    {
      this.clear();
      for(var i = 0; i < units.length; i++) {
        var unit = units[i];
        this.addMenuItem(unit.type);
      }
    }
  });

  var HeroesMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function HeroesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
    }
  });

  var ActionsMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function ActionsMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
        this.addMenuItem('Attack');
    },
    confirm: function() {
        // do something when the player selects an action
    }

  });

  var EnemiesMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function EnemiesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
    },
    confirm: function() {

    }
  });

  var game = new Phaser.Game(config);

}

export default battle;