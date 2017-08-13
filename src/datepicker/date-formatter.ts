import moment from 'moment';

export class DateFormatter {
  public format(date:Date, format:string, locale:string):string {
    moment.locale(locale);
    return moment(date.getTime()).format(format);
  }
}
