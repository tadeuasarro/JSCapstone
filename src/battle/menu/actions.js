import Phaser from 'phaser';
import Menu from './menu';

const ActionsMenu = new Phaser.Class({
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

export default ActionsMenu;