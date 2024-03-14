// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3; // Случайное решение о выполнении или отклонении промиса

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Выполнение промиса с объектом данных

      } else {
        reject({ position, delay }); // Отклонение промиса с объектом данных

      }
    }, delay);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Предотвращение стандартного поведения формы

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  const promises = []; // Массив для хранения созданных промисов
  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + i * step; // Расчет текущей задержки с учетом шага

    promises.push(createPromise(i + 1, currentDelay)); // Добавление промиса в массив
  }

  promises.forEach((promise) => {
    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  });
});