import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const FORM_STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

fillForm();

function fillForm() {
  let storageFormData = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));

  // Перевірка чи є дані в локалсторедж по всіх полях
  if (!storageFormData) {
    return;
  }

  // спочатку зберігаємо дані зі стореджа в об'єкт
  formData.email = storageFormData.email ? storageFormData.email : '';
  formData.message = storageFormData.message ? storageFormData.message : '';

  // Потім заповнюємо форму даними з об'єкту
  refs.input.value = formData.email;
  refs.textarea.value = formData.message;


}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (refs.input.value === '' || refs.textarea.value === '') {
    alert('Hey! All fields must be filled! ;-)');
  } else {
    // Очищуємо сторедж
    localStorage.removeItem(FORM_STORAGE_KEY);

    // Записуем поточні значення форми
    formData.email = refs.input.value;
    formData.message = refs.textarea.value;

    // Очищаємо форму
    refs.input.value = '';
    refs.textarea.value = '';

    // Виводимо в консоль объект з поточними даними
    console.log('Submit', formData);
  }
}
