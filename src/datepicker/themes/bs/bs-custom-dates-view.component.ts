import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface BsCustomDates {
  label: string;
  value: Date | Date[];
}

@Component({
  selector: 'bs-custom-date-view',
  template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges"
        type="button"
        class="btn"
        (click)="selectFromRanges(range)"
        [class.active]="range.value === selectedRange">
        {{ range.label }}
      </button>
      <button *ngIf="isCustomRangeShown"
        type="button"
        class="btn"
        (click)="selectFromRanges(customRange)"
        [class.active]="!checkRange()">
        Custom Range
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsCustomDatesViewComponent {
  @Input() isCustomRangeShown = true;
  @Input() ranges: BsCustomDates[];
  @Input() selectedRange: Date[];
  @Output() onSelect = new EventEmitter<BsCustomDates>();

  customRange: Date = null;

  selectFromRanges(range: BsCustomDates) {
    this.onSelect.emit(range);
  }

  checkRange() {
    return this.ranges ? this.ranges.filter(range => range.value === this.selectedRange).length > 0 : false;
  }

}
