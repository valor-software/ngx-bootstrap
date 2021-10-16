import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { DayViewModel } from '../../models';

@Component({
  selector: '[bsDatepickerDayDecorator]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.disabled]': 'day.isDisabled',
    '[class.is-highlighted]': 'day.isHovered',
    '[class.is-other-month]': 'day.isOtherMonth',
    '[class.is-active-other-month]': 'day.isOtherMonthHovered',
    '[class.in-range]': 'day.isInRange',
    '[class.select-start]': 'day.isSelectionStart',
    '[class.select-end]': 'day.isSelectionEnd',
    '[class.selected]': 'day.isSelected'
  },
  template: `{{ day && day.label || '' }}`
})
export class BsDatepickerDayDecoratorComponent implements OnInit {
  @Input() day: DayViewModel = { date: new Date(), label: '' };

  constructor(
    private _config: BsDatepickerConfig,
    private _elRef: ElementRef,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {

    if (this.day?.isToday && this._config && this._config.customTodayClass) {
      this._renderer.addClass(this._elRef.nativeElement, this._config.customTodayClass);
    }

    if (typeof this.day?.customClasses === 'string') {
      this.day?.customClasses.split(' ')
        .filter((className: string) => className)
        .forEach((className: string) => {
          this._renderer.addClass(this._elRef.nativeElement, className);
        });
    }
  }
}
