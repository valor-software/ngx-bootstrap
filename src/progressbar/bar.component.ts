import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  effect,
  input
} from '@angular/core';

import { ProgressbarType } from './progressbar-type.interface';

@Component({
    selector: 'bar',
    templateUrl: './bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'progressbar',
        'aria-valuemin': '0',
        '[class.progress-bar]': 'true',
        '[class.progress-bar-animated]': 'animate()',
        '[class.progress-bar-striped]': 'striped()',
        '[attr.aria-valuenow]': 'value()',
        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
        '[attr.aria-valuemax]': 'max()',
        '[style.height.%]': '"100"',
        '[style.width.%]': 'percent'
    },
    standalone: true
})
export class BarComponent {
  /** maximum total value of progress element */
  max = input<number>(100);

  /** current value of progress bar */
  value = input<number | undefined>(0);

  /** if `true` changing value of progress bar will be animated */
  animate = input<boolean | undefined>(false);

  /** If `true`, striped classes are applied */
  striped = input<boolean | undefined>(false);

  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  type = input<ProgressbarType | undefined>('info');

  percent = 100;

  private _prevType?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Watch for value and max changes to update percent
    effect(() => {
      const currentValue = this.value() ?? 0;
      const currentMax = this.max() || 100;
      this.percent = 100 * (Number(currentValue) / Number(currentMax));
    });
    
    // Watch for type changes to update classes
    effect(() => {
      const currentType = this.type();
      this.applyTypeClasses(currentType);
    });
  }

  private applyTypeClasses(currentType?: ProgressbarType): void {
    if (this._prevType) {
      const barTypeClass = `progress-bar-${this._prevType}`;
      const bgClass = `bg-${this._prevType}`;
      this.renderer.removeClass(this.el.nativeElement, barTypeClass);
      this.renderer.removeClass(this.el.nativeElement, bgClass);
      this._prevType = void 0;
    }

    if (currentType) {
      const barTypeClass = `progress-bar-${currentType}`;
      const bgClass = `bg-${currentType}`;
      this.renderer.addClass(this.el.nativeElement, barTypeClass);
      this.renderer.addClass(this.el.nativeElement, bgClass);
      this._prevType = currentType;
    }
  }
}
