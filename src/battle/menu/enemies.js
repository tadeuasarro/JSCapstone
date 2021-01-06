import Phaser from 'phaser';
import Menu from './menu';

const EnemiesMenu = () => {
  const enemies = new Phaser.Class({
    Extends: Menu,
    initialize:
    function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
    confirm() {
      this.scene.events.emit('Enemy', this.menuItemIndex);
    },
  });

  return enemies;
};

export default EnemiesMenu();