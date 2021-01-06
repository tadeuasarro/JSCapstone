import gameWorld from './world/config';
import './styles.css';
import image from './bg.png';

const display = document.getElementById('gameStart');
display.addEventListener('click', () => {
  document.body.innerHTML = '';
  gameWorld();
})

