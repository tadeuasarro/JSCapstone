import Phaser from 'phaser';
import Menu from './menu';

const EnemiesMenu = () => {
  var enemies = new Phaser.Class({
    Extends: Menu,
    initialize:
    function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
    confirm: function() {
      this.scene.events.emit("Enemy", this.menuItemIndex);
    }
  });

  return enemies;

}

export default EnemiesMenu();