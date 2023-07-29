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

  // Перевірка чи є дані в локалсторедж
  if (!storageFormData) {
    return;
  }

  refs.input.value = storageFormData.email ? storageFormData.email : '';
  refs.textarea.value = storageFormData.message ? storageFormData.message : '';
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

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
