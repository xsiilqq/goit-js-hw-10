import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  if (isNaN(delay) || delay < 0) {
    iziToast.error({
      title: 'Error',
      message: 'Delay must be a non-negative number',
      position: 'topRight',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(ms => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${ms}ms`,
        position: 'topRight',
      });
    })
    .catch(ms => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${ms}ms`,
        position: 'topRight',
      });
    });

  form.reset();
}
