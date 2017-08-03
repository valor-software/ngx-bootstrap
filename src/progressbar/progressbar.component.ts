import { Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { isBs3 } from '../utils';

@Component({
  selector: 'progressbar',
  template: `
    <div progress [animate]="animate" [max]="max" [style.width]="!isBs3 ? '100%' : 'auto'">
      <bar [type]="type" [value]="_value" *ngIf="!isStacked">
          <ng-content></ng-content>
      </bar>
      <ng-template [ngIf]="isStacked">
        <bar *ngFor="let item of _value" [type]="item.type" [value]="item.value">{{item.label}}</bar>
      </ng-template>
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
  /** current value of progress bar. Could be a number or array of objects like {"value":15,"type":"info","label":"15 %"} */
  @Input() public set value(value: number | any[]) {
    this.isStacked = Array.isArray(value);
    this._value = value;
  };
  public isStacked: boolean = false;
  public _value: number | any[];
  public get isBs3(): boolean {
    return isBs3();
  }

  public constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
}
