import Phaser from 'phaser';
import Menu from './menu';

const HeroesMenu = () => {
  var heroes = new Phaser.Class({
    Extends: Menu,
    initialize:
    function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    }
  });

  return heroes;

}

export default HeroesMenu();