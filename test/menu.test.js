import ActionsMenu from '../src/battle/menu/actions';
import EnemiesMenu from '../src/battle/menu/enemies';
import HeroesMenu from '../src/battle/menu/heroes';
import MenuItem from '../src/battle/menu/item';
import Menu from '../src/battle/menu/menu';

test('if ActionsMenu is a subclass of Menu', () => {
  expect(ActionsMenu).toBeSubclassOf(Menu);
});

test('if Enemies is a subclass of Menu', () => {
  expect(EnemiesMenu).toBeSubclassOf(Menu);
});

test('if HeroesMenu is a subclass of Menu', () => {
  expect(HeroesMenu).toBeSubclassOf(Menu);
});

test('if MenuItem is a subclass of Phaser.GameObjects.Text', () => {
  expect(MenuItem).toBeSubclassOf(Phaser.GameObjects.Text);
});

test('if Menu is a subclass of Phaser.GameObjects.Container', () => {
  expect(Menu).toBeSubclassOf(Phaser.GameObjects.Container);
});