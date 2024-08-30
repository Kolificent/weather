import { statuses } from './constants.js';

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = process.env.API_KEY;

export async function fetchWeatherByLocation(location) {
  const url = `${SERVER_URL}?q=${location}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(statuses.apiError);
  }
  return await response.json();
}
