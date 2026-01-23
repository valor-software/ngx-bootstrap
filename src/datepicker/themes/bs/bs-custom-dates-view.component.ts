import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

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
        [class.selected]="compareRanges(range)">
        {{ range.label }}
      </button>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor]
})
export class BsCustomDatesViewComponent {
  @Input() ranges?: BsCustomDates[];
  @Input() selectedRange?: Date[];
  @Input() customRangeLabel?: string;
  @Output() onSelect = new EventEmitter<BsCustomDates>();

  selectFromRanges(range?: BsCustomDates) {
    this.onSelect.emit(range);
  }

  compareRanges(range?: BsCustomDates) {
    return JSON.stringify(range?.value) === JSON.stringify(this.selectedRange);
  }
}
