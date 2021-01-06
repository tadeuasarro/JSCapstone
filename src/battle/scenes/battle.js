import Phaser from 'phaser';
import Enemy from '../units/enemy';
import PlayerCharacter from '../units/player';

var BattleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
  function BattleScene (){
    Phaser.Scene.call(this, { key: 'BattleScene' });
  },
  create: function (){
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.scene.run('UIScene');

    var timeEvent = this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});
    this.sys.events.on('wake', this.wake, this);

  },
  nextTurn: function() {    
    do {
      this.index++;
      if(this.index >= this.units.length) {
        this.index = 0;
      }
    } while(this.units[this.index].living);
    if(this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit("PlayerSelect", this.index);
    } else {
      var r = Math.floor(Math.random() * this.heroes.length);
      this.units[this.index].attack(this.heroes[r]);
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  },
  receivePlayerSelection: function(action, target) {
    if(action == 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  },
  exitBattle: function() {
    this.scene.sleep('UIScene');
    this.scene.switch('WorldScene');
  },
  wake: function() {
    this.scene.run('UIScene');
    this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});
  },
});


export default BattleScene;