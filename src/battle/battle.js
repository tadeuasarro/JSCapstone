import Phaser from 'phaser';
import BootScene from './scenes/boot';
import BattleScene from './scenes/battle';
import Menu from './menu/menu';

const battle = () => {

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
    remapHeroes: function() {
      var heroes = this.battleScene.heroes;
      this.heroesMenu.remap(heroes);
    },
    remapEnemies: function() {
      var enemies = this.battleScene.enemies;
      this.enemiesMenu.remap(enemies);
    },
    onKeyInput: function(event) {
      if(this.currentMenu) {
        if(event.code === "ArrowUp") {
          this.currentMenu.moveSelectionUp();
        } else if(event.code === "ArrowDown") {
          this.currentMenu.moveSelectionDown();
        } else if(event.code === "ArrowRight" || event.code === "Shift") {

        } else if(event.code === "Space" || event.code === "ArrowLeft") {
          this.currentMenu.confirm();
        }
      }
    },
    onPlayerSelect: function(id) {
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    },
    onSelectEnemies: function() {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    },
    onEnemy: function(index) {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.receivePlayerSelection('attack', index);
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
      this.scene.events.emit('SelectEnemies');
    }
  });

  var EnemiesMenu = new Phaser.Class({
    Extends: Menu,
    initialize:
    function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
    confirm: function() {
      this.scene.events.emit("Enemy", this.menuItemIndex);
    }
  });

  var Message = new Phaser.Class({

    Extends: Phaser.GameObjects.Container,

    initialize:
    function Message(scene, events) {
      Phaser.GameObjects.Container.call(this, scene, 160, 30);
      var graphics = this.scene.add.graphics();
      this.add(graphics);
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);
      graphics.strokeRect(-90, -15, 180, 30);
      graphics.fillRect(-90, -15, 180, 30);
      this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 160, useAdvancedWrap: true }});
      this.add(this.text);
      this.text.setOrigin(0.5);
      events.on("Message", this.showMessage, this);
      this.visible = false;
    },
    showMessage: function(text) {
      this.text.setText(text);
      this.visible = true;
      if(this.hideEvent)
        this.hideEvent.remove(false);
      this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
    },
    hideMessage: function() {
      this.hideEvent = null;
      this.visible = false;
    }
  });

  var game = new Phaser.Game(config);

  return game;

}

export default battle;