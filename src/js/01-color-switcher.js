const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
//переменная для хранения идентификатора интервала.
let intervalId = null; 

//Генерируем случайный цвет.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
// Функция меняет цвет фон `body` на случайный.
function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}
// Обработчик события "click" для кнопки "Start".
startBtn.addEventListener('click', () => {
  // Проверка, запущен ли интервал.
  if (intervalId) {
    return;
  }
  // Запускает интервал с интервалом 1 секунда.
  intervalId = setInterval(changeColor, 1000);
  // Робить кнопку "Start" неактивною.
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
