import Phaser from 'phaser';
import Enemy from '../units/enemy';
import PlayerCharacter from '../units/player';

const BattleScene = () => {
  var battle = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BattleScene (){
      Phaser.Scene.call(this, { key: 'BattleScene' });
    },
    create: function (){
      this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
      var warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
      this.add.existing(warrior);
      var mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
      this.add.existing(mage);
      var dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
      this.add.existing(dragonblue);
      var dragonOrange = new Enemy(this, 50, 100, 'dragonorange', null,'Dragon2', 50, 3);
      this.add.existing(dragonOrange);
      this.heroes = [ warrior, mage ];
      this.enemies = [ dragonblue, dragonOrange ];
      this.units = this.heroes.concat(this.enemies);
      this.scene.launch('UIScene');
      this.index = -1;
    },
    nextTurn: function() {
      this.index++;
      if(this.index >= this.units.length) {
        this.index = 0;
      }
      if(this.units[this.index]) {
        if(this.units[this.index] instanceof PlayerCharacter) {
          this.events.emit('PlayerSelect', this.index);
        } else {
          var r = Math.floor(Math.random() * this.heroes.length);
          this.units[this.index].attack(this.heroes[r]);
          this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
      }
    },
    receivePlayerSelection: function(action, target) {
      if(action == 'attack') {
        this.units[this.index].attack(this.enemies[target]);
      }
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    },
  });

  return battle;

}

export default BattleScene();