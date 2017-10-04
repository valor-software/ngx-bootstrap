import { addFormatToken } from '../format-functions';
import { getSeconds } from '../utils/date-getters';

addFormatToken('s', ['ss', 2], null, function(date: Date): string {
  return getSeconds(date).toString(10);
});
