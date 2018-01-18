import { isDateValid } from '../utils/type-checks';
import { createDuration } from '../duration/create';
import { DateParsingConfig } from '../create/parsing.types';

// todo: implement
export function from(date: Date, time: Date, withoutSuffix, config: DateParsingConfig): string {
  if (isDateValid(date) && isDateValid(time)) {
    createDuration({ to: date, from: time });

    return 'todo: implement';
  }

  return 'not valid date';
  // if (this.isValid() &&
  //   ((isMoment(time) && time.isValid()) ||
  //     createLocal(time).isValid())) {
  //   return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  // } else {
  //   return this.localeData().invalidDate();
  // }
}

// export function fromNow(withoutSuffix) {
//   return this.from(createLocal(), withoutSuffix);
// }
