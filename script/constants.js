const elements = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
  info: document.querySelector('.weather-info'),
  title: document.querySelector('.current-location-title'),
  degree: document.querySelector('.degree-value'),
  icon: document.querySelector('.weather-icon'),
  list: document.querySelector('.favorite-locations-list'),
  error: document.querySelector('.error-message'),
  favorite: document.querySelector('.fav-button'),
  feels_like: document.querySelector('.feelslike-value'),
  sunrise: document.querySelector('.sunrise-value'),
  sunset: document.querySelector('.sunset-value'),
  clear: document.querySelector('.clear-button'),
};

const statuses = {
  parseError: 'JSON Parse Error',
  apiError: 'API Error',
  loading: 'Loading...',
  sameCity: 'Such a city is already on the list!',
};

const weatherIconMap = {
  '01d': 'sun',
  '01n': 'moon',
  '02d': 'sun',
  '02n': 'moon',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'cloud',
  '04n': 'cloud',
  '09d': 'cloud-rain',
  '09n': 'cloud-rain',
  '10d': 'cloud-rain',
  '10n': 'cloud-rain',
  '11d': 'cloud-lightning',
  '11n': 'cloud-lightning',
  '13d': 'cloud-snow',
  '13n': 'cloud-snow',
  '50d': 'water',
  '50n': 'water',
};

export { elements, statuses, weatherIconMap };
