import { renderOnPageLoad, renderWeather, renderFavorites } from './view.js';
import { elements } from './constants.js';
import { storage } from './cookies.js';

function handleInputLocation(event) {
  event.preventDefault();
  storage.setCurrentCity(elements.input.value.trim());
  renderWeather();
}

function handleLocationClick(event) {
  const target = event.target;
  if (target.classList.contains('location-value')) {
    handleCityTitle(target.textContent);
  } else if (target.classList.contains('bx-x')) {
    const locationElement = target.closest('.location-element');
    handleDeleteFavorite(
      locationElement.querySelector('.location-value').textContent,
    );
  }
}

function handleCityTitle(location) {
  storage.setCurrentCity(location);
  renderWeather();
}

function handleDeleteFavorite(location) {
  storage.deleteFavoriteCity(location);
  renderFavorites();
}

function handleAddFavorite() {
  const name = elements.title.textContent;
  try {
    storage.addFavoriteCity(name);
  } catch (err) {
    elements.error.textContent = err.message;
    return;
  }
  renderFavorites();
}

elements.list.addEventListener('click', handleLocationClick);
elements.form.addEventListener('submit', handleInputLocation);
elements.favorite.addEventListener('click', handleAddFavorite);

renderOnPageLoad();
