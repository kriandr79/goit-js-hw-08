// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const ulElement = document.querySelector('.gallery');

ulElement.innerHTML = makeGalleryMarkup(galleryItems);
lightboxRun();

// Створюємо розмітку
function makeGalleryMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`
    )
    .join('');
}

// Функція запуску плагіна
function lightboxRun() {
  const lightbox = new SimpleLightbox('.gallery a', {
    /* options */
    overlay: true,
    overlayOpacity: 0.7,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

