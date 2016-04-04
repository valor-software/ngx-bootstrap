import {Component, Input} from 'angular2/core';
import {Progress} from './progress.directive';
import {Bar} from './bar.component';

@Component({
  selector: 'progressbar',
  directives: [Progress, Bar],
  template: `
    <div progress [animate]="animate" [max]="max">
      <bar [type]="type" [value]="value">
          <ng-content></ng-content>
      </bar>
    </div>
  `
})
export class Progressbar {
  @Input() public animate:boolean;
  @Input() public max:number;
  @Input() public type:string;
  @Input() public value:number;
}
