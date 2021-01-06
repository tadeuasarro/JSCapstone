import Phaser from 'phaser';
import Menu from './menu';

const ActionsMenu = () => {
  var actions = new Phaser.Class({
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

  return actions;

}

export default ActionsMenu();