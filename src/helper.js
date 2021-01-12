/* eslint-disable no-restricted-globals */
const errorHandling = (error) => {
  document.body.innerHTML = '';

  const display = document.createElement('div');
  display.id = 'display';

  const p = document.createElement('p');
  p.style.width = '75%';
  p.style.textAlign = 'center';
  p.innerHTML = error;

  display.appendChild(p);

  const button = document.createElement('div');
  button.innerHTML = 'Refresh page';
  button.id = 'gameStart';

  button.addEventListener('click', () => {
    location.reload();
  });

  display.appendChild(button);

  document.body.appendChild(display);
};

export default errorHandling;