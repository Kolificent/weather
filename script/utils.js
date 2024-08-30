import { format } from 'date-fns';

export function getTimeString(timestamp, timezoneOffset) {
  const date = new Date((timestamp - timezoneOffset) * 1000);
  return format(date, 'kk:mm');
}
