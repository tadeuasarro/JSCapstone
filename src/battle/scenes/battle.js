import Phaser from 'phaser';
import Enemy from '../units/enemy';
import PlayerCharacter from '../units/player';
import GameOver from '../../scoreboard/gameover';

const BattleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
  function BattleScene() {
    Phaser.Scene.call(this, { key: 'BattleScene' });
  },
  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
  },
  nextTurn() {
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }

    do {
      this.index++;
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);

    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else {
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      this.units[this.index].attack(this.heroes[r]);
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  },
  receivePlayerSelection(action, target) {
    if (action == 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  },
  exitBattle() {
    this.scene.sleep('UIScene');
    this.scene.switch('WorldScene');
  },
  wake() {
    this.scene.run('UIScene');
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  },
  checkEndBattle() {
    let victory = true;
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) {
        victory = false;
      }
    }

    if(victory){
      const score = parseInt(localStorage.getItem('score'));
      localStorage.setItem('score', score + 1);
    }

    let gameOver = true;
    for (var i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living) {
        gameOver = false;
      }
    }

    if(gameOver){
      //console.log(game);
      GameOver();
    }

    return victory || gameOver;
  },
  endBattle() {
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].destroy();
    }
    this.units.length = 0;
    this.scene.sleep('UIScene');
    this.scene.switch('WorldScene');
  },
  startBattle() {
    const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 40);
    this.add.existing(warrior);
    const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 40);
    this.add.existing(mage);
    const dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 100);
    this.add.existing(dragonblue);
    const dragonOrange = new Enemy(this, 50, 100, 'dragonorange', null, 'Dragon2', 50, 100);
    this.add.existing(dragonOrange);
    this.heroes = [warrior, mage];
    this.enemies = [dragonblue, dragonOrange];
    this.units = this.heroes.concat(this.enemies);
    this.index = -1;
    this.scene.run('UIScene');
  },
});

export default BattleScene;