import Phaser from 'phaser';

const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

  function Unit(scene, x, y, texture, frame, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
    this.type = type;
    this.hp = hp;
    this.maxHp = hp;
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
  },
  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit(
        'Message',
        `${this.type} attacks ${target.type} for ${this.damage} damage`,
      );
    }
  },
  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  },
  setMenuItem(item) {
    this.menuItem = item;
  },

});

export default Unit;