import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
    //Параметры календаря
const options = {
  enableTime: true, // Включить выбор времени
  time_24hr: true, // Использовать 24-часовой формат
  defaultDate: new Date(), // Текущая дата по умолчанию
  minuteIncrement: 1, // Шаг изменения минут (1 минута)
  // Обработчик события закрытия календаря
  onClose(selectedDates) {
    const chosenDate = selectedDates[0]; // Выбранная дата

    // *1. Проверка выбранной даты
    if (chosenDate < new Date()) {
        // Кнопка "Start" остается заблокированной
      refs.startBtn.disabled = true;

      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false; // Разблокировать кнопку "Start"
  },
};
// Инициализация календаря
flatpickr(refs.dateTimePicker, options);
// *2. Кнопка "Start" заблокирована при загрузке
refs.startBtn.disabled = true;

// Обработчик события нажатия кнопки "Start"
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    // Заблокировать кнопку "Start"
  refs.startBtn.disabled = true;
  // Получить выбранную дату и время
  const targetDate = new Date(refs.dateTimePicker.value); 
  // Запустить таймер
  const intervalId = setInterval(updateTimer, 1000);
    // Функция обновления таймера
  function updateTimer() {
    // Получить текущее время
    const currentTime = Date.now();
    // Рассчитать разницу между выбранной датой и текущим временем
    const difference = targetDate - currentTime;
    // Преобразовать разницу в объект с днями, часами, минутами и секундами
    const timeLeft = convertMs(difference);
    // Обновить отображение таймера
    updateTimerFace(timeLeft);
    // *3. Остановка таймера по достижении нуля:
    if (difference <= 0) {
        // Очистить интервал
      clearInterval(intervalId);
      // Обновить отображение таймера на 00:00:00
      updateTimerFace({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }
}
// Функция преобразования миллисекунд в объект времени
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// Функция добавления нуля перед однозначными числами
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// Функция обновления отображения таймера
function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}