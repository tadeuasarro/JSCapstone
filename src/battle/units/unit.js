import Phaser from 'phaser';
const Unit = () => {

  var char = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
      this.type = type;
      this.maxHp = this.hp = hp;
      this.damage = damage;
    },
    attack: function(target) {
      target.takeDamage(this.damage);
      this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    },
    takeDamage: function(damage) {
      this.hp -= damage;
      if(this.hp <= 0) {
        this.hp = 0;
        this.alive = false;
      }
    }
  });

  return char;
}

export default Unit();