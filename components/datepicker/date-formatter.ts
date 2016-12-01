declare var moment: any;

export class DateFormatter {
  public format(date:Date, format:string):string {
    return moment(date.getTime()).format(format);
  }
}
