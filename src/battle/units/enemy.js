import Phaser from 'phaser';
import Unit from './unit';

const Enemy = () => {
  var char = new Phaser.Class({
    Extends: Unit,

    initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
  });

  console.log(char);

  return char;

}

export default Enemy();