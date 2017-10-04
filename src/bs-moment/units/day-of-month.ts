import { addFormatToken } from '../format-functions';
import { getDate } from '../utils/date-getters';

addFormatToken('D', ['DD', 2], 'Do', function(date: Date): string {
  return getDate(date).toString(10);
});
