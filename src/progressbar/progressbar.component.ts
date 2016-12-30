import { Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';

@Component({
  selector: 'progressbar',
  template: `
    <div progress [animate]="animate" [max]="max">
      <bar [type]="type" [value]="value">
          <ng-content></ng-content>
      </bar>
    </div>
  `
})
export class ProgressbarComponent {
  /** if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) */
  @Input() public animate:boolean;
  /** maximum total value of progress element */
  @Input() public max:number;
  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() public type:string;
  /** current value of progress bar */
  @Input() public value:number;

  public constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
}
