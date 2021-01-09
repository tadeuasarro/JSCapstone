import Phaser from 'phaser';
import ActionsMenu from '../menu/actions';
import EnemiesMenu from '../menu/enemies';
import HeroesMenu from '../menu/heroes';
import Message from '../message';

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
    this.input.keyboard.on('keydown', this.onKeyInput, this);
    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);
    this.events.on('SelectEnemies', this.onSelectEnemies, this);
    this.events.on('Enemy', this.onEnemy, this);
    this.sys.events.on('wake', this.createMenu, this);
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);
    this.createMenu();
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
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
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
  createMenu() {
    this.remapHeroes();
    this.remapEnemies();
    this.battleScene.nextTurn();
  },
});


export default UIScene;