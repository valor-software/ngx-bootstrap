import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DayViewModel } from '../../models/index';

@Component({
  selector: '[bsDatepickerDayDecorator]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
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
}
