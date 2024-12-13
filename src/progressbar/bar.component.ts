import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
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
        '[class.progress-bar-animated]': 'animate',
        '[class.progress-bar-striped]': 'striped',
        '[attr.aria-valuenow]': 'value',
        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
        '[attr.aria-valuemax]': 'max',
        '[style.height.%]': '"100"',
        '[style.width.%]': 'percent'
    },
    standalone: true
})
export class BarComponent implements OnChanges {
  /** maximum total value of progress element */
  @Input() max = 100;

  /** current value of progress bar */
  @Input() value? = 0;

  /** if `true` changing value of progress bar will be animated */
  @Input() animate? = false;

  /** If `true`, striped classes are applied */
  @Input() striped? = false;

  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() type?: ProgressbarType = 'info';

  percent = 100;

  private _prevType?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["value"] || changes["max"]) {
      this.percent = 100 * (Number(changes["value"]?.currentValue || this.value)
        / Number((changes["max"]?.currentValue || this.max) || 100));
    }

    if (changes["type"]) {
      this.applyTypeClasses();
    }
  }

  private applyTypeClasses(): void {
    if (this._prevType) {
      const barTypeClass = `progress-bar-${this._prevType}`;
      const bgClass = `bg-${this._prevType}`;
      this.renderer.removeClass(this.el.nativeElement, barTypeClass);
      this.renderer.removeClass(this.el.nativeElement, bgClass);
      this._prevType = void 0;
    }

    if (this.type) {
      const barTypeClass = `progress-bar-${this.type}`;
      const bgClass = `bg-${this.type}`;
      this.renderer.addClass(this.el.nativeElement, barTypeClass);
      this.renderer.addClass(this.el.nativeElement, bgClass);
      this._prevType = this.type;
    }
  }
}
