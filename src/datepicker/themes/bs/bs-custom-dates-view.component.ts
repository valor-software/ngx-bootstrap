import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


export interface BsCustomDates {
  label: string;
  value: Date | Date[];
}

@Component({
    selector: 'bs-custom-date-view',
    template: `
    <div class="bs-datepicker-predefined-btns">
      @for (range of ranges; track range) {
        <button
          type="button"
          class="btn"
          (click)="selectFromRanges(range)"
          [class.selected]="compareRanges(range)">
          {{ range.label }}
        </button>
      }
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: []
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
    const currentRange = range?.value;
    const selectedRange = this.selectedRange;
    if (Array.isArray(currentRange) && Array.isArray(selectedRange)) {
      return new Date(currentRange[0]).setHours(0, 0, 0, 0) === new Date(selectedRange[0]).setHours(0, 0, 0, 0)
      && new Date(currentRange[1]).setHours(0, 0, 0, 0) === new Date(selectedRange[1]).setHours(0, 0, 0, 0);
    }

    return JSON.stringify(currentRange) === JSON.stringify(selectedRange);
  }
}
