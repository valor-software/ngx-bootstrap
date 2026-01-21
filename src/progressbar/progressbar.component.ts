import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { BarValue, ProgressbarType } from './progressbar-type.interface';
import { ProgressbarConfig } from './progressbar.config';
import { BarComponent } from './bar.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'progressbar',
    templateUrl: './progressbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.progress]': 'true',
        '[attr.max]': 'max()'
    },
    styles: [`
    :host {
      width: 100%;
      display: flex;
    } `],
    standalone: true,
    imports: [NgIf, BarComponent, NgFor]
})
export class ProgressbarComponent {
  /** maximum total value of progress element */
  max = input<number>(100);

  /** if `true` changing value of progress bar will be animated */
  animate = input<boolean>(false);

  /** If `true`, striped classes are applied */
  striped = input<boolean>(false);

  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  type = input<ProgressbarType | undefined>();

  /** current value of progress bar. Could be a number or array of objects
   * like {"value":15,"type":"info","label":"15 %"}
   */
  value = input<number | BarValue[]>(0);

  isStacked = computed(() => Array.isArray(this.value()));
  
  _value = computed(() => {
    const val = this.value();
    return typeof val === 'number' ? val : undefined;
  });
  
  _values = computed(() => {
    const val = this.value();
    return Array.isArray(val) ? val : undefined;
  });

  constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
}
