export class DatePickerTemplateOptions {
  public arrowLeft: string;
  public arrowRight: string;
  public floatLeft: string;
  public floatRight: string;
  public constructor(options: DatePickerTemplateOptions) {
    (<any>Object).assign(this, options);
  }
}