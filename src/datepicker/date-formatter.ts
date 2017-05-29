import * as moment from 'moment';

export class DateFormatter {
  public format(date:Date, format:string):string {
    return moment(date.getTime()).format(format);
  }
}
