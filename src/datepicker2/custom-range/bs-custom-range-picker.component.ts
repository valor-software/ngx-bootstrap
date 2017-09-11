import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';

import * as moment from 'moment';

@Component({
  selector: 'bs-custom-range-picker',
  exportAs: 'bs-custom-range-picker',
  template: `
<div class="bs-datepicker-predefined-btns" *ngIf="isShown" (mouseleave)="finishPreviewRange()">
  <button *ngFor="let range of ranges"
          (click)="selectRange(range.value)"
          (mouseover)="previewRange(range.value)">{{ range.key }}
  </button>
  <button (click)="showCalendars()" *ngIf="isCustomRangeShown">Custom Range</button>
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsCustomRangePickerComponent extends DatePickerBase {
  public isShown: boolean = false;
  public isCustomRangeShown: boolean = true;
  public ranges: { key: string; value: moment.Moment[] }[];

  private _showCalendars: boolean = false;
  private _prevSelected: moment.Moment[];

  public constructor(
    datePickerService: BsDatePickerState,
    options: BsDatePickerOptions
  ) {
    super(datePickerService, options);
    this.subscriptions.push(options.onUpdate.subscribe(() => this.refresh()));
  }

  public active(start: any, end: any): void {
    const startDate = moment().subtract(start, 'days');
    const endDate = moment().subtract(end, 'days');

    this.selectDate(startDate);
    this.selectDate(endDate);
  }

  public refresh(): void {
    if (!this.options.ranges) {
      this.isShown = false;
      return;
    }

    const keys = Object.keys(this.options.ranges);
    if (!keys || !keys.length) {
      this.isShown = false;
      return;
    }

    this.isCustomRangeShown = this.options.ui.showCustomRangeLabel;
    this.isShown = true;

    this.ranges = keys.map((key: string) => {
      const value = (this.options.ranges[key] as string[]).map((date: any) =>
        moment(date)
      );
      return { key, value };
    });

    this.datePickerState.showCalendars =
      this._showCalendars || this.options.ui.alwaysShowCalendars;
  }

  public selectRange(range: moment.Moment[]): void {
    this._showCalendars = false;
    this._prevSelected = void 0;
    this.resetSelection();
    this.selectDate(range[0]);
    this.selectDate(range[1]);
  }

  public previewRange(range: moment.Moment[]): void {
    if (!this._prevSelected) {
      this._prevSelected = [
        this.datePickerState.selectedDate,
        this.datePickerState.selectedEndDate
      ];
    }
    this.resetSelection();
    this.selectDate(range[0]);
    this.selectDate(range[1]);
  }

  public finishPreviewRange(): void {
    if (!this._prevSelected) {
      return;
    }

    this.datePickerState.selectedDate = this._prevSelected[0];
    this.datePickerState.selectedEndDate = this._prevSelected[1];
    this._prevSelected = void 0;
  }

  public showCalendars(): void {
    this._showCalendars = true;
    this.datePickerState.showCalendars = true;
  }
}
