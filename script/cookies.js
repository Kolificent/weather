import { statuses } from './constants.js';
import Cookies from 'js-cookie';

const ONE_HOUR = 1 / 24;

export const storage = {
  getFavoriteCities() {
    const favorites = Cookies.get('favorites');
    if (!favorites) {
      return new Set();
    }
    try {
      const parsedFavorites = new Set(JSON.parse(favorites));
      return parsedFavorites;
    } catch {
      throw new Error(statuses.parseError);
    }
  },
  addFavoriteCity(city) {
    let favorites = storage.getFavoriteCities();
    if (!favorites.has(city)) {
      favorites.add(city);
    } else {
      throw new Error(statuses.sameCity);
    }

    Cookies.set('favorites', JSON.stringify([...favorites]), {
      expires: ONE_HOUR,
      sameSite: 'strict',
    });
  },
  deleteFavoriteCity(city) {
    const favorites = storage.getFavoriteCities();
    favorites.delete(city);
    Cookies.set('favorites', city, { expires: ONE_HOUR, sameSite: 'strict' });
  },
  setCurrentCity(city) {
    Cookies.set('location', city, { expires: ONE_HOUR, sameSite: 'strict' });
  },
  getCurrentCity() {
    return Cookies.get('location');
  },
};
