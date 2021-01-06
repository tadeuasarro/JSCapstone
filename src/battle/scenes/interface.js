import Phaser from 'phaser';
import ActionsMenu from '../menu/actions';
import EnemiesMenu from '../menu/enemies';
import HeroesMenu from '../menu/heroes';
import Message from '../message';

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


export default UIScene;