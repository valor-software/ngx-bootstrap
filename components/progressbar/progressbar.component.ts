import { Component, Input } from '@angular/core';

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
  @Input() public animate:boolean;
  @Input() public max:number;
  @Input() public type:string;
  @Input() public value:number;
}
