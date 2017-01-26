import { DatePickerBase } from './bs-date-picker-base.class';
export class DatePickerDate {
  public isActive: boolean;
  public isSelected: boolean;
  public isDisabled: boolean;
  public isSelectionStart: boolean;
  public isSelectionEnd: boolean;
  public isOtherMonth: boolean;
  public isHighlighted: boolean;

  public date: any;

  public constructor(date: any, opts: Object, base: DatePickerBase) {
    this.date = date;
    this.isActive = base.isActive(date);
    this.isSelected = base.isSelected(date);
    this.isDisabled = base.isDisabled(date);
    Object.assign(this, opts);
  }
}
