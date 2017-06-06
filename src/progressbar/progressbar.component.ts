import { Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { isBs3 } from '../utils';

@Component({
  selector: 'progressbar',
  template: `
    <div progress [animate]="animate" [max]="max" [style.width]="!isBs3 ? '100%' : 'auto'">
      <bar [type]="type" [value]="value" *ngIf="!stacked">
          <ng-content></ng-content>
      </bar>
      <template ngFor let-item [ngForOf]="stackedData">
        <bar [type]="item.type" [value]="item.value">{{item.label}}</bar>
      </template>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
    }
  `]
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
  @Input() public stacked:boolean;
  @Input() public stackedData:any[];
  public get isBs3(): boolean {
    return isBs3();
  }

  public constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
}
