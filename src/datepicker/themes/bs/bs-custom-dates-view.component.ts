import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface BsCustomDates {
  label: string;
  value: Date | Date[];
}

@Component({
  selector: 'bs-custom-date-view',
  template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges">{{ range.label }}</button>
      <button *ngIf="isCustomRangeShown">Custom Range</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsCustomDatesViewComponent {
  @Input() isCustomRangeShown: true;
  @Input() ranges: BsCustomDates[];
}
