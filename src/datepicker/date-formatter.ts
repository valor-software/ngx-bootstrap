import * as _moment from 'moment';
const moment = (_moment as any).default || _moment;

export class DateFormatter {
  public format(date:Date, format:string):string {
    return moment(date.getTime()).format(format);
  }
}
