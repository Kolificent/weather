import { elements, statuses, weatherIconMap } from './constants.js';
import { storage } from './cookies.js';
import { fetchWeatherByLocation } from './requests.js';
import { getTimeString } from './utils.js';

export function renderOnPageLoad() {
  if (storage.getCurrentCity()) {
    renderWeather();
  }

  if (storage.getFavoriteCities().length !== 0) {
    renderFavorites();
  }
}

export async function renderWeather() {
  elements.error.textContent = statuses.loading;
  try {
    const data = await fetchWeatherByLocation(storage.getCurrentCity());
    renderDetails(data);
    renderForecast(data);
    elements.error.textContent = '';
    elements.info.classList.remove('hidden');
    elements.form.reset();
  } catch (err) {
    elements.error.textContent = err.message;
  }
}

function renderDetails(data) {
  const weather = {
    name: data.city.name,
    temp: Number(data.list[0].main.temp).toFixed(0),
    feelsLikeTemp: Number(data.list[0].main.feels_like).toFixed(0),
    icon: weatherIconMap[data.list[0].weather[0].icon],
    sunset: getTimeString(data.city.sunrise, 0),
    sunrise: getTimeString(data.city.sunset, 0),
  };

  elements.title.textContent = weather.name;
  elements.degree.textContent = weather.temp;
  elements.feels_like.textContent = weather.feelsLikeTemp;
  elements.icon.innerHTML = `<i class="bx bx-${weather.icon}"></i>`;
  elements.sunrise.textContent = weather.sunrise;
  elements.sunset.textContent = weather.sunset;
}

function renderForecast(data, forecast = 3) {
  if (forecast < 1) {
    return;
  }

  const timeElements = {
    time: document.getElementById(`${forecast}-time`),
    degree: document.getElementById(`${forecast}-temp`),
    feels: document.getElementById(`${forecast}-feels`),
    icon: document.getElementById(`${forecast}-icon`),
  };

  const weather = {
    time: getTimeString(data.list[forecast].dt, data.city.timezone),
    temp: Number(data.list[forecast].main.temp).toFixed(0),
    feelsLikeTemp: Number(data.list[forecast].main.feels_like).toFixed(0),
    icon: weatherIconMap[data.list[forecast].weather[0].icon],
  };

  timeElements.time.textContent = weather.time;
  timeElements.degree.textContent = weather.temp;
  timeElements.feels.textContent = weather.feelsLikeTemp;
  timeElements.icon.innerHTML = `<i class="bx bx-${weather.icon}"></i>`;

  renderForecast(data, --forecast);
}

export function renderFavorites() {
  elements.list.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const favorites = storage.getFavoriteCities();
  favorites.forEach((location) => {
    fragment.appendChild(renderFavoriteLocation(location));
  });
  elements.list.appendChild(fragment);
}

function renderFavoriteLocation(location) {
  const element = document.createElement('li');
  element.className = 'location-element';
  element.innerHTML = `<button class="location-value"></button>`;
  element.querySelector('.location-value').textContent = location;
  element.insertAdjacentHTML(
    'beforeend',
    `<button class="delete-button"><i class='bx bx-x'></i></button>`,
  );
  return element;
}
