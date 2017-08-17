import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Directive } from '@angular/core';
import { DayHoverEvent, DayViewModel } from '../../models/index';

@Component({
  selector: '[bsDatepickerDayDecorator]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'selectDay(day)',
    '(mouseenter)': 'hoverDay(day, true)',
    '(mouseleave)': 'hoverDay(day, false)',
    '[class.disabled]': 'day.isDisabled',
    '[class.is-highlighted]': 'day.isHovered',
    '[class.is-other-month]': 'day.isOtherMonth',
    '[class.in-range]': 'day.isInRange',
    '[class.select-start]': 'day.isSelectionStart',
    '[class.select-end]': 'day.isSelectionEnd',
    '[class.selected]': 'day.isSelected'
  },
  template: `{{ day.label }}`
})
export class BsDatepickerDayDecoratorComponent {
  @Input() day: DayViewModel;

  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<DayHoverEvent>();

  selectDay(day: DayViewModel): void {
    this.onSelect.emit(day);
  }

  hoverDay(day: DayViewModel, isHovered: boolean): void {
    this.onHover.emit({day, isHovered});
  }
}
