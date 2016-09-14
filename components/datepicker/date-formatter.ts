import { DatePipe } from '@angular/common';

const dp = new DatePipe('en-US');

export class DateFormatter {
  public format(date:Date, format:string):string {
    return dp.transform(date, format);
  }
}
