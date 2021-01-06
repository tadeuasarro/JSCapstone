import Phaser from 'phaser';
import MenuItem from './item';

const Menu = () => {
  var menu = new Phaser.Class({
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
      // wen the player confirms his slection, do the action
    },
    clear: function() {
      for(var i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].destroy();
      }
      this.menuItems.length = 0;
      this.menuItemIndex = 0;
    },
    remap: function(units) {
      this.clear();
      for(var i = 0; i < units.length; i++) {
        var unit = units[i];
        this.addMenuItem(unit.type);
      }
    }
  });

  return menu;

}

export default Menu();