import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENTTIME_STORAGE_KEY = 'videoplayer-current-time';

const player = new Player('vimeo-player');

// Беремо значення з localstorage
let playerCurrentTime = localStorage.getItem(CURRENTTIME_STORAGE_KEY);

// Якщо null тобто не true, то ставимо 0
// if (!playerCurrentTime) {
//   playerCurrentTime = 0;
// }

// Встановлюємо час для плеєра, звідки відворювати
player.setCurrentTime(playerCurrentTime ? playerCurrentTime : 0);

// Слідкуємо за часов програвання
player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(CURRENTTIME_STORAGE_KEY, data.seconds);
}
